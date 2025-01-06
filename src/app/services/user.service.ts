import { Injectable } from '@angular/core';
import { UsuarioRequest, UsuarioResponse } from '../models/user.model';
import { AxiosService } from './axios.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/users';

  constructor(private axiosService: AxiosService) {}

  getUsers(): Observable<UsuarioResponse[]> {
    return this.axiosService.get<UsuarioResponse[]>(this.apiUrl);
  }

  addUser(request: UsuarioRequest): Observable<UsuarioResponse> {
    return this.axiosService.post<UsuarioResponse>(this.apiUrl, request);
  }

  editUser(id: string, updatedData: Partial<UsuarioRequest>): Observable<UsuarioResponse> {
    return this.axiosService.put<UsuarioResponse>(`${this.apiUrl}/${id}`, updatedData);
  }

  deleteUser(id: string): Observable<void> {
    return this.axiosService.delete<void>(`${this.apiUrl}/${id}`);
  }

  addUserWithFile(formData: FormData): Observable<UsuarioResponse> {
    return this.axiosService.upload<UsuarioResponse>(`${this.apiUrl}/upload`, formData);
  }

  getUserById(id: string): Observable<UsuarioResponse> {
    return this.axiosService.get<UsuarioResponse>(`${this.apiUrl}/${id}`);
  }
}
