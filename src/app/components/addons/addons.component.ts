import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Addons } from '../../models/addons/addons.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user/user.model';


@Component({
  selector: 'app-addons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './addons.component.html',
  styleUrl: './addons.component.css'
})
export class AddonsComponent {
  user: User | null = null;
  addons: Addons[] = [
    new Addons(1, 'Serviço', "Acesse a jogos cooperativos", 3, 30),
    new Addons(2, 'Mais espaço', "1Tera extra com bakcup em nuvem", 6, 60),
    new Addons(3, 'Perfil Customizavel', "Tema customizado para o seu perfil", 9, 90)
  ];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (!this.user) {
      this.user = new User();
      this.userService.setUser(this.user);
    }
    console.log('Usuário recebido na tela de addons:', this.user);
  }


  selecionarAddon(addon: Addons) {
    if (!this.user) return;
    const addonsSelecionados = this.user.addons ?? [];

    const index = addonsSelecionados.findIndex(a => a.id === addon.id);

    if (index >= 0) {
      addonsSelecionados.splice(index, 1);
    } else {
      addonsSelecionados.push(addon);
    }

    this.user.addons = addonsSelecionados;
    this.userService.setUser(this.user);

    console.log('User atualizado:', this.user);
  }


  toggleAddon(event: Event, addon: Addons) {
    if (!this.user) return;

    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      if (!(this.user.addons || []).some(a => a.id === addon.id)) {
        this.user.addons = [...(this.user.addons || []), addon];
      }
    } else {
      this.user.addons = (this.user.addons || []).filter(a => a.id !== addon.id);
    }

    this.userService.setUser(this.user);
  }

  isAddonSelected(addon: Addons): boolean {
    return !!this.user && Array.isArray(this.user.addons) && this.user.addons.some(a => a.id === addon.id);
  }
}
