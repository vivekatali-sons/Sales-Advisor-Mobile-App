namespace SalesAdvisor.API.Models;

public class BonusEligibility
{
    public int Id { get; set; }
    public int AdvisorId { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public int Year { get; set; }
    public int Month { get; set; }
}
