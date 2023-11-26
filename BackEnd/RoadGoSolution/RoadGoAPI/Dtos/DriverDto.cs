using RoadGoAPI.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoadGoAPI.Dtos
{
    public class DriverDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public IFormFile PersonalPhoto { get; set; }
        public IFormFile DrivingLicenseImage { get; set; }
        public IFormFile FormImage { get; set; } // الاستمارة
        public string Password { get; set; }
        public string NationalId { get; set; }
        public string Gender { get; set; }//0 female 1 male
        public int CityId { get; set; }
        public int VehicleModelId { get; set; }
        public string VehicleColor { get; set; }
        public string VehiclePlateRight { get; set; }
        public string VehiclePlateMiddle { get; set; }
        public string VehiclePlateLeft { get; set; }
        public string VehiclePlateNumber { get; set; }
        public IFormFile VehicleFrontImage { get; set; }
        public IFormFile VehicleBackImage { get; set; }
        public bool IsTrusted { get; set; }

    }
}
