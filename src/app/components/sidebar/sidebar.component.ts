import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  steps: any[] = [];

  constructor(public navigationService: NavigationService) {}

  ngOnInit(): void {
    this.steps = this.navigationService.getSteps();
  }

  isActiveStep(stepNumber: number): boolean {
    return this.navigationService.isActiveStep(stepNumber);
  }

  navigateToStep(stepNumber: number): void {
    this.navigationService.navigateToStep(stepNumber);
  }
}
