using Microsoft.AspNetCore.Mvc;
using SalesAdvisor.API.Services;

namespace SalesAdvisor.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeadsController : ControllerBase
{
    private readonly ILeadsService _leadsService;

    public LeadsController(ILeadsService leadsService)
    {
        _leadsService = leadsService;
    }

    [HttpGet("{advisorId:int}")]
    public async Task<IActionResult> GetLeads(int advisorId, [FromQuery] string? temperature = null)
    {
        var result = await _leadsService.GetLeadsAsync(advisorId, temperature);
        return Ok(result);
    }
}
