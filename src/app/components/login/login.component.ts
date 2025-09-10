import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  user: User | null = null;

  constructor(private _formBuilder: FormBuilder, private userService: UserService) {
    this.userForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
ngOnInit(): void {
  const savedUser = this.userService.getUser();
  if (savedUser) {
    this.userForm.patchValue({
      name: savedUser.name,
      email: savedUser.email,
      phoneNumber: savedUser.phoneNumber
    });
            this.userService.setUser(this.user);
        console.log("Usuário atualizado:", this.user);
  }

  this.userForm.valueChanges.subscribe(values => {
    this.userService.setUser(values);
    });
}
  getErrorMessage(campo: any): string {
    if (campo.errors?.['required']) {
      return 'Campo obrigatório.';
    }
    if (campo.errors?.['email']) {
      return 'Email inválido.';
    }
    if (campo.errors?.['minlength']) {
      return `Mínimo de ${campo.errors['minlength'].requiredLength} caracteres.`;
    }
    return '';
  }
}
