using SalesAdvisor.API.DTOs;

namespace SalesAdvisor.API.Services;

public interface ITransactionsService
{
    Task<ApiResponse<IEnumerable<TransactionDto>>> GetTransactionsAsync(int advisorId, int? year = null, int? month = null);
}
