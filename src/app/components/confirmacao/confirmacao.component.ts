import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user.service';
import { NavigationService } from '../../services/navigation.service';
@Component({
  selector: 'app-confirmacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css'
})
export class ConfirmacaoComponent {
  user: User | null = null;
  totalPrice: number = 0;

  constructor(private userService: UserService, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
      this.totalPrice = this.userService.getTotalPrice();
    });

  }
  changePlan() {
    this.navigationService.navigateToStep(2);
  }

}