using SalesAdvisor.API.Infrastructure;
using SalesAdvisor.API.Repositories;
using SalesAdvisor.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

// Infrastructure
builder.Services.AddSingleton<IDbConnectionFactory>(new DbConnectionFactory(connectionString));

// Repositories
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();
builder.Services.AddScoped<ILeadsRepository, LeadsRepository>();
builder.Services.AddScoped<ITransactionsRepository, TransactionsRepository>();
builder.Services.AddScoped<IIncentiveRepository, IncentiveRepository>();
builder.Services.AddScoped<IPerformanceRepository, PerformanceRepository>();

// Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<ILeadsService, LeadsService>();
builder.Services.AddScoped<ITransactionsService, TransactionsService>();
builder.Services.AddScoped<IIncentiveService, IncentiveService>();
builder.Services.AddScoped<IPerformanceService, PerformanceService>();

// Controllers + CORS
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAll");
app.MapControllers();

// Health check
app.MapGet("/api/health", () => Results.Ok(new { Status = "ok", Timestamp = DateTime.UtcNow }));

app.Run();
