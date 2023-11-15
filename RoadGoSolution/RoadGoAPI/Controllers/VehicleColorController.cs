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
    public class VehicleColorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VehicleColorController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/VehicleColor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleColor>>> GetVehiclesColors()
        {
            return Ok(await _context.VehiclesColors.ToListAsync());
        }

        // GET: api/VehicleColor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleColor>> GetVehicleColor(int id)
        {
            var vehicleColor = await _context.VehiclesColors.FindAsync(id);

            if (vehicleColor == null)
            {
                return NotFound();
            }

            return Ok(vehicleColor);
        }

        // PUT: api/VehicleColor/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicleColor(int id, VehicleColor vehicleColor)
        {
            if (id != vehicleColor.Id)
            {
                return BadRequest();
            }

            _context.Entry(vehicleColor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleColorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(vehicleColor);
        }

        // POST: api/VehicleColor
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VehicleColor>> AddVehicleColor([FromForm] NameDto vehicleColordto)
        {
            var vehicleColor = new VehicleColor() { Name= vehicleColordto.Name };
            _context.VehiclesColors.Add(vehicleColor);
            await _context.SaveChangesAsync();

            return Ok(vehicleColor);
        }

        // DELETE: api/VehicleColor/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicleColor(int id)
        {
            var vehicleColor = await _context.VehiclesColors.FindAsync(id);
            if (vehicleColor == null)
            {
                return NotFound();
            }

            _context.VehiclesColors.Remove(vehicleColor);
            await _context.SaveChangesAsync();

            return Ok(vehicleColor);
        }

        private bool VehicleColorExists(int id)
        {
            return _context.VehiclesColors.Any(e => e.Id == id);
        }
    }
}
