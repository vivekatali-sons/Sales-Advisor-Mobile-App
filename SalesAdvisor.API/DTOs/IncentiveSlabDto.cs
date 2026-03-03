namespace SalesAdvisor.API.DTOs;

public record IncentiveSlabDto(
    int MinPercent,
    int MaxPercent,
    decimal Multiplier,
    string Label
);
