using System.Text.Json.Serialization;


namespace apiCompras.Entities
{
    public class CarritoArticulo
    {
        public int CarritoArticuloID { get; set; }
        public int CarritoID { get; set; }
        public int ArticuloID { get; set; }
        public int Cantidad { get; set; }
        [JsonIgnore]
        public Carrito Carrito { get; set; }
       
        public Articulo Articulo { get; set; }
    }
}
