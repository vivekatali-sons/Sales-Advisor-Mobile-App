using SalesAdvisor.API.DTOs;

namespace SalesAdvisor.API.Services;

public interface ILeadsService
{
    Task<ApiResponse<IEnumerable<LeadDto>>> GetLeadsAsync(int advisorId, string? temperature = null);
}
