namespace SalesAdvisor.API.DTOs;

public record YtdMonthDto(
    string Month,
    decimal Target,
    decimal Achieved,
    decimal BaseIncentive,
    decimal Incentive
);
