using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadGoAPI.Dtos;
using RoadGoAPI.Models;

namespace RoadGoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ApplicationDbContext _AppContext;
        public CityController(ApplicationDbContext AppContext)
        {
            _AppContext = AppContext;
        }
        [HttpGet("GetAllCitis")]
        public async Task<IActionResult> GetAllCitisAsync()
        {
            var cities = await _AppContext.Cities.ToListAsync();
            if (cities.Count == 0)
            {
                return NotFound();
            }

            return Ok(cities);
        }

        [HttpGet("GetCity")]
        public async Task<IActionResult> GetCityAsync(int id)
        {
            var city = await _AppContext.Cities.FirstOrDefaultAsync(c => c.Id == id);
            return Ok(city);
        }

        [HttpPost]
        [Route("AddNewCity")]
        public async Task<IActionResult> AddNewCityAsync([FromBody] CityDto dto)
        {
            if (dto.Name.Length == 0)
            {
                return BadRequest();
            }
            var city = new City { Name = dto.Name };
            await _AppContext.Cities.AddAsync(city);
            _AppContext.SaveChanges();
            return Ok(city);
        }

        [HttpPut]
        [Route("UpdateCity")]
        public async Task<IActionResult> UpdateCityAsync(int id, CityDto dto)
        {
            var existingCity = await _AppContext.Cities.FirstOrDefaultAsync(d => d.Id == id);

            existingCity.Name = dto.Name;
            _AppContext.SaveChanges();

            return Ok(existingCity);
        }
    }
}
