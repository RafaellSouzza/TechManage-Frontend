import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isModalOpen = false;
  modalTitle: string = '';
  modalMessage: string = '';
  usuarioSelecionado: any = null;
  modalAction: 'excluir' | 'editar' | null = null;

  usuarios = [
    { 
      nome: 'João Silva', 
      email: 'joao@email.com', 
      telefone: '(11) 98765-4321', 
      foto: '' 
    },
    { 
      nome: 'Maria Oliveira', 
      email: 'maria@email.com', 
      telefone: '(21) 91234-5678', 
      foto: '' 
    },
    { 
      nome: 'Carlos Santos', 
      email: 'carlos@email.com', 
      telefone: '(31) 99876-5432', 
      foto: '' 
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  abrirModal(usuario: any, acao: 'excluir' | 'editar'): void {
    this.usuarioSelecionado = usuario;
    this.modalAction = acao;
    this.isModalOpen = true;

    if (acao === 'editar') {
      this.modalTitle = 'Editar Usuário';
      this.modalMessage = `Edite as informações do usuário ${usuario.nome}.`;
    } else if (acao === 'excluir') {
      this.modalTitle = 'Excluir Usuário';
      this.modalMessage = `Tem certeza de que deseja excluir o usuário ${usuario.nome}?`;
    }
  }

  fecharModal(): void {
    this.isModalOpen = false;
    this.usuarioSelecionado = null;
    this.modalAction = null;
  }

  confirmarAcao(): void {
    if (this.modalAction === 'excluir' && this.usuarioSelecionado) {
      this.usuarios = this.usuarios.filter(u => u !== this.usuarioSelecionado);
    } else if (this.modalAction === 'editar' && this.usuarioSelecionado) {
      // Aqui você pode adicionar lógica para editar o usuário
    }
    this.fecharModal();
  }
}
