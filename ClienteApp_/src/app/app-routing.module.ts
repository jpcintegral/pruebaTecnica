import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaFormComponent } from './components/tienda-form/tienda-form/tienda-form.component';
import { ArticuloFormComponent } from './components/articulo-form/articulo-form/articulo-form.component';
import { CarritoComponent } from './components/carrito/carrito/carrito.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: 'tiendas', component: TiendaFormComponent },
  { path: 'articulos', component: ArticuloFormComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: '', component: AuthComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
