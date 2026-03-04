using SalesAdvisor.API.DTOs;
using SalesAdvisor.API.Repositories;

namespace SalesAdvisor.API.Services;

public class PerformanceService : IPerformanceService
{
    private readonly IPerformanceRepository _perfRepo;

    public PerformanceService(IPerformanceRepository perfRepo)
    {
        _perfRepo = perfRepo;
    }

    public async Task<ApiResponse<IEnumerable<WeeklyDataDto>>> GetWeeklyAsync(int advisorId, int? year = null, int? month = null)
    {
        var now = DateTime.Now;
        var data = await _perfRepo.GetWeeklyAsync(advisorId, year ?? now.Year, month ?? now.Month);
        var dtos = data.Select(d => new WeeklyDataDto(
            (string)d.Week,
            (decimal)d.Target,
            (decimal)d.Achieved
        ));
        return new ApiResponse<IEnumerable<WeeklyDataDto>>(true, dtos);
    }

    public async Task<ApiResponse<IEnumerable<DailyDataDto>>> GetDailyAsync(int advisorId, int? year = null, int? month = null)
    {
        var now = DateTime.Now;
        var data = await _perfRepo.GetDailyAsync(advisorId, year ?? now.Year, month ?? now.Month);
        var dtos = data.Select(d => new DailyDataDto(
            (string)d.Day,
            (decimal)d.Value
        ));
        return new ApiResponse<IEnumerable<DailyDataDto>>(true, dtos);
    }
}
