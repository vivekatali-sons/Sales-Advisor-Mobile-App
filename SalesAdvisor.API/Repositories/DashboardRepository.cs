using Dapper;
using SalesAdvisor.API.Infrastructure;
using System.Data;

namespace SalesAdvisor.API.Repositories;

public class DashboardRepository : IDashboardRepository
{
    private readonly IDbConnectionFactory _db;

    public DashboardRepository(IDbConnectionFactory db)
    {
        _db = db;
    }

    public async Task<dynamic?> GetDashboardDataAsync(int advisorId, int year, int month)
    {
        using var conn = _db.CreateConnection();
        return await conn.QueryFirstOrDefaultAsync(
            "sp_GetDashboardData",
            new { AdvisorId = advisorId, Year = year, Month = month },
            commandType: CommandType.StoredProcedure
        );
    }
}
