using apiCompras.Business;
using apiCompras.Entities;
using apiCompras.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiCompras.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarritoController : ControllerBase
    {
        private readonly TiendaDataContext _context;

        public CarritoController(TiendaDataContext context)
        {
            _context = context;
        }

        [HttpGet("{clienteId}")]
        public async Task<ActionResult<Carrito>> GetCarrito(int clienteId)
        {

            var carrito = await _context.Carritos
                .Include(c => c.CarritoArticulos)
                .ThenInclude(ca => ca.Articulo)
                .FirstOrDefaultAsync(c => c.ClienteID == clienteId);

            if (carrito == null)
            {
                return NotFound();
            }

            return carrito;
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddItemToCarrito([FromBody] AddItemToCarritoRequest request)
        {
            // Verificar que la solicitud no sea nula
            if (request == null)
            {
                return BadRequest("Invalid request.");
            }

            // Verificar que la cantidad sea válida
            if (request.Cantidad <= 0)
            {
                return BadRequest("Cantidad must be greater than zero.");
            }

            // Buscar el carrito para el cliente
            var carrito = await _context.Carritos
                .Include(c => c.CarritoArticulos)
                .ThenInclude(ca => ca.Articulo)
                .FirstOrDefaultAsync(c => c.ClienteID == request.ClienteId);

            // Si no existe, crear uno nuevo
            if (carrito == null)
            {
                carrito = new Carrito
                {
                    ClienteID = request.ClienteId,
                    FechaCreacion = DateTime.UtcNow,
                    CarritoArticulos = new List<CarritoArticulo>()
                };

                _context.Carritos.Add(carrito);
            }

            // Buscar el artículo
            var articulo = await _context.Articulos.FindAsync(request.ArticuloId);

            if (articulo == null)
            {
                return NotFound("Articulo not found.");
            }

            // Verificar si el artículo ya está en el carrito
            var carritoArticulo = carrito.CarritoArticulos.FirstOrDefault(ca => ca.ArticuloID == request.ArticuloId);

            if (carritoArticulo != null)
            {
                // Actualizar la cantidad si ya está en el carrito
                carritoArticulo.Cantidad += request.Cantidad;
            }
            else
            {
                // Agregar el nuevo artículo al carrito
                carrito.CarritoArticulos.Add(new CarritoArticulo
                {
                    ArticuloID = request.ArticuloId,
                    Cantidad = request.Cantidad
                });
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("remove")]
        public async Task<ActionResult> RemoveItemFromCarrito([FromBody] RemoveItemRequest request)
        {
            var carrito = await _context.Carritos
                .Include(c => c.CarritoArticulos)
                .FirstOrDefaultAsync(c => c.ClienteID == request.ClienteId);

            if (carrito == null)
            {
                return NotFound("Carrito not found.");
            }

            var carritoArticulo = carrito.CarritoArticulos.FirstOrDefault(ca => ca.ArticuloID == request.ArticuloId);

            if (carritoArticulo != null)
            {
                carrito.CarritoArticulos.Remove(carritoArticulo);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }


        [HttpPost("clear")]
        public async Task<ActionResult> ClearCarrito(int clienteId)
        {
            var carrito = await _context.Carritos
                .Include(c => c.CarritoArticulos)
                .FirstOrDefaultAsync(c => c.ClienteID == clienteId);

            if (carrito == null)
            {
                return NotFound("Carrito not found.");
            }

            carrito.CarritoArticulos.Clear();
            await _context.SaveChangesAsync();

            return Ok();
        }
    }

   
    public class AddItemToCarritoRequest
    {
        public int ClienteId { get; set; }
        public int ArticuloId { get; set; }
        public int Cantidad { get; set; }
    }
    public class RemoveItemRequest
    {
        public int ClienteId { get; set; }
        public int ArticuloId { get; set; }
    }

}
