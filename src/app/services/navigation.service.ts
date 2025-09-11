import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentStep = 1;
  private readonly totalSteps = 5;
  private userForm: FormGroup | null = null;
  private validationErrorSubject = new BehaviorSubject<boolean>(false);
  public showValidationError$ = this.validationErrorSubject.asObservable();

  private steps = [
    { path: '/login', number: 1, title: 'sua info' },
    { path: '/planos', number: 2, title: 'planos' },
    { path: '/addons', number: 3, title: 'add-ons' },
    { path: '/confirmacao', number: 4, title: 'confirmação' },
    { path: '/finalizado', number: 5, title: 'finalizado' },
    
  ];
  

  constructor(private router: Router, public userService: UserService) { }

  setUserForm(form: FormGroup): void {
    this.userForm = form;
  }

  getCurrentStep(): number {
    return this.currentStep;
  }

  getSteps() {
    return this.steps;
  }

  nextStep(): void {
    if (!this.userForm) {
      console.error('Formulário não está inicializado');
      this.validationErrorSubject.next(true);
      return;
    }
    
    this.markFormGroupTouched(this.userForm);
    
    if (this.userForm.valid) {
      console.log("FORMULÁRIO VÁLIDO - Avançando para próximo passo");
      this.validationErrorSubject.next(false);
      
      this.userService.setUser(this.userForm.value);
      
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.navigateToStep(this.currentStep);
      }
    } else {
      console.log("FORMULÁRIO INVÁLIDO - Corrija os erros");
      this.validationErrorSubject.next(true);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  previousStep(): void {
    if(this.currentStep > 1) {
      this.currentStep--;
      this.navigateToStep(this.currentStep);
    }
  }

  navigateToStep(stepNumber: number): void {
    if(stepNumber >= 1 && stepNumber <= this.totalSteps) {
      this.currentStep = stepNumber;
      const step = this.steps.find(s => s.number === stepNumber);
      if (step) {
        this.router.navigate([step.path]);
      }
    }
  }

  isActiveStep(stepNumber: number): boolean {
    return this.currentStep === stepNumber;
  }

  isFirstStep(): boolean {
    return this.currentStep === 1 ;
  }

  isLastStep(): boolean {
    return this.currentStep === this.steps.length;
  }
}