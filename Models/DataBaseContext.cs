using Microsoft.EntityFrameworkCore;

namespace PROWEB11.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
        }

        public DbSet<Baraja> Baraja { get; set; }
        public DbSet<Carta> Carta{ get; set; }
        public DbSet<Jugador> Jugador{ get; set; }
    }
}
