import { CarritoArticulo } from './carritoArticulo.model';  
  export interface Carrito {
    carritoID: number;
    clienteID: number;
    fechaCreacion: string;  
    carritoArticulos: CarritoArticulo[]
  }