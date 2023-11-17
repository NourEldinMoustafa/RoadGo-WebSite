using System.ComponentModel.DataAnnotations;

namespace RoadGoAPI.Models
{
    public class VehicleColor
    {
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
    }
}
