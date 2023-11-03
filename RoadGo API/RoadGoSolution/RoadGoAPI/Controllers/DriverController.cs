using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using RoadGoAPI.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RoadGoAPI.Dtos;
using static System.Net.Mime.MediaTypeNames;
using System;

namespace RoadGoAPI.Controllers
{
    public class DriverController : Controller
    {
        private readonly ApplicationDbContext _AppContext;
        public DriverController(ApplicationDbContext AppContext)
        {
            _AppContext = AppContext;
        }


        [HttpGet("GetAllDrivers")]
        public async Task<IActionResult> GetAllDriversAsync()
        {
            var drivers = await _AppContext.Drivers.ToListAsync();
            return Ok(drivers);
        }
        [HttpGet("GetDriver")]
        public async Task<IActionResult> GetDriverAsync(int id)
        {
            var driver = await _AppContext.Drivers.FirstOrDefaultAsync(d=>d.Id == id);
            return Ok(driver);
        }
        [HttpPost("AddNewDriver")]
        public async Task<IActionResult> AddNewDriverAsync(DriverDto dto)
        {
            // svaing the files in dirctory

            string PersonalPhotouploadDir = @"D:\Freelancing\Road Go\Final\VS code\RoadGo-WebSite\assets\img";
            Directory.CreateDirectory(PersonalPhotouploadDir);

            string PersonalPhotouniqueFileName = dto.FirstName + dto.LastName + dto.Phone + "_" + dto.PersonalPhoto.FileName;
            string PersonalPhotofilePath = Path.Combine(PersonalPhotouploadDir, PersonalPhotouniqueFileName);

            using (var fileStream = new FileStream(PersonalPhotofilePath, FileMode.Create))
            {
                await dto.PersonalPhoto.CopyToAsync(fileStream);
            }


            string DrivingLicenseImageuploadDir = @"D:\Freelancing\Road Go\Final\VS code\RoadGo-WebSite\assets\img";
            Directory.CreateDirectory(DrivingLicenseImageuploadDir);

            string DrivingLicenseImageuniqueFileName = dto.FirstName + dto.LastName + dto.Phone + "_" + dto.DrivingLicenseImage.FileName;
            string DrivingLicenseImagefilePath = Path.Combine(DrivingLicenseImageuploadDir, DrivingLicenseImageuniqueFileName);

            using (var fileStream = new FileStream(DrivingLicenseImagefilePath, FileMode.Create))
            {
                await dto.PersonalPhoto.CopyToAsync(fileStream);
            }

            string FormImageuploadDir = @"D:\Freelancing\Road Go\Final\VS code\RoadGo-WebSite\assets\img";
            Directory.CreateDirectory(FormImageuploadDir);

            string FormImageuniqueFileName = dto.FirstName + dto.LastName + dto.Phone + "_" + dto.FormImage.FileName;
            string FormImagefilePath = Path.Combine(FormImageuploadDir, FormImageuniqueFileName);

            using (var fileStream = new FileStream(FormImagefilePath, FileMode.Create))
            {
                await dto.PersonalPhoto.CopyToAsync(fileStream);
            }

            var driver = new Driver()
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                DrivingLicenseImage = DrivingLicenseImageuniqueFileName,
                FormImage = FormImageuniqueFileName,
                PersonalPhoto = PersonalPhotouniqueFileName,
                Phone = dto.Phone
            };
            await _AppContext.Drivers.AddAsync(driver);
            _AppContext.SaveChanges();
            return Ok(driver);
        }

        [HttpPut]
        [Route("Driver/UpdateDriver")]
        public async Task<IActionResult> UpdateDriver(int id,DriverDto dto)
        {
            // svaing the files in dirctory

            string PersonalPhotouploadDir = @"D:\Freelancing\Road Go\Final\VS code\RoadGo-WebSite\assets\img";
            Directory.CreateDirectory(PersonalPhotouploadDir);

            string PersonalPhotouniqueFileName = dto.FirstName + dto.LastName + dto.Phone + "_" + dto.PersonalPhoto.FileName;
            string PersonalPhotofilePath = Path.Combine(PersonalPhotouploadDir, PersonalPhotouniqueFileName);

            using (var fileStream = new FileStream(PersonalPhotofilePath, FileMode.Create))
            {
                await dto.PersonalPhoto.CopyToAsync(fileStream);
            }


            string DrivingLicenseImageuploadDir = @"D:\Freelancing\Road Go\Final\VS code\RoadGo-WebSite\assets\img";
            Directory.CreateDirectory(DrivingLicenseImageuploadDir);

            string DrivingLicenseImageuniqueFileName = dto.FirstName + dto.LastName + dto.Phone + "_" + dto.DrivingLicenseImage.FileName;
            string DrivingLicenseImagefilePath = Path.Combine(DrivingLicenseImageuploadDir, DrivingLicenseImageuniqueFileName);

            using (var fileStream = new FileStream(DrivingLicenseImagefilePath, FileMode.Create))
            {
                await dto.PersonalPhoto.CopyToAsync(fileStream);
            }

            string FormImageuploadDir = @"D:\Freelancing\Road Go\Final\VS code\RoadGo-WebSite\assets\img";
            Directory.CreateDirectory(FormImageuploadDir);

            string FormImageuniqueFileName = dto.FirstName + dto.LastName + dto.Phone + "_" + dto.FormImage.FileName;
            string FormImagefilePath = Path.Combine(FormImageuploadDir, FormImageuniqueFileName);

            using (var fileStream = new FileStream(FormImagefilePath, FileMode.Create))
            {
                await dto.PersonalPhoto.CopyToAsync(fileStream);
            }

            var driver = new Driver()
            {
                Id=id,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                DrivingLicenseImage = DrivingLicenseImageuniqueFileName,
                FormImage = FormImageuniqueFileName,
                PersonalPhoto = PersonalPhotouniqueFileName,
                Phone = dto.Phone   
            };

            var oldDriver = await _AppContext.Drivers.FirstOrDefaultAsync(d => d.Id == id);
            _AppContext.Drivers.Remove(oldDriver);

           await _AppContext.Drivers.AddAsync(driver);
            _AppContext.SaveChanges();
            return Ok(driver);
        }


    }
}
