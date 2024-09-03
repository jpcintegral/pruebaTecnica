using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiCompras.Entities
{
    public class ClienteArticulo
    {
        public int ClienteArticuloID { get; set; }
        public int ClienteID { get; set; }
        public int ArticuloID { get; set; }
        public DateTime Fecha { get; set; }

        public Cliente Cliente { get; set; }
        public Articulo Articulo { get; set; }

    }
}
