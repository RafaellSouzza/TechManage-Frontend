import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CreateUserComponent } from './create-user.component';
import { UserService } from '../../services/user.service';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let userServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    userServiceMock = {
      addUser: jest.fn().mockReturnValue(of({})),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [CreateUserComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.userForm;
    expect(form).toBeDefined();
    expect(form.get('nome')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('telefone')?.value).toBe('');
    expect(form.get('dataNascimento')?.value).toBe('');
    expect(form.get('tipoUsuario')?.value).toBe('');
    expect(form.get('foto')?.value).toBeNull();
  });

  it('should mark the form as invalid when required fields are empty', () => {
    component.userForm.setValue({
      nome: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      tipoUsuario: '',
      foto: null,
    });
    expect(component.userForm.valid).toBe(false);
  });

  it('should mark the form as valid when all fields are filled correctly', () => {
    component.userForm.setValue({
      nome: 'John Doe',
      email: 'john.doe@example.com',
      telefone: '21992985139',
      dataNascimento: '2000-01-01',
      tipoUsuario: 'Administrador',
      foto: null,
    });
    expect(component.userForm.valid).toBe(true);
  });

  it('should set base64Image when a file is selected', () => {
    const mockFile = new File(['dummy content'], 'photo.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [mockFile] } } as unknown as Event;

    const readerMock = {
      readAsDataURL: jest.fn(),
      onload: null as any,
      result: 'data:image/jpeg;base64,dummybase64string',
    };

    jest.spyOn(window as any, 'FileReader').mockImplementation(() => readerMock as any);

    component.onFileSelected(event);

    expect(readerMock.readAsDataURL).toHaveBeenCalledWith(mockFile);

    // Simula a execução do onload
    readerMock.onload?.();

    expect(component.base64Image).toBe('data:image/jpeg;base64,dummybase64string');
  });

  it('should call userService.addUser and navigate to home on valid form submission', () => {
    const mockFormData = {
      nome: 'John Doe',
      email: 'john.doe@example.com',
      telefone: '21992985139',
      dataNascimento: '2000-01-01',
      tipoUsuario: 'Administrador',
      foto: 'data:image/jpeg;base64,dummybase64string',
    };

    component.userForm.setValue(mockFormData);
    component.base64Image = 'data:image/jpeg;base64,dummybase64string';

    component.salvarUsuario();

    expect(userServiceMock.addUser).toHaveBeenCalledWith(mockFormData);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should alert the user when the form is invalid on submission', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    component.userForm.setValue({
      nome: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      tipoUsuario: '',
      foto: null,
    });

    component.salvarUsuario();

    expect(window.alert).toHaveBeenCalledWith('Por favor, preencha todos os campos corretamente.');
    expect(userServiceMock.addUser).not.toHaveBeenCalled();
  });

  it('should navigate to home when cancelar is called', () => {
    component.cancelar();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
