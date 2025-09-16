import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NavigationService } from '../../services/navigation.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private navigationService: NavigationService
  ) {
    this.userForm = this._formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/) // apenas letras e espaços
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail|outlook)\.com(\.br)?$/i)
        ]
      ],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
    });
  }

  ngOnInit(): void {
    this.navigationService.setUserForm(this.userForm);

    const savedUser = this.userService.getUser();
    if (savedUser) {
      this.userForm.patchValue({
        name: savedUser.name || '',
        email: savedUser.email || '',
        phoneNumber: savedUser.phoneNumber || ''
      });
    }

    this.userForm.valueChanges
      .pipe(
        debounceTime(10),
        distinctUntilChanged()
      )
      .subscribe(values => {
        if (values.name) {
          const formattedName = values.name
            .split(' ')
            .map((word: string) =>
              word.length > 2
                ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                : word 
            )
            .join(' ');

          if (formattedName !== values.name) {
            this.userForm.get('name')?.setValue(formattedName, { emitEvent: false });
          }
        }

        this.userService.setUser(values);
        console.log("Usuário atualizado automaticamente:", values);
      });
  }

  getErrorMessage(control: any): string {
    if (!control || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'Campo obrigatório';
    }
    if (control.errors['email']) {
      return 'Formato de email inválido';
    }
    if (control.errors['minlength']) {
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    }
    if (control.errors['pattern'] && control === this.userForm.get('email')) {
      return 'Apenas emails do Gmail ou Outlook são permitidos';
    }
    if (control.errors['pattern'] && control === this.userForm.get('phoneNumber')) {
      return 'Formato inválido (10 ou 11 dígitos)';
    }
    if (control.errors['pattern'] && control === this.userForm.get('name')) {
      return 'O nome não pode conter números ou caracteres especiais';
    }

    return '';
  }
}
