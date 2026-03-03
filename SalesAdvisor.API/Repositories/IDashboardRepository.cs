namespace SalesAdvisor.API.Repositories;

public interface IDashboardRepository
{
    Task<dynamic?> GetDashboardDataAsync(int advisorId, int year, int month);
}
