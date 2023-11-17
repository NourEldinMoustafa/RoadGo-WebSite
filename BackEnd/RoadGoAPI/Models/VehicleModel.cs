using System.ComponentModel.DataAnnotations;

namespace RoadGoAPI.Models
{
    public class VehicleModel
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

    }
}
