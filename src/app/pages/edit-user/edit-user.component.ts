import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  userId!: string;
  currentPhoto: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.editUserForm.patchValue(user);
      this.currentPhoto = user.foto ?? null;
    });
  }

  private inicializarFormulario(): void {
    this.editUserForm = this.fb.group({
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
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.currentPhoto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  salvarUsuario(): void {
    if (this.editUserForm.valid) {
      console.log('Dados do usuário:', this.editUserForm.value);
      const updatedUser = { ...this.editUserForm.value, foto: this.currentPhoto };
      this.userService.editUser(this.userId, updatedUser).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          console.error('Erro ao salvar usuário:', err);
          alert('Ocorreu um erro ao atualizar o usuário.');
        },
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
