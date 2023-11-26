using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoadGoAPI.Models
{
    public class Driver
    {
        public int Id { get; set; }

        [StringLength(30)]
        public string FirstName { get; set; }

        [StringLength(30)]
        public string LastName { get; set; }

        [StringLength(13)]// + and 12 number check if have a character
        public string Phone { get; set; }

        public Byte[] PersonalPhoto { get; set; }
        public Byte[] DrivingLicenseImage { get; set; }
        public Byte[] FormImage { get; set; } // الاستمارة

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:MM-dd-yyy}", ApplyFormatInEditMode = true)]
        public DateTime HireingDate { get; set; } = DateTime.Now;

        public string Password { get; set; }

        [StringLength(14)]
        public string NationalId { get; set; }

        [StringLength(5)]
        public string Gender { get; set; }//0 female 1 male

        [ForeignKey("CityId")]
        public int CityId { get; set; }
        public City? City { get; set; }

        [ForeignKey("VehicleModelId")]
        public int VehicleModelId { get; set; }
        public VehicleModel? VehicleModel { get; set; }

        public string VehicleColor {  get; set; }
        [StringLength(1)]
        public string VehiclePlateRight {  get; set; }
        [StringLength(1)]
        public string VehiclePlateMiddle {  get; set; }
        [StringLength(1)]
        public string VehiclePlateLeft {  get; set; }

        [StringLength(4)]
        public string VehiclePlateNumber{  get; set; }

        public Byte[] VehicleFrontImage { get; set;}
        public Byte[] VehicleBackImage { get; set; }

        public bool IsTrusted { get; set; }
    }
}
