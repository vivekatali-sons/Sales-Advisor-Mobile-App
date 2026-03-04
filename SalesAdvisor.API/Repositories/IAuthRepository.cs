using SalesAdvisor.API.Models;

namespace SalesAdvisor.API.Repositories;

public interface IAuthRepository
{
    Task<SalesAdvisorEntity?> GetByLoginIdAsync(string loginId);
}
