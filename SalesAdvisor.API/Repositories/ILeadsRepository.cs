using SalesAdvisor.API.Models;

namespace SalesAdvisor.API.Repositories;

public interface ILeadsRepository
{
    Task<IEnumerable<Lead>> GetLeadsAsync(int advisorId, string? temperature = null);
}
