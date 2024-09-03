export interface ArticuloTienda {
    idArticuloTienda: number;
    idArticulo: number;
    idTienda: number;
    fecha: Date;
    articulo: string; // Puedes expandir este campo para manejar más detalles del artículo
    tienda: string;   // Puedes expandir este campo para manejar más detalles de la tienda
  }
  