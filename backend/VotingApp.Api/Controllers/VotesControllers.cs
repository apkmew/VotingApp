using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VotingApp.Api.Data;
using VotingApp.Api.Models;

namespace VotingApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VotesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public VotesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/votes
        [HttpGet]
        public async Task<IActionResult> GetVotes()
        {
            var votes = await _context.Votes.Include(v => v.Options).ToListAsync();
            return Ok(votes);
        }

        // GET: api/votes/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVote(int id)
        {
            var vote = await _context.Votes.Include(v => v.Options).FirstOrDefaultAsync(v => v.Id == id);
            if (vote == null) return NotFound();
            return Ok(vote);
        }

        // POST: api/votes
        [HttpPost]
        public async Task<IActionResult> CreateVote(Vote vote)
        {
            _context.Votes.Add(vote);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetVote), new { id = vote.Id }, vote);
        }

        // PUT: api/votes/{id}/vote-option/{optionId}
        [HttpPut("{id}/vote-option/{optionId}")]
        public async Task<IActionResult> CastVote(int id, int optionId)
        {
            var option = await _context.VoteOptions
                .FirstOrDefaultAsync(o => o.VoteId == id && o.Id == optionId);
            if (option == null) return NotFound();

            option.Votes++;
            await _context.SaveChangesAsync();

            return Ok(option);
        }

        // DELETE: api/votes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVote(int id)
        {
            var vote = await _context.Votes.FindAsync(id);
            if (vote == null) return NotFound();

            _context.Votes.Remove(vote);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
