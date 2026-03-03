using Dapper;
using SalesAdvisor.API.Infrastructure;
using SalesAdvisor.API.Models;
using System.Data;

namespace SalesAdvisor.API.Repositories;

public class AuthRepository : IAuthRepository
{
    private readonly IDbConnectionFactory _db;

    public AuthRepository(IDbConnectionFactory db)
    {
        _db = db;
    }

    public async Task<SalesAdvisorEntity?> AuthenticateAsync(string empId, string password)
    {
        using var conn = _db.CreateConnection();
        return await conn.QueryFirstOrDefaultAsync<SalesAdvisorEntity>(
            "sp_AuthenticateAdvisor",
            new { EmpId = empId, Password = password },
            commandType: CommandType.StoredProcedure
        );
    }
}
