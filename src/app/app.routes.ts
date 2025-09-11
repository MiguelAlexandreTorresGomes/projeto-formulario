import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PlanosComponent } from './components/planos/planos.component';
import { AddonsComponent } from './components/addons/addons.component';
import { ConfirmacaoComponent } from './components/confirmacao/confirmacao.component';
import { FinalizadoComponent } from './components/finalizado/finalizado.component';

export const routes: Routes = [
    {
        path:"",
        component:LoginComponent,
    },
    {
        path:"login",
        component:LoginComponent,
    },
    {
        path:"planos",
        component:PlanosComponent,
    },
    {
        path:"addons",
        component:AddonsComponent,
    },
    {
        path:"confirmacao",
        component:ConfirmacaoComponent,
    },
    {
        path:"finalizado",
        component:FinalizadoComponent,
    }
    
];
