import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  base64Image: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.userForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, this.validarArroba]],
      telefone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{2}(\d{9})$/)
        ],
      ],
      dataNascimento: ['', [Validators.required, this.validarDataDeNascimento]],
      tipoUsuario: ['', Validators.required],
      foto: [null],
    });
  }


  onTelefoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('Valor atual do telefone:', input.value);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.base64Image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  salvarUsuario(): void {
    if (this.userForm.valid) {
      console.log('Dados do usuário:', this.userForm.value);
      const formData = { ...this.userForm.value, foto: this.base64Image };
      this.userService.addUser(formData).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }

  private validarArroba(control: AbstractControl): { [key: string]: boolean } | null {
    const valor = control.value;
    if (valor && !valor.includes('@')) {
      return { semArroba: true };
    }
    return null;
  }

  private validarDataDeNascimento(control: AbstractControl): { [key: string]: boolean } | null {
    const data = new Date(control.value);
    const hoje = new Date();
    const idadeMinima = 18;
    const idadeMaxima = 100;

    const idade = hoje.getFullYear() - data.getFullYear();
    if (
      idade < idadeMinima ||
      idade > idadeMaxima ||
      (idade === idadeMinima && hoje < new Date(data.setFullYear(hoje.getFullYear())))
    ) {
      return { dataInvalida: true };
    }

    return null;
  }
}
