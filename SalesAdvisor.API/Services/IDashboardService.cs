using SalesAdvisor.API.DTOs;

namespace SalesAdvisor.API.Services;

public interface IDashboardService
{
    Task<ApiResponse<DashboardResponse>> GetDashboardAsync(int advisorId, int? year = null, int? month = null);
}
