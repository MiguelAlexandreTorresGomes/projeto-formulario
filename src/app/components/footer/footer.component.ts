import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {


constructor(public navigationService: NavigationService){

}
  isActiveStep(stepNumber: number): boolean {
    return this.navigationService.isActiveStep(stepNumber);
  }

  navigateToStep(stepNumber: number): void {
    this.navigationService.navigateToStep(stepNumber);
  }
 
}
