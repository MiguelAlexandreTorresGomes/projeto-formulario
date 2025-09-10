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
  // totalPrice: number = 0;

  constructor(private userService: UserService, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (!this.user) {
      this.user = new User();
      this.userService.setUser(this.user);
    }
    console.log('Usuário recebido na tela de confirmacao:', this.user);
  }
  changePlan() {
    this.navigationService.navigateToStep(2);
  }
  getTotalPrice(){
    if (!this.user || !this.user.planos) return 0;

    const planoPrice = this.user.isAnnual ? this.user.planos.priceAnnual : this.user.planos.monthlyPrice;
    const addonsPrice = this.user.addons?.reduce(
      (total, a) => total + (this.user.isAnnual ? a.priceAnnual : a.monthlyPrice),
      0
    ) ?? 0;

    return planoPrice + addonsPrice;
  }

}