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
        // TODO: Integrate M365 auth via Usman — for now, DB lookup only
        var advisor = await _authRepo.GetByLoginIdAsync(request.LoginId);
        if (advisor == null)
            return new LoginResponse(false, null, "User not found");

        return new LoginResponse(true, new AdvisorDto(
            advisor.Id, advisor.EmpId, advisor.Name,
            advisor.Role, advisor.Branch, advisor.Avatar
        ));
    }
}
