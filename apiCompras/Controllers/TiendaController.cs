using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using apiCompras.Business;
using apiCompras.Entities;

namespace apiCompras.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiendaController : ControllerBase
    {
        private readonly IRepository<Tienda> _tiendaRepository;

        public TiendaController(IRepository<Tienda> tiendaRepository)
        {
            _tiendaRepository = tiendaRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Tienda>> GetTiendas()
        {
            return await _tiendaRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tienda>> GetTienda(int id)
        {
            var tienda = await _tiendaRepository.GetById(id);
            if (tienda == null)
            {
                return NotFound();
            }

            return tienda;
        }

        [HttpPost]
        public async Task<ActionResult<Tienda>> PostTienda(Tienda tienda)
        {

            if (string.IsNullOrEmpty(tienda.Sucursal) || string.IsNullOrEmpty(tienda.Direccion))
            {
                return BadRequest("La Sucursal y  Direccion son requeridas.");
            }

            var newTienda = await _tiendaRepository.Add(tienda);
            return CreatedAtAction(nameof(GetTienda), new { id = newTienda.TiendaID }, newTienda);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTienda(int id, Tienda tienda)
        {
            if (id != tienda.TiendaID)
            {
                return BadRequest();
            }

            await _tiendaRepository.Update(tienda);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTienda(int id)
        {
            var deleted = await _tiendaRepository.Delete(id);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
