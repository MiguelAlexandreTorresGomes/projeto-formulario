import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FilterStepsPipe } from './filterSteps.pipe';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FilterStepsPipe, FooterComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  userForm: FormGroup;
  showValidationError = false;
  steps: any[] = [];

  constructor(public navigationService: NavigationService, public _formBuilder: FormBuilder, public userService: UserService) {}

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

