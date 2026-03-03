using Microsoft.AspNetCore.Mvc;
using SalesAdvisor.API.Services;

namespace SalesAdvisor.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashService;

    public DashboardController(IDashboardService dashService)
    {
        _dashService = dashService;
    }

    [HttpGet("{advisorId:int}")]
    public async Task<IActionResult> GetDashboard(int advisorId)
    {
        var result = await _dashService.GetDashboardAsync(advisorId);
        if (!result.Success)
            return NotFound(result);

        return Ok(result);
    }
}
