import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { RubroComponent } from './pages/rubro/rubro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HomeComponent } from './pages/home/home.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LegalsComponent } from './pages/legals/legals.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent, 
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'carrito',
    component: CarritoComponent
  },
  {
    path: 'categoria/:id',
    component: RubroComponent
  },
  {
    path: 'articulo/:id',
    component: ArticuloComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'buscar',
    component: BuscarComponent
  },
  {
    path: 'legals',
    component: LegalsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
