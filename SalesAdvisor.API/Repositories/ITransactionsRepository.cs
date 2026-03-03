using SalesAdvisor.API.Models;

namespace SalesAdvisor.API.Repositories;

public interface ITransactionsRepository
{
    Task<IEnumerable<SalesTransaction>> GetTransactionsAsync(int advisorId, int? year = null, int? month = null);
}
