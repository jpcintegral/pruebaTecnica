import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Carrito } from '../../../models/carrito.model';
import { CarritoArticulo } from '../../../models/carritoArticulo.model';
import { Articulo } from '../../../models/articulo.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: Carrito | null = null;
  articulos: Articulo[] = [];
  selectedItems: CarritoArticulo[] = [];
  selectedItemsDataSource: MatTableDataSource<CarritoArticulo> = new MatTableDataSource();
  clienteId: number = 3;

  displayedColumns: string[] = ['codigo', 'descripcion', 'cantidad', 'actions'];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.loadCarrito();
    this.loadArticulos();
  }

  loadCarrito(): void {
    this.httpService.getCarrito(this.clienteId).subscribe(carrito => {       
      this.carrito = carrito;  
      if (carrito?.carritoArticulos) {
        this.selectedItems = carrito.carritoArticulos;
        this.selectedItemsDataSource.data = this.selectedItems;
      } else {
        this.selectedItems = [];
        this.selectedItemsDataSource.data = [];
      }
    });
  }

  loadArticulos(): void {
    this.httpService.getArticulos().subscribe(articulos => {
      this.articulos = articulos;
    });
  }

  addItem(articuloId: number | null, cantidad: number): void {
    if (articuloId !== null && cantidad > 0) {
      this.httpService.addItemToCarrito(this.clienteId, articuloId, cantidad).subscribe(() => {
        this.loadCarrito();  // Actualizar la vista después de agregar el artículo
      });
    }
  }

  removeSelectedItem(articulo: CarritoArticulo): void {
    this.selectedItems = this.selectedItems.filter(item => item.articulo.articuloID !== articulo.articulo.articuloID);

    console.log('Cliente ID:', this.clienteId);
    console.log('Artículo ID:', articulo.articulo.articuloID);
    this.selectedItemsDataSource.data = this.selectedItems;
    this.httpService.removeItemFromCarrito(this.clienteId, articulo.articulo.articuloID).subscribe();
  }

  incrementarCantidad(articulo: Articulo): void {
    if (!articulo.cantidadSeleccionada) {
      articulo.cantidadSeleccionada = 0;
    }
    if (articulo.cantidadSeleccionada < articulo.stock) {
      articulo.cantidadSeleccionada++;
    }
  }

  decrementarCantidad(articulo: Articulo): void {
    if (articulo.cantidadSeleccionada && articulo.cantidadSeleccionada > 0) {
      articulo.cantidadSeleccionada--;
    }
  }

  agregarAlCarrito(articulo: Articulo): void {
    if (articulo.cantidadSeleccionada && articulo.cantidadSeleccionada > 0) {
      this.addItem(articulo.articuloID, articulo.cantidadSeleccionada);
    }
  }

  cancelarSeleccion(articulo: Articulo): void {
    articulo.cantidadSeleccionada = 0;
  }

  limpiarSeleccion(articulo: Articulo): void {
    articulo.cantidadSeleccionada = 0;
  }
}
