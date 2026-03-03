using SalesAdvisor.API.DTOs;
using SalesAdvisor.API.Repositories;

namespace SalesAdvisor.API.Services;

public class TransactionsService : ITransactionsService
{
    private readonly ITransactionsRepository _txnRepo;

    public TransactionsService(ITransactionsRepository txnRepo)
    {
        _txnRepo = txnRepo;
    }

    public async Task<ApiResponse<IEnumerable<TransactionDto>>> GetTransactionsAsync(int advisorId, int? year = null, int? month = null)
    {
        var txns = await _txnRepo.GetTransactionsAsync(advisorId, year, month);
        var dtos = txns.Select(t => new TransactionDto(
            t.Id, t.CustomerName, t.Vehicle,
            t.Amount, t.TransactionDate, t.Type
        ));
        return new ApiResponse<IEnumerable<TransactionDto>>(true, dtos);
    }
}
