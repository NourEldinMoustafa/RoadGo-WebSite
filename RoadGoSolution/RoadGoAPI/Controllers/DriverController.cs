using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadGoAPI.Dtos;
using RoadGoAPI.Models;

namespace RoadGoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
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
            if (drivers.Count == 0)
            {
                return NotFound();
            }

            return Ok(drivers);
        }
        [HttpGet("GetDriver")]
        public async Task<IActionResult> GetDriverAsync(int id)
        {
            var driver = await _AppContext.Drivers.FirstOrDefaultAsync(d => d.Id == id);
            driver.City = await _AppContext.Cities.FirstOrDefaultAsync(c => c.Id == driver.CityId);
            return Ok(driver);
        }
        [HttpPost("AddNewDriver")]
        public async Task<IActionResult> AddNewDriverAsync(DriverDto dto)
        {
            var driver = new Driver
            {
                CityId = dto.CityId,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Password = dto.Password,
                Gender = dto.Gender,
                NationalId = dto.NationalId,
                VehicleColor = dto.VehicleColor,
                Phone = dto.Phone,
                VehiclePlate = dto.VehiclePlate,
                VehicleModel = dto.VehicleModel,


            };

            using (var memoryStream = new MemoryStream())
            {
                dto.DrivingLicenseImage.CopyTo(memoryStream);
                driver.DrivingLicenseImage = memoryStream.ToArray();
            }

            using (var memoryStream = new MemoryStream())
            {
                dto.VehicleFrontImage.CopyTo(memoryStream);
                driver.VehicleFrontImage = memoryStream.ToArray();
            }
            using (var memoryStream = new MemoryStream())
            {
                dto.VehicleBackImage.CopyTo(memoryStream);
                driver.VehicleBackImage = memoryStream.ToArray();
            }
            using (var memoryStream = new MemoryStream())
            {
                dto.PersonalPhoto.CopyTo(memoryStream);
                driver.PersonalPhoto = memoryStream.ToArray();
            }
            using (var memoryStream = new MemoryStream())
            {
                dto.FormImage.CopyTo(memoryStream);
                driver.FormImage = memoryStream.ToArray();
            }
            await _AppContext.AddAsync(driver);
            _AppContext.SaveChanges();

            return Ok(driver);
        }

        [HttpPut]
        [Route("UpdateDriver")]
        public async Task<IActionResult> UpdateDriverAsync(int id, [FromBody] DriverDto dto)
        {
            var existingDriver = await _AppContext.Drivers.FirstOrDefaultAsync(d => d.Id == id);

            if (dto.CityId != 0)
                existingDriver.CityId = dto.CityId;
            if (dto.FirstName != null)
                existingDriver.FirstName = dto.FirstName;
            if (dto.LastName != null)
                existingDriver.LastName = dto.LastName;
            if (dto.Password != null)
                existingDriver.Password = dto.Password;

            if (dto.Gender != null)

                existingDriver.Gender = dto.Gender;

            if (dto.NationalId != null)
                existingDriver.NationalId = dto.NationalId;
            if (dto.VehicleColor != null)
                existingDriver.VehicleColor = dto.VehicleColor;
            if (dto.Phone != null)
                existingDriver.Phone = dto.Phone;
            if (dto.VehiclePlate != null)
                existingDriver.VehiclePlate = dto.VehiclePlate;
            if (dto.VehicleModel != null)
                existingDriver.VehicleModel = dto.VehicleModel;



            using (var memoryStream = new MemoryStream())
            {
                if (dto.DrivingLicenseImage != null)
                {

                    dto.DrivingLicenseImage.CopyTo(memoryStream);
                    existingDriver.DrivingLicenseImage = memoryStream.ToArray();
                }
            }

            using (var memoryStream = new MemoryStream())
            {
                if (dto.VehicleFrontImage != null)
                {
                    dto.VehicleFrontImage.CopyTo(memoryStream);
                    existingDriver.VehicleFrontImage = memoryStream.ToArray();
                }
            }
            using (var memoryStream = new MemoryStream())
            {
                if (dto.VehicleBackImage != null)
                {
                    dto.VehicleBackImage.CopyTo(memoryStream);
                    existingDriver.VehicleBackImage = memoryStream.ToArray();
                }
            }
            using (var memoryStream = new MemoryStream())
            {
                if (dto.PersonalPhoto != null)
                {
                    dto.PersonalPhoto.CopyTo(memoryStream);
                    existingDriver.PersonalPhoto = memoryStream.ToArray();
                }
            }
            using (var memoryStream = new MemoryStream())
            {
                if (dto.FormImage != null)
                {
                    dto.FormImage.CopyTo(memoryStream);
                    existingDriver.FormImage = memoryStream.ToArray();
                }
            }
            _AppContext.SaveChanges();
            return Ok(existingDriver);
        }

    }
}
