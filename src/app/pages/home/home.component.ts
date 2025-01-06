import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UsuarioResponse } from '../../models/user.model';
import { Acao } from '../../models/action.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usuarios: UsuarioResponse[] = [];
  isModalOpen = false;
  modalTitle: string = '';
  modalMessage: string = '';
  usuarioSelecionado: UsuarioResponse | null = null;
  modalAction: Acao | null = null;
  Acao = Acao;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.userService.getAllUsers().subscribe((data: UsuarioResponse[]) => {
      this.usuarios = data;
    });
  }

  abrirModal(usuario: UsuarioResponse | null, acao: Acao): void {
    if (acao === Acao.Editar) {
      console.log(`Editando o usuário: ${usuario?.nome}`);
    } else if (acao === Acao.Excluir) {
      console.log(`Excluindo o usuário: ${usuario?.nome}`);
    } else if (acao === Acao.Adicionar) {
      console.log('Adicionando um novo usuário');
    }
  }

  fecharModal(): void {
    this.isModalOpen = false;
    this.usuarioSelecionado = null;
    this.modalAction = null;
  }

  confirmarAcao(request: UsuarioResponse | null = null): void {
    if (this.modalAction === 'excluir' && this.usuarioSelecionado) {
      this.userService.deleteUser(this.usuarioSelecionado.id).subscribe(() => {
        this.carregarUsuarios();
      });
    } else if (this.modalAction === 'editar' && this.usuarioSelecionado && request) {
      this.userService.editUser(this.usuarioSelecionado.id, request).subscribe(() => {
        this.carregarUsuarios();
      });
    } else if (this.modalAction === 'adicionar' && request) {
      this.userService.addUser(request).subscribe(() => {
        this.carregarUsuarios();
      });
    }
    this.fecharModal();
  }
}
