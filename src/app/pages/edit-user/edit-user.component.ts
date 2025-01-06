import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  userId!: string;
  currentPhoto: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.editUserForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.editUserForm.patchValue(user);
      this.currentPhoto = user.foto ?? null;
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

  onEditPhoto(): void {
    if (this.selectedFile) {
      console.log('Foto atualizada:', this.selectedFile);
    }
  }

  salvarUsuario(): void {
    if (this.editUserForm.valid) {
      console.log('Dados do usuário:', this.editUserForm.value);
      const updatedUser = { ...this.editUserForm.value, foto: this.currentPhoto };
      this.userService.editUser(this.userId, updatedUser).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}
