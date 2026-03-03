using SalesAdvisor.API.DTOs;

namespace SalesAdvisor.API.Services;

public interface IIncentiveService
{
    Task<ApiResponse<IEnumerable<IncentiveSlabDto>>> GetSlabsAsync();
    Task<ApiResponse<IEnumerable<BonusEligibilityDto>>> GetEligibilityAsync(int advisorId, int? year = null, int? month = null);
    Task<ApiResponse<IEnumerable<YtdMonthDto>>> GetYtdAsync(int advisorId, int? year = null);
}
