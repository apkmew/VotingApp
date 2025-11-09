using Microsoft.EntityFrameworkCore;
using VotingApp.Api.Models;

namespace VotingApp.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Vote> Votes => Set<Vote>();
        public DbSet<VoteOption> VoteOptions => Set<VoteOption>();
    }
}
