namespace SalesAdvisor.API.DTOs;

public record LoginResponse(
    bool Success,
    AdvisorDto? Advisor,
    string? Error = null
);

public record AdvisorDto(
    int Id,
    string EmpId,
    string Name,
    string Role,
    string Branch,
    string Avatar
);
