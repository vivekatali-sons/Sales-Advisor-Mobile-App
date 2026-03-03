using Dapper;
using SalesAdvisor.API.Infrastructure;
using SalesAdvisor.API.Models;
using System.Data;

namespace SalesAdvisor.API.Repositories;

public class TransactionsRepository : ITransactionsRepository
{
    private readonly IDbConnectionFactory _db;

    public TransactionsRepository(IDbConnectionFactory db)
    {
        _db = db;
    }

    public async Task<IEnumerable<SalesTransaction>> GetTransactionsAsync(int advisorId, int? year = null, int? month = null)
    {
        using var conn = _db.CreateConnection();
        return await conn.QueryAsync<SalesTransaction>(
            "sp_GetTransactions",
            new { AdvisorId = advisorId, Year = year, Month = month },
            commandType: CommandType.StoredProcedure
        );
    }
}
