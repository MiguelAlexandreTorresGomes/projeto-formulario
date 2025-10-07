import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-view-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-client.component.html',
  styleUrl: './view-client.component.css'
})
export class ViewClientComponent implements OnChanges {
  @Input() clienteId: string = '';
  @Output() close = new EventEmitter<void>();

  cliente: any = null;
  isLoading = false;
  mensagem = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

  constructor(private apiService: ApiService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clienteId'] && this.clienteId) {
      this.carregarCliente();
    }
  }

  carregarCliente() {
    this.isLoading = true;
    this.cliente = null;
    this.apiService.readClienteById(this.clienteId).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar cliente:', error);
        this.mostrarMensagem('❌ Erro ao carregar cliente', 'erro');
        this.isLoading = false;
      }
    });
  }

  private mostrarMensagem(mensagem: string, tipo: 'sucesso' | 'erro') {
    this.mensagem = mensagem;
    this.tipoMensagem = tipo;
  }

  closeModal() {
    this.close.emit();
  }
  formatPhone(phone: string): string {
  if (!phone) return 'N/A';
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
}
}