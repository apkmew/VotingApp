using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace VotingApp.Api.Models
{
    public class VoteOption
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Text { get; set; } = string.Empty;

        public int Votes { get; set; } = 0;

        [ForeignKey("Vote")]
        public int VoteId { get; set; }

        [JsonIgnore]   // ⬅⬅⬅ ป้องกัน loop!!!
        public Vote? Vote { get; set; }
    }
}
