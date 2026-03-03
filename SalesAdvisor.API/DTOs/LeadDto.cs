namespace SalesAdvisor.API.DTOs;

public record LeadDto(
    int Id,
    string Name,
    string Vehicle,
    decimal Value,
    decimal Commission,
    string Stage,
    int Probability,
    string Temperature,
    string? LastContact
);
