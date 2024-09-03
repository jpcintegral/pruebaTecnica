import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';  
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table'; 
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';




import { AppComponent } from './app.component';
import { TiendaListComponent } from './components/tienda-list/tienda-list/tienda-list.component';
import { ArticuloListComponent } from './components/articulo-list/articulo-list/articulo-list.component';
import { ArticuloTiendaListComponent } from './components/articulo-tienda-list/articulo-tienda-list/articulo-tienda-list.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form/cliente-form.component';

import { HttpService } from './services/http.service';
import { TiendaFormComponent } from './components/tienda-form/tienda-form/tienda-form.component';
import { ArticuloFormComponent } from './components/articulo-form/articulo-form/articulo-form.component';
import { CarritoComponent } from './components/carrito/carrito/carrito.component';
import { MenuComponent } from './components/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './components/auth/auth.component';



@NgModule({
  declarations:[
    AppComponent,
    TiendaListComponent,
    ArticuloListComponent,
    ArticuloTiendaListComponent,
    ClienteListComponent,
    ClienteFormComponent,
    TiendaFormComponent,
    ArticuloFormComponent,
    CarritoComponent,
    MenuComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,  
    MatDialogModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    RouterModule,
    MatMenuModule,
    AppRoutingModule,
    MatSnackBarModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }