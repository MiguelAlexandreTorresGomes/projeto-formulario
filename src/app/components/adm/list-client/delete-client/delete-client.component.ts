import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-delete-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.css']
})
export class DeleteClientComponent {
  @Input() clienteId: string = '';
  @Input() clienteNome: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() clienteDeletado = new EventEmitter<string>(); // ✅ Emite o ID do cliente deletado

  deletando = false;
  mensagem = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

  constructor(private apiService: ApiService) {}

  confirmarDelete() {
    this.deletando = true;
    this.mensagem = '';

    this.apiService.deleteCliente(this.clienteId).subscribe({
      next: (resposta) => {
        this.deletando = false;
        this.mensagem = '✅ ' + (resposta.message || 'Cliente excluído com sucesso!');
        this.tipoMensagem = 'sucesso';
        
        this.clienteDeletado.emit(this.clienteId);
        
        setTimeout(() => {
          this.closeModal();
        }, 200);
      },
      error: (erro) => {
        this.deletando = false;
        this.mensagem = '❌ ' + (erro.error?.message || 'Erro ao excluir cliente');
        this.tipoMensagem = 'erro';
        
        console.error('❌ Erro ao excluir cliente:', erro);
      }
    });
  }

  closeModal() {
    this.close.emit();
  }
}