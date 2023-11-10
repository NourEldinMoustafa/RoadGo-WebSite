using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoadGoAPI.Models
{
    public class Driver
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }

        public Byte[] PersonalPhoto { get; set; }
        public Byte[] DrivingLicenseImage { get; set; }
        public Byte[] FormImage { get; set; } // الاستمارة

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:MM-dd-yyy}", ApplyFormatInEditMode = true)]
        public DateTime HireingDate { get; set; } = DateTime.Now;
        public string Password { get; set; }
        public string NationalId { get; set; }
        public bool Gender { get; set; }//0 female 1 male

        [ForeignKey("CityId")]
        public int CityId { get; set; }
        public City City { get; set; }

        public string VehicleModel { get; set; }
        public string VehicleColor { get; set; }
        public string VehiclePlate {  get; set; }
        public Byte[] VehicleFrontImage { get; set;}
        public Byte[] VehicleBackImage { get; set; }

        //public Byte[] PersonalPhoto { get; set; } 
        //public Byte[] DrivingLicenseImage { get; set; }
        //public Byte[] FormImage { get; set; } // الاستمارة

    }
}
