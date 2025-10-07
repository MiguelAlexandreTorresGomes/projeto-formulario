import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NavigationService } from '../../services/navigation.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { NgxMaskDirective } from 'ngx-mask';
import { ApiService } from '../../services/api.service'; 
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  isCheckingEmail = false;

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private navigationService: NavigationService,
    private apiService: ApiService 
  ) {
    this.userForm = this._formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
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

    this.setupEmailValidation();

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
      });
  }

private setupEmailValidation(): void {
  const emailControl = this.userForm.get('email');
  
  if (emailControl) {
    emailControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(email => {
          if (!email || emailControl.errors?.['email'] || emailControl.errors?.['pattern']) {
            this.isCheckingEmail = false;
            return of(null);
          }
          
          this.isCheckingEmail = true;
          return this.apiService.checkEmailExists(email).pipe(
            catchError(error => {
              this.isCheckingEmail = false;
              return of(null);
            })
          );
        })
      )
      .subscribe({
        next: (response) => {
          this.isCheckingEmail = false;
          
          if (response?.exists) {
            const currentErrors = emailControl.errors || {};
            emailControl.setErrors({ ...currentErrors, emailExists: true });
            emailControl.markAsTouched(); 
          } else {
            if (emailControl.errors?.['emailExists']) {
              const { emailExists, ...otherErrors } = emailControl.errors;
              emailControl.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
            }
          }
        },
        error: (error) => {
          this.isCheckingEmail = false;
          console.error('❌ Erro na subscription:', error);
        }
      });
  }
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
    if (control.errors['emailExists']) {
      return 'Este email já está cadastrado';
    }

    return '';
  }

  isEmailChecking(): boolean {
    return this.isCheckingEmail && this.userForm.get('email')?.valid;
  }
  
}