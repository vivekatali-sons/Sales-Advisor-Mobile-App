namespace SalesAdvisor.API.Models;

public class MonthlyTarget
{
    public int Id { get; set; }
    public int AdvisorId { get; set; }
    public int Year { get; set; }
    public int Month { get; set; }
    public decimal TargetAmount { get; set; }
    public decimal BaseIncentive { get; set; }
}
