import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditUserComponent } from './edit-user.component';
import { of } from 'rxjs';
import { UserService } from '../../services/user.service';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let userServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    userServiceMock = {
      getUserById: jest.fn().mockReturnValue(
        of({
          id: '1',
          nome: 'Usuário de Teste',
          email: 'teste@example.com',
          telefone: '123456789',
          dataNascimento: '2000-01-01',
          tipoUsuario: 'Administrador',
          foto: 'data:image/jpeg;base64,fotoTeste',
        })
      ),
      editUser: jest.fn().mockReturnValue(of({})),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [EditUserComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1',
              },
            },
          },
        },
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com os dados do serviço de usuário', () => {
    expect(userServiceMock.getUserById).toHaveBeenCalledWith('1');
    expect(component.editUserForm.value).toEqual({
      nome: 'Usuário de Teste',
      email: 'teste@example.com',
      telefone: '123456789',
      dataNascimento: '2000-01-01',
      tipoUsuario: 'Administrador',
    });
    expect(component.currentPhoto).toBe('data:image/jpeg;base64,fotoTeste');
  });

  it('deve atualizar a foto ao selecionar um arquivo', () => {
    const mockFile = new File(['conteúdo dummy'], 'foto.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [mockFile] } } as unknown as Event;

    const readerMock = {
      readAsDataURL: jest.fn(),
      onload: jest.fn(),
      result: 'data:image/jpeg;base64,novaFoto',
    };

    jest.spyOn(window as any, 'FileReader').mockImplementation(() => readerMock);

    component.onFileSelected(event);

    expect(readerMock.readAsDataURL).toHaveBeenCalledWith(mockFile);

    readerMock.onload();

    expect(component.currentPhoto).toBe('data:image/jpeg;base64,novaFoto');
  });

  it('deve chamar userService.editUser e navegar para a página inicial ao salvar o formulário', () => {
    component.editUserForm.setValue({
      nome: 'Usuário Atualizado',
      email: 'atualizado@example.com',
      telefone: '987654321',
      dataNascimento: '1995-05-15',
      tipoUsuario: 'Editor',
    });
    component.currentPhoto = 'data:image/jpeg;base64,fotoAtualizada';

    component.salvarUsuario();

    expect(userServiceMock.editUser).toHaveBeenCalledWith('1', {
      nome: 'Usuário Atualizado',
      email: 'atualizado@example.com',
      telefone: '987654321',
      dataNascimento: '1995-05-15',
      tipoUsuario: 'Editor',
      foto: 'data:image/jpeg;base64,fotoAtualizada',
    });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('não deve chamar userService.editUser se o formulário for inválido', () => {
    component.editUserForm.setValue({
      nome: '',
      email: 'email-invalido',
      telefone: '',
      dataNascimento: '',
      tipoUsuario: '',
    });

    component.salvarUsuario();

    expect(userServiceMock.editUser).not.toHaveBeenCalled();
  });

  it('deve navegar para a página inicial ao chamar cancelar', () => {
    component.cancelar();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('deve registrar o arquivo selecionado ao chamar onEditPhoto', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const mockFile = new File(['conteúdo dummy'], 'foto.jpg', { type: 'image/jpeg' });
    component.selectedFile = mockFile;

    component.onEditPhoto();

    expect(consoleSpy).toHaveBeenCalledWith('Foto atualizada:', mockFile);
  });
});
