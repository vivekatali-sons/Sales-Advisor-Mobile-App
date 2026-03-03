namespace SalesAdvisor.API.Models;

public class Lead
{
    public int Id { get; set; }
    public int AdvisorId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string Vehicle { get; set; } = string.Empty;
    public decimal DealValue { get; set; }
    public decimal Commission { get; set; }
    public string Stage { get; set; } = string.Empty;
    public int Probability { get; set; }
    public string Temperature { get; set; } = string.Empty;
    public string? LastContact { get; set; }
    public bool IsOpen { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
