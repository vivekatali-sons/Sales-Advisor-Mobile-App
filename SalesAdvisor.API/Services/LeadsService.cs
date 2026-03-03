using SalesAdvisor.API.DTOs;
using SalesAdvisor.API.Repositories;

namespace SalesAdvisor.API.Services;

public class LeadsService : ILeadsService
{
    private readonly ILeadsRepository _leadsRepo;

    public LeadsService(ILeadsRepository leadsRepo)
    {
        _leadsRepo = leadsRepo;
    }

    public async Task<ApiResponse<IEnumerable<LeadDto>>> GetLeadsAsync(int advisorId, string? temperature = null)
    {
        var leads = await _leadsRepo.GetLeadsAsync(advisorId, temperature);
        var dtos = leads.Select(l => new LeadDto(
            l.Id, l.CustomerName, l.Vehicle, l.DealValue,
            l.Commission, l.Stage, l.Probability,
            l.Temperature, l.LastContact
        ));
        return new ApiResponse<IEnumerable<LeadDto>>(true, dtos);
    }
}
