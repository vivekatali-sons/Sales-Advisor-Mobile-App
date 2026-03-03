namespace SalesAdvisor.API.Models;

public class SalesAdvisorEntity
{
    public int Id { get; set; }
    public string EmpId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Branch { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}
