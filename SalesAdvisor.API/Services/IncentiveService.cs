using SalesAdvisor.API.DTOs;
using SalesAdvisor.API.Repositories;

namespace SalesAdvisor.API.Services;

public class IncentiveService : IIncentiveService
{
    private readonly IIncentiveRepository _incRepo;

    public IncentiveService(IIncentiveRepository incRepo)
    {
        _incRepo = incRepo;
    }

    public async Task<ApiResponse<IEnumerable<IncentiveSlabDto>>> GetSlabsAsync()
    {
        var slabs = await _incRepo.GetSlabsAsync();
        var dtos = slabs.Select(s => new IncentiveSlabDto(
            s.MinPercent, s.MaxPercent, s.Multiplier, s.Label
        ));
        return new ApiResponse<IEnumerable<IncentiveSlabDto>>(true, dtos);
    }

    public async Task<ApiResponse<IEnumerable<BonusEligibilityDto>>> GetEligibilityAsync(int advisorId, int? year = null, int? month = null)
    {
        var y = year ?? DateTime.Now.Year;
        var m = month ?? DateTime.Now.Month;
        var eligibility = await _incRepo.GetEligibilityAsync(advisorId, y, m);
        var dtos = eligibility.Select(b => new BonusEligibilityDto(b.Category, b.Status));
        return new ApiResponse<IEnumerable<BonusEligibilityDto>>(true, dtos);
    }

    public async Task<ApiResponse<IEnumerable<YtdMonthDto>>> GetYtdAsync(int advisorId, int? year = null)
    {
        var y = year ?? DateTime.Now.Year;
        var months = new[] { "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };

        var data = await _incRepo.GetYtdDataAsync(advisorId, y);
        var dtos = data.Select(d => new YtdMonthDto(
            months[(int)d.Month],
            (decimal)d.Target,
            (decimal)d.Achieved,
            (decimal)d.BaseIncentive,
            (decimal)d.Incentive
        ));
        return new ApiResponse<IEnumerable<YtdMonthDto>>(true, dtos);
    }

    public async Task<ApiResponse<IEnumerable<ProductBreakdownDto>>> GetByProductAsync(int advisorId, int? year = null, int? month = null)
    {
        var now = DateTime.Now;
        var data = await _incRepo.GetSalesByProductAsync(advisorId, year ?? now.Year, month ?? now.Month);
        var dtos = data.Select(d => new ProductBreakdownDto(
            (string)d.Name,
            (decimal)d.Value,
            (string)d.Color
        ));
        return new ApiResponse<IEnumerable<ProductBreakdownDto>>(true, dtos);
    }

    public async Task<ApiResponse<IEnumerable<CampaignBreakdownDto>>> GetByCampaignAsync(int advisorId, int? year = null, int? month = null)
    {
        var now = DateTime.Now;
        var data = await _incRepo.GetSalesByCampaignAsync(advisorId, year ?? now.Year, month ?? now.Month);
        var dtos = data.Select(d => new CampaignBreakdownDto(
            (string)d.Name,
            (decimal)d.Value
        ));
        return new ApiResponse<IEnumerable<CampaignBreakdownDto>>(true, dtos);
    }
}
