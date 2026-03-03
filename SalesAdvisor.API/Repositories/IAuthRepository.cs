using SalesAdvisor.API.Models;

namespace SalesAdvisor.API.Repositories;

public interface IAuthRepository
{
    Task<SalesAdvisorEntity?> AuthenticateAsync(string empId, string password);
}
