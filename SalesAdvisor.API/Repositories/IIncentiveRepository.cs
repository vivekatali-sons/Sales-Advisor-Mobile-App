using SalesAdvisor.API.Models;

namespace SalesAdvisor.API.Repositories;

public interface IIncentiveRepository
{
    Task<IEnumerable<IncentiveSlab>> GetSlabsAsync();
    Task<IEnumerable<BonusEligibility>> GetEligibilityAsync(int advisorId, int year, int month);
    Task<IEnumerable<dynamic>> GetYtdDataAsync(int advisorId, int year);
}
