import { Injectable } from '@angular/core';
import { Usuario, UsuarioRequest, UsuarioResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 98765-4321',
      foto: '',
      dataCriacao: new Date(),
      ativo: true
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      email: 'maria@email.com',
      telefone: '(21) 91234-5678',
      foto: 'assets/imagens/avatar/Avatar-Image.jpg',
      dataCriacao: new Date(),
      ativo: true
    },
    {
      id: 3,
      nome: 'Carlos Santos',
      email: 'carlos@email.com',
      telefone: '(31) 99876-5432',
      foto: '',
      dataCriacao: new Date(),
      ativo: true
    }
  ];

  getAllUsers(): UsuarioResponse[] {
    return this.usuarios.map(usuario => ({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
      foto: usuario.foto
    }));
  }

  addUser(request: UsuarioRequest): UsuarioResponse {
    const newUser: Usuario = {
      ...request,
      id: this.usuarios.length + 1,
      dataCriacao: new Date(),
      ativo: true
    };
    this.usuarios.push(newUser);
    return {
      id: newUser.id,
      nome: newUser.nome,
      email: newUser.email,
      telefone: newUser.telefone,
      foto: newUser.foto
    };
  }

  editUser(id: number, request: UsuarioRequest): UsuarioResponse | null {
    const userIndex = this.usuarios.findIndex(usuario => usuario.id === id);
    if (userIndex === -1) {
      return null;
    }
    this.usuarios[userIndex] = { ...this.usuarios[userIndex], ...request };
    const updatedUser = this.usuarios[userIndex];
    return {
      id: updatedUser.id,
      nome: updatedUser.nome,
      email: updatedUser.email,
      telefone: updatedUser.telefone,
      foto: updatedUser.foto
    };
  }

  deleteUser(id: number): boolean {
    const userIndex = this.usuarios.findIndex(usuario => usuario.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.usuarios.splice(userIndex, 1);
    return true;
  }
}
