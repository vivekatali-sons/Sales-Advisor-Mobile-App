namespace SalesAdvisor.API.DTOs;

public record ApiResponse<T>(bool Success, T? Data, string? Error = null);
