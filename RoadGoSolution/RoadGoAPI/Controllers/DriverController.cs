using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        private readonly ApplicationDbContext _context;

        public DriverController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Driver
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Driver>>> GetDrivers()
        {
            return await _context.Drivers.ToListAsync();
        }

        // GET: api/Driver/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Driver>> GetDriver(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);

            if (driver == null)
            {
                return NotFound();
            }

            return driver;
        }

        // PUT: api/Driver/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDriver(int id, [FromForm] UpdataDriverDto dto)
        {
            var driver = await _context.Drivers.FindAsync(id);


            if (dto.FirstName != null)
            {
                driver.FirstName = dto.FirstName;
            }

            if (dto.LastName != null)
            {
                driver.LastName = dto.LastName;
            }

            if (dto.Phone != null)
            {
                driver.Phone = dto.Phone;
            }

            if (dto.Password != null)
            {
                driver.Password = dto.Password;
            }

            if (dto.NationalId != null)
            {
                driver.NationalId = dto.NationalId;
            }

            if (dto.Gender != null)
            {
                driver.Gender = dto.Gender;
            }

            if (dto.CityId != null)
            {
                driver.CityId = dto.CityId;
            }

            if (dto.VehicleModelId != null)
            {
                driver.VehicleModelId = dto.VehicleModelId;
            }

            if (dto.VehicleColorId != null)
            {
                driver.VehicleColorId = dto.VehicleColorId;
            }

            if (dto.VehiclePlateRight != null)
            {
                driver.VehiclePlateRight = dto.VehiclePlateRight;
            }

            if (dto.VehiclePlateMiddle != null)
            {
                driver.VehiclePlateMiddle = dto.VehiclePlateMiddle;
            }

            if (dto.VehiclePlateLeft != null)
            {
                driver.VehiclePlateLeft = dto.VehiclePlateLeft;
            }

            if (dto.VehiclePlateNumber != null)
            {
                driver.VehiclePlateNumber = dto.VehiclePlateNumber;
            }



            if (dto.PersonalPhoto != null && dto.PersonalPhoto.Length > 0)
                using (var memoryStream = new MemoryStream())
                {
                    {
                        await dto.PersonalPhoto.CopyToAsync(memoryStream);
                        driver.PersonalPhoto = memoryStream.ToArray();
                    }
                }

            if (dto.DrivingLicenseImage != null && dto.DrivingLicenseImage.Length > 0)
                using (var memoryStream = new MemoryStream())
                {
                    {
                        await dto.DrivingLicenseImage.CopyToAsync(memoryStream);
                        driver.DrivingLicenseImage = memoryStream.ToArray();
                    }
                }

            if (dto.FormImage != null && dto.FormImage.Length > 0)
                using (var memoryStream = new MemoryStream())
                {
                    {
                        await dto.FormImage.CopyToAsync(memoryStream);
                        driver.FormImage = memoryStream.ToArray();
                    }
                }

            if (dto.VehicleFrontImage != null && dto.VehicleFrontImage.Length > 0)
                using (var memoryStream = new MemoryStream())
                {
                    {
                        await dto.VehicleFrontImage.CopyToAsync(memoryStream);
                        driver.VehicleFrontImage = memoryStream.ToArray();
                    }
                }

            if (dto.VehicleBackImage != null && dto.VehicleBackImage.Length > 0)
                using (var memoryStream = new MemoryStream())
                {
                    {
                        await dto.VehicleBackImage.CopyToAsync(memoryStream);
                        driver.VehicleBackImage = memoryStream.ToArray();
                    }
                }

            _context.Entry(driver).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DriverExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(driver);
        }

        // POST: api/Driver
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Driver>> PostDriver([FromForm] DriverDto driver)
        {
            var newdriver = new Driver()
            {
                FirstName = driver.FirstName,
                LastName = driver.LastName,
                Phone = driver.Phone,
                Password = driver.Password,
                NationalId = driver.NationalId,
                Gender = driver.Gender,
                CityId = driver.CityId,
                VehicleModelId = driver.VehicleModelId,
                VehicleColorId = driver.VehicleColorId,
                VehiclePlateRight = driver.VehiclePlateRight,
                VehiclePlateMiddle = driver.VehiclePlateMiddle,
                VehiclePlateLeft = driver.VehiclePlateLeft,
                VehiclePlateNumber = driver.VehiclePlateNumber,
            };

            using (var memoryStream = new MemoryStream())
            {
                await driver.PersonalPhoto.CopyToAsync(memoryStream);
                newdriver.PersonalPhoto = memoryStream.ToArray();
            }

            using (var memoryStream = new MemoryStream())
            {
                await driver.DrivingLicenseImage.CopyToAsync(memoryStream);
                newdriver.DrivingLicenseImage = memoryStream.ToArray();
            }

            using (var memoryStream = new MemoryStream())
            {
                await driver.FormImage.CopyToAsync(memoryStream);
                newdriver.FormImage = memoryStream.ToArray();
            }
            using (var memoryStream = new MemoryStream())
            {
                await driver.VehicleFrontImage.CopyToAsync(memoryStream);
                newdriver.VehicleFrontImage = memoryStream.ToArray();
            }
            using (var memoryStream = new MemoryStream())
            {
                await driver.VehicleBackImage.CopyToAsync(memoryStream);
                newdriver.VehicleBackImage = memoryStream.ToArray();
            }

            _context.Drivers.Add(newdriver);
            await _context.SaveChangesAsync();

            return Ok(newdriver);

        }

        // DELETE: api/Driver/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }

            _context.Drivers.Remove(driver);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DriverExists(int id)
        {
            return _context.Drivers.Any(e => e.Id == id);
        }
    }
}
