using SalesAdvisor.API.DTOs;

namespace SalesAdvisor.API.Services;

public interface IAuthService
{
    Task<LoginResponse> LoginAsync(LoginRequest request);
}
