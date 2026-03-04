namespace SalesAdvisor.API.DTOs;

public record WeeklyDataDto(string Week, decimal Target, decimal Achieved);
public record DailyDataDto(string Day, decimal Value);
public record ProductBreakdownDto(string Name, decimal Value, string Color);
public record CampaignBreakdownDto(string Name, decimal Value);
