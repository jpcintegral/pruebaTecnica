using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiCompras.Entities
{
    public class ArticuloTienda
    {
        public int ArticuloTiendaID { get; set; }
        public int ArticuloID { get; set; }
        public int TiendaID { get; set; }
        public DateTime Fecha { get; set; }

        public Articulo Articulo { get; set; }
        public Tienda Tienda { get; set; }
    }
}
