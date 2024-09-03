
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using apiCompras.Business;
using apiCompras.Entities;
using apiCompras.Data;

namespace apiCompras.Services
{
    public class AuthService
    {
        private readonly TiendaDataContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(TiendaDataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public string Authenticate(string email, string password)
        {
            var cliente = _context.Clientes.SingleOrDefault(c => c.Email == email);

            if (cliente == null || !VerifyPassword(cliente, password))
            {
                return null;
            }

            return GenerateJwtToken(cliente);
        }

        public bool Register(string email, string password, string nombre, string apellidos)
        {
            if (_context.Clientes.Any(c => c.Email == email))
            {
                return false; // Usuario ya registrado
            }

            var cliente = new Cliente
            {
                Email = email,
                Password = HashPassword(password),
                Nombre = nombre,
                Apellidos = apellidos
            };

            _context.Clientes.Add(cliente);
            _context.SaveChanges();

            return true;
        }

        private string GenerateJwtToken(Cliente cliente)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.NameIdentifier, cliente.ClienteID.ToString()),
                new Claim(ClaimTypes.Email, cliente.Email),
                new Claim(ClaimTypes.Name, $"{cliente.Nombre} {cliente.Apellidos}")
            }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private bool VerifyPassword(Cliente cliente, string password)
        {
            // Implementa la lógica para comparar la contraseña
            return cliente.Password == HashPassword(password);
        }

        private string HashPassword(string password)
        {
            // Implementa un método para hacer hash de la contraseña
            // Para simplificar, este ejemplo no usa hash. En producción, usa un algoritmo seguro.
            return password;
        }
    }
}
