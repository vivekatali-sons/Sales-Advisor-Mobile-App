namespace SalesAdvisor.API.DTOs;

public record TransactionDto(
    int Id,
    string Customer,
    string Vehicle,
    decimal Amount,
    DateTime Date,
    string Type
);
