import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Planos } from '../../models/planos/planos.model';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user.service';
import { PlanosService } from '../../services/planos.service';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {

  user: User | null = null;

planos: Planos[] = [
  new Planos(1, 'assets/icons/icon-arcade.svg', "Arcade", 9, 90),
  new Planos(2, 'assets/icons/icon-pro.svg', "Pro", 12, 120),
  new Planos(3, 'assets/icons/icon-advanced.svg', "Advanced", 15, 150)
];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (!this.user) {
      this.user = new User();
      this.userService.setUser(this.user);
    }
    console.log('Usuário recebido na tela de planos:', this.user);
    this.selecionarPlano(this.planos[0]);
  }

  toggleBilling() {
    if (!this.user) return;
    this.user.isAnnual = !this.user.isAnnual;
    this.userService.setUser(this.user);
  }
  selecionarPlano(plano: Planos) {
    if (!this.user) return;
    this.user.planos = plano;
    this.userService.setUser(this.user);

    console.log('User atualizado:', this.user);
  }
   getPlanoPrice(plano: Planos): number {
    return this.user?.isAnnual ? plano.priceAnnual : plano.monthlyPrice;
  }

}
