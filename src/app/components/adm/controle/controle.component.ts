import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-controle',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './controle.component.html',
  styleUrl: './controle.component.css'
})
export class ControleComponent {
  isLoading = false;
  activeTab: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
    ngOnInit() {
    this.updateActiveTab(this.router.url);

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.updateActiveTab(event.url);
      });
  }

  private updateActiveTab(url: string) {
    if (url.includes('/adm/dashboard/clientes') || url.includes('/clientes')) {
      this.activeTab = 'client';
    } else if (url.includes('/adm/dashboard') || url.includes('/menu')) {
      this.activeTab = 'main';
    } else {
      this.activeTab = 'main';
    }
  }
  client(): void {
    this.activeTab = 'client';

    this.isLoading = false;
    this.router.navigate(['/adm/dashboard/clientes']);
  }
  main(): void {
    this.activeTab = 'main';

    this.isLoading = false;
    this.router.navigate(['/adm/dashboard/menu']);
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/adm/login']);
  }
}
