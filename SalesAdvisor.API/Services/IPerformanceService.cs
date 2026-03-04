using SalesAdvisor.API.DTOs;

namespace SalesAdvisor.API.Services;

public interface IPerformanceService
{
    Task<ApiResponse<IEnumerable<WeeklyDataDto>>> GetWeeklyAsync(int advisorId, int? year = null, int? month = null);
    Task<ApiResponse<IEnumerable<DailyDataDto>>> GetDailyAsync(int advisorId, int? year = null, int? month = null);
}
