import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UsuarioResponse, UsuarioRequest } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarios: UsuarioResponse[] = [];
  isModalOpen = false;
  modalTitle: string = '';
  modalMessage: string = '';
  usuarioSelecionado: UsuarioResponse | null = null;
  modalAction: 'excluir' | 'editar' | 'adicionar' | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.usuarios = this.userService.getAllUsers();
  }

  abrirModal(usuario: UsuarioResponse | null, acao: 'excluir' | 'editar' | 'adicionar'): void {
    this.usuarioSelecionado = usuario;
    this.modalAction = acao;
    this.isModalOpen = true;

    if (acao === 'editar') {
      this.modalTitle = 'Editar Usuário';
      this.modalMessage = `Edite as informações do usuário ${usuario?.nome}.`;
    } else if (acao === 'excluir') {
      this.modalTitle = 'Excluir Usuário';
      this.modalMessage = `Tem certeza de que deseja excluir o usuário ${usuario?.nome}?`;
    } else if (acao === 'adicionar') {
      this.modalTitle = 'Adicionar Usuário';
      this.modalMessage = 'Insira os dados do novo usuário.';
    }
  }

  fecharModal(): void {
    this.isModalOpen = false;
    this.usuarioSelecionado = null;
    this.modalAction = null;
  }

  confirmarAcao(request: UsuarioRequest | null = null): void {
    if (this.modalAction === 'excluir' && this.usuarioSelecionado) {
      this.userService.deleteUser(this.usuarioSelecionado.id);
      this.usuarios = this.userService.getAllUsers();
    } else if (this.modalAction === 'editar' && this.usuarioSelecionado && request) {
      this.userService.editUser(this.usuarioSelecionado.id, request);
      this.usuarios = this.userService.getAllUsers();
    } else if (this.modalAction === 'adicionar' && request) {
      this.userService.addUser(request);
      this.usuarios = this.userService.getAllUsers();
    }
    this.fecharModal();
  }
}
