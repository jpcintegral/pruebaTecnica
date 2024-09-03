using System.Text.Json.Serialization;


namespace apiCompras.Entities
{
    public class Carrito
    {
        public int CarritoID { get; set; }
        public int ClienteID { get; set; }
        public DateTime FechaCreacion { get; set; }

        public Cliente Cliente { get; set; }
        
        public ICollection<CarritoArticulo> CarritoArticulos { get; set; }
    }

}
