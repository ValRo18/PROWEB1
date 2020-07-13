using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROWEB11.Models;


namespace PROWEB11.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JuegoController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public JuegoController(DataBaseContext context)
        {
            _context = context;
        }
        // POST: api/Deck
        /*[HttpPost]
        public async Task<ActionResult<Baraja>> PostBaraja(Baraja baraja)
        {
            _context.Baraja.Add(baraja);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBaraja", new  baraja);
        }*/

        

        
    }
}