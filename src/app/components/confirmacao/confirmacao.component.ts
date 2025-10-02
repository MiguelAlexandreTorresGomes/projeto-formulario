// confirmacao.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user.service';
import { NavigationService } from '../../services/navigation.service';
import { ApiService } from '../../services/api.service';
import { ConfirmationService } from '../../services/confirmation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css'
})
export class ConfirmacaoComponent implements OnInit, OnDestroy {
  user: User | null = null;
  isLoading = false;
  message = '';
  private confirmationSubscription: Subscription;

  constructor(
    private userService: UserService, 
    private navigationService: NavigationService,
    private apiService: ApiService,
    private confirmationService: ConfirmationService
  ) {
    this.confirmationSubscription = this.confirmationService.confirm$.subscribe(() => {
      this.confirmar();
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (!this.user) {
      this.user = new User();
      this.userService.setUser(this.user);
    }
    console.log('Usuário recebido na tela de confirmação:', this.user);
  }

  ngOnDestroy(): void {
    if (this.confirmationSubscription) {
      this.confirmationSubscription.unsubscribe();
    }
  }

  changePlan() {
    this.navigationService.navigateToStep(2);
  }

  getTotalPrice() {
    if (!this.user || !this.user.planos) return 0;

    const planoPrice = this.user.isAnnual ? this.user.planos.priceAnnual : this.user.planos.monthlyPrice;
    const addonsPrice = this.user.addons?.reduce(
      (total, a) => total + (this.user.isAnnual ? a.priceAnnual : a.monthlyPrice),
      0
    ) ?? 0;

    return planoPrice + addonsPrice;
  }

  private formatUserForBackend(user: User): any {
    return {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      planos: user.planos?.name || user.planos?.nome || 'Plano não selecionado',
      addons: user.addons?.map(addon => addon.name).join(', ') || 'Nenhum addon selecionado',
      isAnnual: user.isAnnual
    };
  }

  confirmar() {
    if (!this.user) {
      this.message = 'Erro: Dados do usuário não encontrados';
      return;
    }

    if (!this.user.name || !this.user.email || !this.user.phoneNumber || !this.user.planos) {
      this.message = 'Erro: Dados incompletos para finalizar o cadastro';
      return;
    }

    this.isLoading = true;
    this.message = 'Criando seu cadastro...';

    const userData = this.formatUserForBackend(this.user);
    
    console.log('Enviando dados para o backend:', userData);
    console.log('URL: http://localhost:3000/clientes/create');

    this.apiService.createCliente(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Cliente criado com sucesso:', response);
        
        if (this.navigationService['setConfirmed']) {
          this.navigationService['setConfirmed']();
        }
        
        this.confirmationService.setConfirmed();
        
        if (this.userService['clearUser']) {
          this.userService['clearUser']();
        }
        
        setTimeout(() => {
          this.navigationService.goToFinalScreen();
        }, 300);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erro ao criar cliente:', error);
        
        if (error.error) {
          console.error('Resposta do servidor:', error.error);
        }
        
        if (error.status === 400) {
          this.message = 'Dados inválidos. Verifique as informações.';
        } else if (error.status === 409) {
          this.message = 'Este e-mail já está cadastrado.';
        } else {
          this.message = `Erro ao salvar dados: ${error.status}`;
        }
      }
    });
  }
}