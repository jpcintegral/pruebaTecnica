using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using apiCompras.Entities;
using Microsoft.EntityFrameworkCore;
namespace apiCompras.Data
{
    public class TiendaDataContext : DbContext
    {

        public TiendaDataContext(DbContextOptions<TiendaDataContext> options) : base(options) { }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Tienda> Tiendas { get; set; }
        public DbSet<Articulo> Articulos { get; set; }
        public DbSet<ArticuloTienda> ArticuloTiendas { get; set; }
             public DbSet<Carrito> Carritos { get; set; }
        public DbSet<CarritoArticulo> CarritoArticulos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tienda>().ToTable("Tienda");
            modelBuilder.Entity<Cliente>().ToTable("Cliente");
            modelBuilder.Entity<Articulo>().ToTable("Articulo");
            modelBuilder.Entity<ArticuloTienda>().ToTable("ArticuloTienda");
            modelBuilder.Entity<Carrito>().ToTable("Carrito");
            modelBuilder.Entity<CarritoArticulo>().ToTable("CarritoArticulo");
           ;

            modelBuilder.Entity<ArticuloTienda>()
                .HasOne(at => at.Articulo)
                .WithMany()
                .HasForeignKey(at => at.ArticuloID);

            modelBuilder.Entity<ArticuloTienda>()
                .HasOne(at => at.Tienda)
                .WithMany()
                .HasForeignKey(at => at.TiendaID);
            

            modelBuilder.Entity<CarritoArticulo>()
               .HasOne(ca => ca.Carrito)
               .WithMany(c => c.CarritoArticulos)
               .HasForeignKey(ca => ca.CarritoID);

            modelBuilder.Entity<CarritoArticulo>()
                .HasOne(ca => ca.Articulo)
                .WithMany()
                .HasForeignKey(ca => ca.ArticuloID);


            modelBuilder.Entity<Carrito>()
           .HasMany(c => c.CarritoArticulos)
           .WithOne(ca => ca.Carrito)
           .HasForeignKey(ca => ca.CarritoID)
           .OnDelete(DeleteBehavior.Cascade); 

           
            modelBuilder.Entity<CarritoArticulo>()
                .HasOne(ca => ca.Articulo)
                .WithMany() 
                .HasForeignKey(ca => ca.ArticuloID)
                .OnDelete(DeleteBehavior.Restrict);



        }
    }
}
