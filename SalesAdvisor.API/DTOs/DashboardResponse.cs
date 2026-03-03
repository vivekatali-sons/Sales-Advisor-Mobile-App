namespace SalesAdvisor.API.DTOs;

public record DashboardResponse(
    AdvisorDto Advisor,
    decimal MonthlyTarget,
    decimal BaseIncentive,
    decimal Achieved,
    int LeadsCount,
    decimal PipelineValue,
    decimal EstimatedIncentive,
    decimal Multiplier,
    decimal Bonuses
);
