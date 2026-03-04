using Microsoft.AspNetCore.Mvc;
using SalesAdvisor.API.Services;

namespace SalesAdvisor.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PerformanceController : ControllerBase
{
    private readonly IPerformanceService _perfService;

    public PerformanceController(IPerformanceService perfService)
    {
        _perfService = perfService;
    }

    [HttpGet("weekly/{advisorId:int}")]
    public async Task<IActionResult> GetWeekly(int advisorId, [FromQuery] int? year = null, [FromQuery] int? month = null)
    {
        var result = await _perfService.GetWeeklyAsync(advisorId, year, month);
        return Ok(result);
    }

    [HttpGet("daily/{advisorId:int}")]
    public async Task<IActionResult> GetDaily(int advisorId, [FromQuery] int? year = null, [FromQuery] int? month = null)
    {
        var result = await _perfService.GetDailyAsync(advisorId, year, month);
        return Ok(result);
    }
}
