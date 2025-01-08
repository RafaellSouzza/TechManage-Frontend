import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TipoUsuarioEnum } from '../../models/user.model'; 

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    userServiceMock = {
      getUsers: jest.fn().mockReturnValue(of([])),
      deleteUser: jest.fn().mockReturnValue(of({})),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar usuários na inicialização', () => {
    const mockUsers = [
      { id: "1", nome: 'Usuário 1', email: 'user1@example.com', telefone: '12345678', dataNascimento: '2000-01-01', tipoUsuario: TipoUsuarioEnum.ADMINISTRADOR, foto: '' },
    ];
    userServiceMock.getUsers.mockReturnValue(of(mockUsers));
    component.carregarUsuarios();
    expect(component.usuarios).toEqual(mockUsers);
  });

  it('deve abrir o modal com os dados corretos para edição', () => {
    const mockUser = { id: "1", nome: 'Usuário 1', email: 'user1@example.com', telefone: '12345678', dataNascimento: '2000-01-01', tipoUsuario: TipoUsuarioEnum.ADMINISTRADOR, foto: '' };
    component.abrirModal(mockUser, component.Acao.Editar);
    expect(component.isModalOpen).toBe(true);
    expect(component.modalTitle).toBe(`Editar Usuário: ${mockUser.nome}`);
    expect(component.modalMessage).toBe(`Atualize as informações do usuário ${mockUser.nome}.`);
  });

  it('deve fechar o modal', () => {
    component.isModalOpen = true;
    component.fecharModal();
    expect(component.isModalOpen).toBe(false);
    expect(component.usuarioSelecionado).toBeNull();
    expect(component.modalAction).toBeNull();
  });

  it('deve confirmar a ação de exclusão', () => {
    const mockUser = { id: "1", nome: 'Usuário 1', email: 'user1@example.com', telefone: '12345678', dataNascimento: '2000-01-01', tipoUsuario: TipoUsuarioEnum.ADMINISTRADOR, foto: '' };
    component.usuarioSelecionado = mockUser;
    component.modalAction = component.Acao.Excluir;
    component.confirmarAcao();
    expect(userServiceMock.deleteUser).toHaveBeenCalledWith(mockUser.id);
  });

  it('deve navegar para a página de edição de usuário', () => {
    const mockUser = { id: "1", nome: 'Usuário 1', email: 'user1@example.com', telefone: '12345678', dataNascimento: '2000-01-01', tipoUsuario: TipoUsuarioEnum.ADMINISTRADOR, foto: '' };
    component.usuarioSelecionado = mockUser;
    component.modalAction = component.Acao.Editar;
    component.confirmarAcao();
    expect(routerMock.navigate).toHaveBeenCalledWith([`/edit-user/${mockUser.id}`]);
  });

  it('deve navegar para a página de criação de usuário', () => {
    component.modalAction = component.Acao.Adicionar;
    component.confirmarAcao();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/create-user']);
  });
});
