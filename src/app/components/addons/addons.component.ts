import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddonsModel } from './addons.model';

@Component({
  selector: 'app-addons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './addons.component.html',
  styleUrl: './addons.component.css'
})
export class AddonsComponent {
  addons: AddonsModel[] = [{
    id: 1,
    name: 'Serviço online',
    info: "Acesse a jogos cooperativos",
    value: 3,
  },
  {
    id: 2,
    name: 'Mais espaço',
    info: "1Tera extra com bakcup em nuvem",
    value: 6,
  },
  {
    id: 3,
    name: 'Perfil Customizavel',
    info: "Tema customizado para o seu perfil",
    value: 9,
  },
  ]
}
