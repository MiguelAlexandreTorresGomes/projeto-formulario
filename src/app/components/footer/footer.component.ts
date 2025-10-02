import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from '../../services/confirmation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  isConfirming = false;
  isConfirmed = false;
  constructor(
    public navigationService: NavigationService,
    private confirmationService: ConfirmationService
  ) {  this.confirmationService.isConfirmed$.subscribe(
      confirmed => this.isConfirmed = confirmed
    );
  }


  isActiveStep(stepNumber: number): boolean {
    return this.navigationService.isActiveStep(stepNumber);
  }

  navigateToStep(stepNumber: number): void {
    this.navigationService.navigateToStep(stepNumber);
  }

   

  onConfirm() {
    this.isConfirming = true;
    this.confirmationService.triggerConfirmation();
  }
}
