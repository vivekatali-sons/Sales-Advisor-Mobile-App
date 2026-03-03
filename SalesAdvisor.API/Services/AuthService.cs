using SalesAdvisor.API.DTOs;
using SalesAdvisor.API.Repositories;

namespace SalesAdvisor.API.Services;

public class AuthService : IAuthService
{
    private readonly IAuthRepository _authRepo;

    public AuthService(IAuthRepository authRepo)
    {
        _authRepo = authRepo;
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        var advisor = await _authRepo.AuthenticateAsync(request.EmpId, request.Password);
        if (advisor == null)
            return new LoginResponse(false, null, "Invalid credentials");

        return new LoginResponse(true, new AdvisorDto(
            advisor.Id, advisor.EmpId, advisor.Name,
            advisor.Role, advisor.Branch, advisor.Avatar
        ));
    }
}
