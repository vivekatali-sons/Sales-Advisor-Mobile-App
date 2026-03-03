using Microsoft.AspNetCore.Mvc;
using SalesAdvisor.API.Services;

namespace SalesAdvisor.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionsService _txnService;

    public TransactionsController(ITransactionsService txnService)
    {
        _txnService = txnService;
    }

    [HttpGet("{advisorId:int}")]
    public async Task<IActionResult> GetTransactions(int advisorId, [FromQuery] int? year = null, [FromQuery] int? month = null)
    {
        var result = await _txnService.GetTransactionsAsync(advisorId, year, month);
        return Ok(result);
    }
}
