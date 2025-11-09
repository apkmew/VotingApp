namespace VotingApp.Api.DTOs
{
    public class VoteDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public List<VoteOptionDto> Options { get; set; } = new();
    }

    public class VoteOptionDto
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Votes { get; set; }
    }
}
