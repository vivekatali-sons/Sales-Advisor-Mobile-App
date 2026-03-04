using SalesAdvisor.API.DTOs;
using SalesAdvisor.API.Repositories;

namespace SalesAdvisor.API.Services;

public class DashboardService : IDashboardService
{
    private readonly IDashboardRepository _dashRepo;

    public DashboardService(IDashboardRepository dashRepo)
    {
        _dashRepo = dashRepo;
    }

    public async Task<ApiResponse<DashboardResponse>> GetDashboardAsync(int advisorId, int? year = null, int? month = null)
    {
        var now = DateTime.Now;
        var data = await _dashRepo.GetDashboardDataAsync(advisorId, year ?? now.Year, month ?? now.Month);
        if (data == null)
            return new ApiResponse<DashboardResponse>(false, null, "Advisor not found");

        var response = new DashboardResponse(
            Advisor: new AdvisorDto(
                (int)data.Id, (string)data.EmpId, (string)data.Name,
                (string)data.Role, (string)data.Branch, (string)data.Avatar
            ),
            MonthlyTarget: (decimal)data.TargetAmount,
            BaseIncentive: (decimal)data.BaseIncentive,
            Achieved: (decimal)data.Achieved,
            LeadsCount: (int)data.LeadsCount,
            PipelineValue: (decimal)data.PipelineValue,
            EstimatedIncentive: (decimal)data.EstimatedIncentive,
            Multiplier: (decimal)data.Multiplier,
            Bonuses: (decimal)data.Bonuses
        );

        return new ApiResponse<DashboardResponse>(true, response);
    }
}
