using apiCompras.Business;
using apiCompras.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace apiCompras.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticuloController : ControllerBase
    {
        private readonly IRepository<Articulo> _articuloRepository;
        private readonly IRepository<Tienda> _tiendaRepository;
        private readonly IWebHostEnvironment _environment;
    

        public ArticuloController(IRepository<Articulo> articuloRepository, IRepository<Tienda> tiendaRepository, IWebHostEnvironment environment)
        {
            _articuloRepository = articuloRepository;
            _tiendaRepository = tiendaRepository;
            _environment = environment;
        }

        [HttpGet]
        public async Task<IEnumerable<Articulo>> GetArticulos()
        {
            return await _articuloRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Articulo>> GetArticulo(int id)
        {
            var articulo = await _articuloRepository.GetById(id);
            if (articulo == null)
            {
                return NotFound();
            }

            return articulo;
        }

        [HttpPost]
        public async Task<ActionResult<Articulo>> PostArticulo(
            [FromForm] string codigo,
            [FromForm] string descripcion,
            [FromForm] decimal precio,
            [FromForm] int stock,
            [FromForm] int tiendaID,
            [FromForm] IFormFile imagen)
        {
            // Verificar si la tienda asociada existe
            var tienda = await _tiendaRepository.GetById(tiendaID);
            if (tienda == null)
            {
                return BadRequest("La tienda asociada no existe.");
            }

            // Crear un nuevo Articulo
            var articulo = new Articulo
            {
                Codigo = codigo,
                Descripcion = descripcion,
                Precio = precio,
                Stock = stock,
                TiendaID = tiendaID,
                Tienda = tienda
            };

            var random = new Random();
            string fileName = $"{articulo.Codigo}_{DateTime.Now:yyyyMMdd}_{random.Next(1, 100)}{Path.GetExtension(imagen.FileName)}";

            // Ruta completa de la carpeta donde se guardará la imagen
            var filePath = Path.Combine(_environment.WebRootPath, "imgArticulo", fileName);

            // Crear la carpeta si no existe
            if (!Directory.Exists(Path.Combine(_environment.WebRootPath, "imgArticulo")))
            {
                Directory.CreateDirectory(Path.Combine(_environment.WebRootPath, "imgArticulo"));
            }

            // Guardar la imagen en la carpeta
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imagen.CopyToAsync(stream);
            }

            // Guardar solo el nombre del archivo en la base de datos
            articulo.Imagen = fileName;

            var newArticulo = await _articuloRepository.Add(articulo);
            return CreatedAtAction(nameof(GetArticulo), new { id = newArticulo.ArticuloID }, newArticulo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticulo(
            int id,
            [FromForm] string codigo,
            [FromForm] string descripcion,
            [FromForm] decimal precio,
            [FromForm] int stock,
            [FromForm] int tiendaID,
            [FromForm] IFormFile imagen)
        {
            // Verificar si el artículo existe
            var articulo = await _articuloRepository.GetById(id);
            if (articulo == null)
            {
                return NotFound();
            }

            // Verificar si la tienda asociada existe
            var tienda = await _tiendaRepository.GetById(tiendaID);
            if (tienda == null)
            {
                return BadRequest("La tienda asociada no existe.");
            }

            // Actualizar el artículo
            articulo.Codigo = codigo;
            articulo.Descripcion = descripcion;
            articulo.Precio = precio;
            articulo.Stock = stock;
            articulo.TiendaID = tiendaID;
            articulo.Tienda = tienda;

            var random = new Random();
            string fileName = $"{articulo.Codigo}_{DateTime.Now:yyyyMMdd}_{random.Next(1, 100)}{Path.GetExtension(imagen.FileName)}";

            // Ruta completa de la carpeta donde se guardará la imagen
            var filePath = Path.Combine(_environment.WebRootPath, "imgArticulo", fileName);

            // Crear la carpeta si no existe
            if (!Directory.Exists(Path.Combine(_environment.WebRootPath, "imgArticulo")))
            {
                Directory.CreateDirectory(Path.Combine(_environment.WebRootPath, "imgArticulo"));
            }

            // Guardar la imagen en la carpeta
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imagen.CopyToAsync(stream);
            }

            // Guardar solo el nombre del archivo en la base de datos
            articulo.Imagen = fileName;

            await _articuloRepository.Update(articulo);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticulo(int id)
        {
            var deleted = await _articuloRepository.Delete(id);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
