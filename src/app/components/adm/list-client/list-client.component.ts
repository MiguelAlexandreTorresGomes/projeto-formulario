import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { ViewClientComponent } from "./view-client/view-client.component";
import { EditClientComponent } from './edit-client/edit-client.component';
import { DeleteClientComponent } from './delete-client/delete-client.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ViewClientComponent,
    EditClientComponent,
    DeleteClientComponent,
  ],
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.css',
})
export class ListClientComponent {
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  isLoading = false;
  showViewModal = false;
  showEditModal = false;
  selectedClienteId = '';
  clienteDeleteId: string | null = null;
  clienteDeleteNome: string = '';
  filtroGeral: string = '';
  filtroPlano: string = '';
  hasNovosClientes = false;
  contadorClientes = 0;
  ultimaAtualizacao = new Date();
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.carregarClientes();
  }
  carregarClientes(): void {
    this.isLoading = true;

    this.filtroGeral = '';
    this.filtroPlano = '';

    this.apiService.readCliente().subscribe({
      next: (clientes) => {
        this.clientes = clientes || [];
        this.clientesFiltrados = [...this.clientes];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.clientes = [];
        this.clientesFiltrados = [];
      }
    });
  }

  abrirModalView(clienteId: string) {
    this.selectedClienteId = clienteId;
    this.showViewModal = true;
  }

  fecharModalView() {
    this.showViewModal = false;
    this.selectedClienteId = '';
  }

  abrirModalEdit(clienteId: string) {
    this.selectedClienteId = clienteId;
    this.showEditModal = true;
  }

  fecharModalEdit() {
    this.showEditModal = false;
    this.selectedClienteId = '';
  }

  abrirModalDelete(clienteId: string, clienteNome: string) {
    this.clienteDeleteId = clienteId;
    this.clienteDeleteNome = clienteNome;
  }

  fecharModalDelete() {
    this.clienteDeleteId = null;
    this.clienteDeleteNome = '';
  }

  onClienteDeletado() {
    this.carregarClientes();
  }

  onClienteAtualizado() {
    this.carregarClientes();
  }

  aplicarFiltros() {
    this.clientesFiltrados = this.clientes.filter(cliente => {
      const termoBusca = this.filtroGeral.toLowerCase();

      const buscaMatch = !this.filtroGeral ||
        cliente.name?.toLowerCase().includes(termoBusca) ||
        cliente.email?.toLowerCase().includes(termoBusca) ||
        cliente.phoneNumber?.includes(this.filtroGeral);

      const planoMatch = !this.filtroPlano ||
        (this.filtroPlano === 'Sem plano' ? !cliente.planos : cliente.planos === this.filtroPlano);

      return buscaMatch && planoMatch;
    });

  }

  limparFiltros() {
    this.filtroGeral = '';
    this.filtroPlano = '';
    this.clientesFiltrados = [...this.clientes];
  }

  temFiltroAtivo(): boolean {
    return !!this.filtroGeral || !!this.filtroPlano;
  }
  getPlanClass(plano: string): string {
    switch (plano) {
      case 'Arcade': return 'badge-arcade';
      case 'Advanced': return 'badge-advanced';
      case 'Pro': return 'badge-pro';
      default: return 'badge-sem-plano';
    }
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