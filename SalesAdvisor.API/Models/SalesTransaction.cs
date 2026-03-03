namespace SalesAdvisor.API.Models;

public class SalesTransaction
{
    public int Id { get; set; }
    public int AdvisorId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string Vehicle { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime TransactionDate { get; set; }
    public string Type { get; set; } = string.Empty;
    public string? ProductCategory { get; set; }
    public int? CampaignId { get; set; }
    public DateTime CreatedAt { get; set; }
}
