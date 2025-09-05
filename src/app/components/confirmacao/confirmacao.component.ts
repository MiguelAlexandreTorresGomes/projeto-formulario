import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlanosModel } from '../planos/planos.model';
import { AddonsModel } from '../addons/addons.model';

@Component({
  selector: 'app-confirmacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css'
})
export class ConfirmacaoComponent {

   get total(): number {
    const planos = this.planos.reduce((acc, p) => acc + p.value, 0);
    const servicos = this.servicos.reduce((acc, s) => acc + s.value, 0);
    return planos + servicos;
  }

  planos: PlanosModel[] = [{
    id: 1,
    image: 'assets/icons/icon-advanced.svg',
    name: "Arcade",
    value: 9,
  }
  ];

  servicos: AddonsModel[] = [{
    id: 3,
    name: 'Perfil Customizavel',
    info: "Tema customizado para o seu perfil",
    value: 9,
  }]
}