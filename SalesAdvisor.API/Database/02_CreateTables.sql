USE [SalesAdvisorDB]
GO

-- Sales Advisors
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SalesAdvisors')
CREATE TABLE SalesAdvisors (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    EmpId NVARCHAR(20) UNIQUE NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    Role NVARCHAR(50) NOT NULL,
    Branch NVARCHAR(100) NOT NULL,
    Avatar NVARCHAR(10) NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Monthly Targets
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'MonthlyTargets')
CREATE TABLE MonthlyTargets (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    AdvisorId INT FOREIGN KEY REFERENCES SalesAdvisors(Id),
    [Year] INT NOT NULL,
    [Month] INT NOT NULL,
    TargetAmount DECIMAL(18,2) NOT NULL,
    BaseIncentive DECIMAL(18,2) NOT NULL,
    UNIQUE(AdvisorId, [Year], [Month])
);
GO

-- Sales Transactions
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SalesTransactions')
CREATE TABLE SalesTransactions (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    AdvisorId INT FOREIGN KEY REFERENCES SalesAdvisors(Id),
    CustomerName NVARCHAR(100) NOT NULL,
    Vehicle NVARCHAR(100) NOT NULL,
    Amount DECIMAL(18,2) NOT NULL,
    TransactionDate DATE NOT NULL,
    [Type] NVARCHAR(20) NOT NULL CHECK ([Type] IN ('New', 'Pre-Owned')),
    ProductCategory NVARCHAR(50) NULL,
    CampaignId INT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Leads
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Leads')
CREATE TABLE Leads (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    AdvisorId INT FOREIGN KEY REFERENCES SalesAdvisors(Id),
    CustomerName NVARCHAR(100) NOT NULL,
    Vehicle NVARCHAR(100) NOT NULL,
    DealValue DECIMAL(18,2) NOT NULL,
    Commission DECIMAL(18,2) NOT NULL,
    Stage NVARCHAR(30) NOT NULL,
    Probability INT NOT NULL,
    Temperature NVARCHAR(10) NOT NULL CHECK (Temperature IN ('hot', 'warm', 'cold')),
    LastContact NVARCHAR(50) NULL,
    IsOpen BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Incentive Slabs
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'IncentiveSlabs')
CREATE TABLE IncentiveSlabs (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    MinPercent INT NOT NULL,
    MaxPercent INT NOT NULL,
    Multiplier DECIMAL(4,2) NOT NULL,
    Label NVARCHAR(20) NOT NULL
);
GO

-- Campaigns
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Campaigns')
CREATE TABLE Campaigns (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    IsActive BIT DEFAULT 1
);
GO

-- Bonus Eligibility
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'BonusEligibility')
CREATE TABLE BonusEligibility (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    AdvisorId INT FOREIGN KEY REFERENCES SalesAdvisors(Id),
    Category NVARCHAR(100) NOT NULL,
    [Status] NVARCHAR(20) NOT NULL CHECK ([Status] IN ('Eligible', 'Almost Eligible', 'Not Eligible')),
    [Year] INT NOT NULL,
    [Month] INT NOT NULL
);
GO

-- Product Categories
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ProductCategories')
CREATE TABLE ProductCategories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    Color NVARCHAR(10) NULL
);
GO
