import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  get<T>(url: string, params?: any): Observable<T> {
    return from(this.axiosInstance.get(url, { params }).then((res) => res.data));
  }

  post<T>(url: string, data: any): Observable<T> {
    return from(this.axiosInstance.post(url, data).then((res) => res.data));
  }

  put<T>(url: string, data: any): Observable<T> {
    return from(this.axiosInstance.put(url, data).then((res) => res.data));
  }

  delete<T>(url: string): Observable<T> {
    return from(this.axiosInstance.delete(url).then((res) => res.data));
  }

  upload<T>(url: string, formData: FormData): Observable<T> {
    return from(
      this.axiosInstance
        .post(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => res.data)
    );
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`Requisição para ${config.url} com método ${config.method}`);
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.error('Erro na requisição:', error.message);
        return Promise.reject(error);
      }
    );
  
    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log(`Resposta de ${response.config.url}:`, response.data);
        return response;
      },
      (error) => {
        console.error('Erro na resposta:', error.message);
        if (error.response) {
          switch (error.response.status) {
            case 401:
              console.error('Não autorizado. Redirecionando para login.');
              break;
            case 403:
              console.error('Acesso proibido.');
              break;
            case 500:
              console.error('Erro no servidor. Tente novamente mais tarde.');
              break;
            default:
              console.error('Erro desconhecido:', error.response.status);
          }
        }
        return Promise.reject(error);
      }
    );
  }
  
}
