using Microsoft.AspNetCore.Mvc;
using SalesAdvisor.API.Services;

namespace SalesAdvisor.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IncentiveController : ControllerBase
{
    private readonly IIncentiveService _incService;

    public IncentiveController(IIncentiveService incService)
    {
        _incService = incService;
    }

    [HttpGet("slabs")]
    public async Task<IActionResult> GetSlabs()
    {
        var result = await _incService.GetSlabsAsync();
        return Ok(result);
    }

    [HttpGet("eligibility/{advisorId:int}")]
    public async Task<IActionResult> GetEligibility(int advisorId, [FromQuery] int? year = null, [FromQuery] int? month = null)
    {
        var result = await _incService.GetEligibilityAsync(advisorId, year, month);
        return Ok(result);
    }

    [HttpGet("ytd/{advisorId:int}")]
    public async Task<IActionResult> GetYtd(int advisorId, [FromQuery] int? year = null)
    {
        var result = await _incService.GetYtdAsync(advisorId, year);
        return Ok(result);
    }

    [HttpGet("byproduct/{advisorId:int}")]
    public async Task<IActionResult> GetByProduct(int advisorId, [FromQuery] int? year = null, [FromQuery] int? month = null)
    {
        var result = await _incService.GetByProductAsync(advisorId, year, month);
        return Ok(result);
    }

    [HttpGet("bycampaign/{advisorId:int}")]
    public async Task<IActionResult> GetByCampaign(int advisorId, [FromQuery] int? year = null, [FromQuery] int? month = null)
    {
        var result = await _incService.GetByCampaignAsync(advisorId, year, month);
        return Ok(result);
    }
}
