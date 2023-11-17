using Microsoft.EntityFrameworkCore;

namespace RoadGoAPI.Models
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options ):base(options)
        {
        }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<VehicleModel> VehiclesModels { get; set; }
        public DbSet<VehicleColor> VehiclesColors { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
