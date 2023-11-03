namespace RoadGoAPI.Models
{
    public class Driver
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }

        public string PersonalPhoto { get; set; }
        public string DrivingLicenseImage { get; set; }
        public string FormImage { get; set; } // الاستمارة

        //public Byte[] PersonalPhoto { get; set; } 
        //public Byte[] DrivingLicenseImage { get; set; }
        //public Byte[] FormImage { get; set; } // الاستمارة

    }
}
