import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private currentStep = 1;
  private readonly totalSteps = 5;

  private steps = [
    { path: '/login', number: 1, title: 'sua info' },
    { path: '/planos', number: 2, title: 'planos' },
    { path: '/addons', number: 3, title: 'add-ons' },
    { path: '/confirmacao', number: 4, title: 'confirmação' },
  ];

  constructor(private router: Router) { }

  getCurrentStep(): number {
    return this.currentStep;
  }

  getSteps() {
    return this.steps;
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.navigateToStep(this.currentStep);
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.navigateToStep(this.currentStep);
    }
  }

  navigateToStep(stepNumber: number): void {
    if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
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

  // 👇 aqui estavam os erros
  isFirstStep(): boolean {
    return this.currentStep === 1;
  }

  isLastStep(): boolean {
    return this.currentStep === this.steps.length;
  }
}
