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
    public class VehicleModelController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VehicleModelController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/VehicleModel
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleModel>>> GetVehiclesModels()
        {
            return Ok(await _context.VehiclesModels.ToListAsync());
        }

        // GET: api/VehicleModel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleModel>> GetVehicleModel(int id)
        {
            var vehicleModel = await _context.VehiclesModels.FindAsync(id);

            if (vehicleModel == null)
            {
                return NotFound();
            }

            return Ok(vehicleModel);
        }

        // PUT: api/VehicleModel/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicleModel(int id, VehicleModel vehicleModel)
        {
            if (id != vehicleModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(vehicleModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(vehicleModel);
        }

        // POST: api/VehicleModel
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VehicleModel>> AddVehicleModel(NameDto vehicleModeldto)
        {
            var vehicleModel = new VehicleModel() { Name= vehicleModeldto.Name };
            _context.VehiclesModels.Add(vehicleModel);
            await _context.SaveChangesAsync();

            return Ok(vehicleModel);
        }

        // DELETE: api/VehicleModel/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicleModel(int id)
        {
            var vehicleModel = await _context.VehiclesModels.FindAsync(id);
            if (vehicleModel == null)
            {
                return NotFound();
            }

            _context.VehiclesModels.Remove(vehicleModel);
            await _context.SaveChangesAsync();

            return Ok(vehicleModel);
        }

        private bool VehicleModelExists(int id)
        {
            return _context.VehiclesModels.Any(e => e.Id == id);
        }
    }
}
