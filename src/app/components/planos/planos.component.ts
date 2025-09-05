import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlanosModel } from './planos.model';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planos.component.html',
  styleUrl: './planos.component.css'
})
export class PlanosComponent {
  planos: PlanosModel[] = [{
    id: 1,
    image: 'assets/icons/icon-advanced.svg',
    name: "Arcade",
    value: 9,
  }, {
    id: 2,
    image: 'assets/icons/icon-arcade.svg',
    name: "Advanced",
    value: 12,
  }, {
    id: 3,
    image: 'assets/icons/icon-pro.svg',
    name: "Pro",
    value: 15,
  }]
}
