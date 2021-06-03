import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavbarComponent} from '../app/components/navbar/navbar.component';
import { ClientesComponent } from '../app/pages/clientes/clientes.component';
import { HomeComponent } from '../app/pages/home/home.component';
import {VentasComponent} from '../app/pages/ventas/ventas.component'



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'clientes', component: ClientesComponent  },
  { path: 'home', component: HomeComponent},
  {path: 'ventas', component: VentasComponent },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
