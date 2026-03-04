namespace SalesAdvisor.API.Repositories;

public interface IPerformanceRepository
{
    Task<IEnumerable<dynamic>> GetWeeklyAsync(int advisorId, int year, int month);
    Task<IEnumerable<dynamic>> GetDailyAsync(int advisorId, int year, int month);
}
