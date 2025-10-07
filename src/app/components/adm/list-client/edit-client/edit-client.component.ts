import { Component, EventEmitter, Input, Output, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../../../services/api.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  @Input() clienteId: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() clienteAtualizado = new EventEmitter<any>(); 
  cliente: any = null;
  isLoading = false;
  salvando = false;
  mensagem = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';
  
  clienteForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {}

  
  ngOnInit() {
    this.inicializarForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clienteId'] && this.clienteId) {
      this.carregarCliente();
    }
  }

inicializarForm() {
  this.clienteForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    planos: [''],
    addonServico: [false],
    addonEspaco: [false],
    addonPerfil: [false],
    isAnnual: [false]
  });
}

 carregarCliente() {
  this.isLoading = true;
  this.cliente = null;
  
  this.apiService.readClienteById(this.clienteId).subscribe({
    next: (cliente) => {
      this.cliente = cliente;
      this.preencherForm(cliente);
      this.isLoading = false;
    },
    error: (error) => {
      this.mostrarMensagem('❌ Erro ao carregar cliente', 'erro');
      this.isLoading = false;
    }
  });
}
preencherForm(cliente: any) {
  this.clienteForm.patchValue({
    name: cliente.name || '',
    email: cliente.email || '',
    phoneNumber: cliente.phoneNumber || '',
    planos: cliente.planos || '',
    isAnnual: cliente.isAnnual || false
  });

  let addonsArray: string[] = [];
  
  if (typeof cliente.addons === 'string') {
    addonsArray = cliente.addons.split(',').map((item: string) => item.trim());
  } else if (Array.isArray(cliente.addons)) {
    addonsArray = cliente.addons;
  }

  this.clienteForm.patchValue({
    addonServico: addonsArray.includes('Serviço Online'),
    addonEspaco: addonsArray.includes('Mais Espaço'),
    addonPerfil: addonsArray.includes('Perfil Customizável')
  });

  setTimeout(() => 100);
}
  salvarEdicao() {
    if (this.clienteForm.valid) {
      this.salvando = true;
      this.mensagem = '';

      const dadosAtualizados = this.prepararDadosAtualizacao();


      this.apiService.updateCliente(this.clienteId, dadosAtualizados).subscribe({
        next: (resposta) => {
          this.salvando = false;
          this.mostrarMensagem('✅ Cliente atualizado com sucesso!', 'sucesso');
          
          this.clienteAtualizado.emit(resposta.data || dadosAtualizados);
          
          setTimeout(() => {
            this.closeModal();
          }, 200);
        },
        error: (erro) => {
          this.salvando = false;
          this.mostrarMensagem('❌ Erro ao atualizar cliente', 'erro');
        }
      });
    } else {
      this.marcarCamposComoSujos();
    }
  }

prepararDadosAtualizacao(): any {
  const formValue = this.clienteForm.value;
  const addons = [];

  // ✅ ADDONS CORRETOS
  if (formValue.addonServico) addons.push('Serviço Online');
  if (formValue.addonEspaco) addons.push('Mais Espaço');
  if (formValue.addonPerfil) addons.push('Perfil Customizável');

  return {
    name: formValue.name,
    email: formValue.email,
    phoneNumber: formValue.phoneNumber,
    planos: formValue.planos,
    addons: addons.length > 0 ? addons.join(', ') : '', 
    isAnnual: formValue.isAnnual
  };
}

 getAddonsSelecionados(): string {
  const formValue = this.clienteForm.value;
  const addons = [];
  
  // ✅ NOMES CORRETOS DOS ADDONS
  if (formValue.addonServico) addons.push('Serviço Online');
  if (formValue.addonEspaco) addons.push('Mais Espaço');
  if (formValue.addonPerfil) addons.push('Perfil Customizável');
  
  // ✅ RETORNAR "Nenhum" SE ESTIVER VAZIO
  return addons.length > 0 ? addons.join(', ') : 'Nenhum';
}

  campoInvalido(campo: string): boolean {
    const control = this.clienteForm.get(campo);
    return !!control && control.invalid && control.touched;
  }

  getMensagemErro(campo: string): string {
    const control = this.clienteForm.get(campo);
    
    if (control?.errors) {
      if (control.errors['required']) return 'Este campo é obrigatório';
      if (control.errors['email']) return 'Email inválido';
      if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    }
    
    return '';
  }

  private marcarCamposComoSujos(): void {
    Object.keys(this.clienteForm.controls).forEach(key => {
      this.clienteForm.get(key)?.markAsTouched();
    });
  }

  private mostrarMensagem(mensagem: string, tipo: 'sucesso' | 'erro') {
    this.mensagem = mensagem;
    this.tipoMensagem = tipo;
  }

  closeModal() {
    this.close.emit();
  }
}