using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using apiCompras.Data;
using apiCompras.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace apiCompras.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly TiendaDataContext _context;

        public AuthController(IConfiguration configuration, TiendaDataContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] ClienteAuthModel model)
        {
            if (ModelState.IsValid)
            {
                
                var existingUser = await _context.Clientes.SingleOrDefaultAsync(c => c.Email == model.Email);
                if (existingUser != null)
                {
                    return BadRequest("User already exists.");
                }

               
                var cliente = new Cliente
                {
                    Nombre = model.Nombre,
                    Apellidos = model.Apellidos,
                    Direccion = model.Direccion,
                    Email = model.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(model.Password) // Hash the password
                };

                _context.Clientes.Add(cliente);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User registered successfully." });
            }

            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] ClienteAuthModel model)
        {
            if (ModelState.IsValid)
            {
                var cliente = await _context.Clientes.SingleOrDefaultAsync(c => c.Email == model.Email);
                if (cliente == null || !BCrypt.Net.BCrypt.Verify(model.Password, cliente.Password))
                {
                    return Unauthorized("Invalid credentials.");
                }

                var token = GenerateJwtToken(cliente);

                return Ok(new { Token = token });
            }

            return BadRequest(ModelState);
        }

        private string GenerateJwtToken(Cliente cliente)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, cliente.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
