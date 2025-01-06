import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UsuarioResponse } from '../../models/user.model';
import { Acao } from '../../models/action.model';
import { Router } from '@angular/router';


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

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.userService.getUsers().subscribe((data: UsuarioResponse[]) => {
      this.usuarios = data;
    });
  }

  abrirModal(usuario: UsuarioResponse | null, acao: Acao): void {
    this.usuarioSelecionado = usuario;
    this.modalAction = acao;
    this.isModalOpen = true;
  
    if (acao === Acao.Editar) {
      this.modalTitle = `Editar Usuário: ${usuario?.nome}`;
      this.modalMessage = `Atualize as informações do usuário ${usuario?.nome}.`;
    } else if (acao === Acao.Excluir) {
      this.modalTitle = `Excluir Usuário: ${usuario?.nome}`;
      this.modalMessage = `Tem certeza que deseja excluir o usuário ${usuario?.nome}?`;
    } else if (acao === Acao.Adicionar) {
      this.modalTitle = 'Adicionar Novo Usuário';
      this.modalMessage = 'Insira os dados do novo usuário.';
    }
  }

  fecharModal(): void {
    this.isModalOpen = false;
    this.usuarioSelecionado = null;
    this.modalAction = null;
  }
  confirmarAcao(): void {
    if (this.modalAction === Acao.Excluir && this.usuarioSelecionado) {
      this.userService.deleteUser(this.usuarioSelecionado.id).subscribe(() => {
        this.carregarUsuarios();
      });
    } else if (this.modalAction === Acao.Editar && this.usuarioSelecionado) {
      this.router.navigate([`/edit-user/${this.usuarioSelecionado.id}`]);
    } else if (this.modalAction === Acao.Adicionar) {
      this.router.navigate(['/create-user']);
    }
    this.fecharModal();
  }
  
}
