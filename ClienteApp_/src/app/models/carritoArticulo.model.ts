import { Articulo } from './articulo.model';
export interface CarritoArticulo {
    idCarritoArticulo: number;
    idCarrito: number;
    idArticulo: number;
    cantidad: number;
    articulo: Articulo
    fecha: Date;
  }
 