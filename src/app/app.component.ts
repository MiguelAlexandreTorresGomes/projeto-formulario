import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
statusConexao = 'Testando conexão...';
  backendUrl = '';

  constructor(private apiService: ApiService, private router: Router) {}
  title = 'projeto-formulario';

  ngOnInit() {
    this.testarConexaoBackend();
    this.router.navigate(['/login']);

  }

  testarConexaoBackend() {
    this.apiService.testarConexao().subscribe({
      next: (resposta) => {
        this.statusConexao = '✅ CONEXÃO COM BACKEND OK!';
        this.backendUrl = this.apiService['apiUrl']; 
        console.log('Resposta do backend:', resposta);
      },
      error: (erro) => {
        this.statusConexao = '❌ ERRO: Backend não conectado';
        console.error('Erro na conexão:', erro);
      }
    });
  }
}