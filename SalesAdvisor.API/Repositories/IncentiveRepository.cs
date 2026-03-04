using Dapper;
using SalesAdvisor.API.Infrastructure;
using SalesAdvisor.API.Models;
using System.Data;

namespace SalesAdvisor.API.Repositories;

public class IncentiveRepository : IIncentiveRepository
{
    private readonly IDbConnectionFactory _db;

    public IncentiveRepository(IDbConnectionFactory db)
    {
        _db = db;
    }

    public async Task<IEnumerable<IncentiveSlab>> GetSlabsAsync()
    {
        using var conn = _db.CreateConnection();
        return await conn.QueryAsync<IncentiveSlab>(
            "sp_GetIncentiveSlabs",
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<IEnumerable<BonusEligibility>> GetEligibilityAsync(int advisorId, int year, int month)
    {
        using var conn = _db.CreateConnection();
        return await conn.QueryAsync<BonusEligibility>(
            "sp_GetBonusEligibility",
            new { AdvisorId = advisorId, Year = year, Month = month },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<IEnumerable<dynamic>> GetYtdDataAsync(int advisorId, int year)
    {
        using var conn = _db.CreateConnection();
        return await conn.QueryAsync(
            "sp_GetYtdData",
            new { AdvisorId = advisorId, Year = year },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<IEnumerable<dynamic>> GetSalesByProductAsync(int advisorId, int year, int month)
    {
        using var conn = _db.CreateConnection();
        return await conn.QueryAsync(
            "sp_GetSalesByProduct",
            new { AdvisorId = advisorId, Year = year, Month = month },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<IEnumerable<dynamic>> GetSalesByCampaignAsync(int advisorId, int year, int month)
    {
        using var conn = _db.CreateConnection();
        return await conn.QueryAsync(
            "sp_GetSalesByCampaign",
            new { AdvisorId = advisorId, Year = year, Month = month },
            commandType: CommandType.StoredProcedure
        );
    }
}
