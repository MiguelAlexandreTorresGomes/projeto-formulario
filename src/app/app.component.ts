import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto-formulario';

    constructor(private router: Router){}

   ngOnInit() {
    this.router.navigate(['/login']);
  }
}
