import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  statusConexao = 'Testando conexão...';
  backendUrl = '';

  constructor(
    private apiService: ApiService, 
    private router: Router
  ) {}

  title = 'projeto-formulario';

  ngOnInit() {
    this.testarConexaoBackend();
    if (!window.location.pathname.startsWith('/adm')) {
      this.router.navigate(['/login']);
    }
  }

  testarConexaoBackend() {
    this.apiService.testarConexao().subscribe({
      next: () => {
        this.statusConexao = '✅ CONEXÃO COM BACKEND OK!';
        this.backendUrl = this.apiService['apiUrl']; 
      },
      error: (erro) => {
        this.statusConexao = '❌ ERRO: Backend não conectado';
        console.error('Erro na conexão:', erro);
      }
    });
  }
}