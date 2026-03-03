namespace SalesAdvisor.API.Models;

public class IncentiveSlab
{
    public int Id { get; set; }
    public int MinPercent { get; set; }
    public int MaxPercent { get; set; }
    public decimal Multiplier { get; set; }
    public string Label { get; set; } = string.Empty;
}
