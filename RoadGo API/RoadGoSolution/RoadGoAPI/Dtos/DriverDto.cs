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
    }
}
