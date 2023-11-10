namespace RoadGoAPI.Dtos
{
    public class DriverDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IFormFile PersonalPhoto { get; set; }
        public IFormFile DrivingLicenseImage { get; set; }
        public IFormFile FormImage { get; set; } // الاستمارة
        public string Phone { get; set; }
        public string Password { get; set; }
        public string NationalId { get; set; }
        public bool Gender { get; set; }//0 female 1 male

        public int CityId { get; set; }

        public string VehicleModel { get; set; }
        public string VehicleColor { get; set; }
        public string VehiclePlate { get; set; }
        public IFormFile VehicleFrontImage { get; set; }
        public IFormFile VehicleBackImage { get; set; }
        
    }
}
