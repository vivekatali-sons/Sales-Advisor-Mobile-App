using Dapper;
using SalesAdvisor.API.Infrastructure;
using SalesAdvisor.API.Models;
using System.Data;

namespace SalesAdvisor.API.Repositories;

public class LeadsRepository : ILeadsRepository
{
    private readonly IDbConnectionFactory _db;

    public LeadsRepository(IDbConnectionFactory db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Lead>> GetLeadsAsync(int advisorId, string? temperature = null)
    {
        using var conn = _db.CreateConnection();
        return await conn.QueryAsync<Lead>(
            "sp_GetLeads",
            new { AdvisorId = advisorId, Temperature = temperature },
            commandType: CommandType.StoredProcedure
        );
    }
}
