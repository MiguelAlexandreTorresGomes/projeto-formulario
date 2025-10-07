import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PlanosComponent } from './components/planos/planos.component';
import { AddonsComponent } from './components/addons/addons.component';
import { ConfirmacaoComponent } from './components/confirmacao/confirmacao.component';
import { FinalizadoComponent } from './components/finalizado/finalizado.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdmLoginComponent } from './components/adm/adm-login/adm-login.component';
import { ControleComponent } from './components/adm/controle/controle.component';
import { ListClientComponent } from './components/adm/list-client/list-client.component';
import { MainComponent } from './components/adm/main/main.component';
import { AuthGuard } from './guards/auth.guard'; 

export const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: "",
        component: LoginComponent,
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "planos",
        component: PlanosComponent,
      },
      {
        path: "addons",
        component: AddonsComponent,
      },
      {
        path: "confirmacao",
        component: ConfirmacaoComponent,
      },
      {
        path: "finalizado",
        component: FinalizadoComponent,
      },
    ]
  },
  
  { 
    path: 'adm/login', 
    component: AdmLoginComponent 
  },
  {
    path: 'adm/dashboard', 
    component: ControleComponent, 
    canActivate: [AuthGuard], 
    children: [
      {
        path: 'menu',
        component: MainComponent
      },
      {
        path: 'clientes',
        component: ListClientComponent
      },
    ]
  },
  
  // Redirecionamentos
  { path: 'adm', redirectTo: 'adm/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];