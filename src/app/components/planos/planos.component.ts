import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planos.component.html',
  styleUrl: './planos.component.css'
})
export class PlanosComponent {

  planos = [{
    id: 1,
    image: "https://drive.google.com/file/d/142nCgPTYV6F4f9FQx8vVW5cku8Bw7zXW/view?usp=sharing",
    name: "teste",
    value: 5,
  }, {
    id: 1,
    image: "assets/images/icon-arcade.svg",
    name: "teste",
    value: 5,
  }, {
    id: 1,
    image: "assets/images/icon-arcade.svg",
    name: "teste",
    value: 5,
  }]
}
