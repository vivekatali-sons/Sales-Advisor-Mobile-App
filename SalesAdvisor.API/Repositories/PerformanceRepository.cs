using Dapper;
using SalesAdvisor.API.Infrastructure;
using System.Data;

namespace SalesAdvisor.API.Repositories;

public class PerformanceRepository : IPerformanceRepository
{
    private readonly IDbConnectionFactory _db;

    public PerformanceRepository(IDbConnectionFactory db)
    {
        _db = db;
    }

    public async Task<IEnumerable<dynamic>> GetWeeklyAsync(int advisorId, int year, int month)
    {
        using var conn = _db.CreateConnection();
        return await conn.QueryAsync(
            "sp_GetWeeklyPerformance",
            new { AdvisorId = advisorId, Year = year, Month = month },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<IEnumerable<dynamic>> GetDailyAsync(int advisorId, int year, int month)
    {
        using var conn = _db.CreateConnection();
        return await conn.QueryAsync(
            "sp_GetDailyPerformance",
            new { AdvisorId = advisorId, Year = year, Month = month },
            commandType: CommandType.StoredProcedure
        );
    }
}
