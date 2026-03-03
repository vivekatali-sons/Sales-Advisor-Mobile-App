USE [SalesAdvisorDB]
GO

-- =============================================
-- sp_AuthenticateAdvisor
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_AuthenticateAdvisor')
    DROP PROCEDURE sp_AuthenticateAdvisor
GO

CREATE PROCEDURE sp_AuthenticateAdvisor
    @EmpId NVARCHAR(20),
    @Password NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Id, EmpId, Name, Role, Branch, Avatar, PasswordHash, IsActive, CreatedAt
    FROM SalesAdvisors
    WHERE EmpId = @EmpId
      AND PasswordHash = @Password
      AND IsActive = 1;
END
GO

-- =============================================
-- sp_GetDashboardData
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetDashboardData')
    DROP PROCEDURE sp_GetDashboardData
GO

CREATE PROCEDURE sp_GetDashboardData
    @AdvisorId INT,
    @Year INT,
    @Month INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TargetAmount DECIMAL(18,2) = 0;
    DECLARE @BaseIncentive DECIMAL(18,2) = 0;
    DECLARE @Achieved DECIMAL(18,2) = 0;
    DECLARE @LeadsCount INT = 0;
    DECLARE @PipelineValue DECIMAL(18,2) = 0;
    DECLARE @AchPercent DECIMAL(5,2) = 0;
    DECLARE @Multiplier DECIMAL(4,2) = 0;
    DECLARE @Bonuses DECIMAL(18,2) = 3450; -- TODO: Calculate from actual bonus logic
    DECLARE @EstimatedIncentive DECIMAL(18,2) = 0;

    -- Get target
    SELECT @TargetAmount = ISNULL(TargetAmount, 0),
           @BaseIncentive = ISNULL(BaseIncentive, 0)
    FROM MonthlyTargets
    WHERE AdvisorId = @AdvisorId AND [Year] = @Year AND [Month] = @Month;

    -- Get achieved
    SELECT @Achieved = ISNULL(SUM(Amount), 0)
    FROM SalesTransactions
    WHERE AdvisorId = @AdvisorId
      AND YEAR(TransactionDate) = @Year
      AND MONTH(TransactionDate) = @Month;

    -- Get leads
    SELECT @LeadsCount = COUNT(*),
           @PipelineValue = ISNULL(SUM(DealValue), 0)
    FROM Leads
    WHERE AdvisorId = @AdvisorId AND IsOpen = 1;

    -- Calculate multiplier from slabs
    IF @TargetAmount > 0
        SET @AchPercent = (@Achieved / @TargetAmount) * 100;

    SELECT TOP 1 @Multiplier = Multiplier
    FROM IncentiveSlabs
    WHERE @AchPercent >= MinPercent AND @AchPercent < MaxPercent
    ORDER BY MinPercent;

    IF @Multiplier = 0 SET @Multiplier = 0.5;

    -- Calculate incentive
    SET @EstimatedIncentive = (@BaseIncentive * @Multiplier) + @Bonuses;

    -- Return combined result
    SELECT
        sa.Id, sa.EmpId, sa.Name, sa.Role, sa.Branch, sa.Avatar,
        @TargetAmount AS TargetAmount,
        @BaseIncentive AS BaseIncentive,
        @Achieved AS Achieved,
        @LeadsCount AS LeadsCount,
        @PipelineValue AS PipelineValue,
        @Multiplier AS Multiplier,
        @Bonuses AS Bonuses,
        @EstimatedIncentive AS EstimatedIncentive
    FROM SalesAdvisors sa
    WHERE sa.Id = @AdvisorId;
END
GO

-- =============================================
-- sp_GetLeads
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetLeads')
    DROP PROCEDURE sp_GetLeads
GO

CREATE PROCEDURE sp_GetLeads
    @AdvisorId INT,
    @Temperature NVARCHAR(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Id, AdvisorId, CustomerName, Vehicle, DealValue, Commission,
           Stage, Probability, Temperature, LastContact, IsOpen, CreatedAt, UpdatedAt
    FROM Leads
    WHERE AdvisorId = @AdvisorId
      AND IsOpen = 1
      AND (@Temperature IS NULL OR Temperature = @Temperature)
    ORDER BY DealValue DESC;
END
GO

-- =============================================
-- sp_GetTransactions
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetTransactions')
    DROP PROCEDURE sp_GetTransactions
GO

CREATE PROCEDURE sp_GetTransactions
    @AdvisorId INT,
    @Year INT = NULL,
    @Month INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Id, AdvisorId, CustomerName, Vehicle, Amount, TransactionDate,
           [Type], ProductCategory, CampaignId, CreatedAt
    FROM SalesTransactions
    WHERE AdvisorId = @AdvisorId
      AND (@Year IS NULL OR YEAR(TransactionDate) = @Year)
      AND (@Month IS NULL OR MONTH(TransactionDate) = @Month)
    ORDER BY TransactionDate DESC;
END
GO

-- =============================================
-- sp_GetIncentiveSlabs
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetIncentiveSlabs')
    DROP PROCEDURE sp_GetIncentiveSlabs
GO

CREATE PROCEDURE sp_GetIncentiveSlabs
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Id, MinPercent, MaxPercent, Multiplier, Label
    FROM IncentiveSlabs
    ORDER BY MinPercent;
END
GO

-- =============================================
-- sp_GetBonusEligibility
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetBonusEligibility')
    DROP PROCEDURE sp_GetBonusEligibility
GO

CREATE PROCEDURE sp_GetBonusEligibility
    @AdvisorId INT,
    @Year INT,
    @Month INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Id, AdvisorId, Category, [Status], [Year], [Month]
    FROM BonusEligibility
    WHERE AdvisorId = @AdvisorId
      AND [Year] = @Year
      AND [Month] = @Month;
END
GO

-- =============================================
-- sp_GetYtdData
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetYtdData')
    DROP PROCEDURE sp_GetYtdData
GO

CREATE PROCEDURE sp_GetYtdData
    @AdvisorId INT,
    @Year INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        mt.[Month],
        mt.TargetAmount AS Target,
        mt.BaseIncentive,
        ISNULL(SUM(st.Amount), 0) AS Achieved,
        -- Calculate incentive per month
        CASE
            WHEN mt.TargetAmount = 0 THEN 0
            ELSE
                mt.BaseIncentive *
                CASE
                    WHEN (ISNULL(SUM(st.Amount), 0) / mt.TargetAmount) * 100 >= 100 THEN 2.50
                    WHEN (ISNULL(SUM(st.Amount), 0) / mt.TargetAmount) * 100 >= 85  THEN 1.75
                    WHEN (ISNULL(SUM(st.Amount), 0) / mt.TargetAmount) * 100 >= 70  THEN 1.25
                    WHEN (ISNULL(SUM(st.Amount), 0) / mt.TargetAmount) * 100 >= 50  THEN 1.00
                    ELSE 0.50
                END
        END AS Incentive
    FROM MonthlyTargets mt
    LEFT JOIN SalesTransactions st
        ON st.AdvisorId = mt.AdvisorId
        AND YEAR(st.TransactionDate) = mt.[Year]
        AND MONTH(st.TransactionDate) = mt.[Month]
    WHERE mt.AdvisorId = @AdvisorId
      AND mt.[Year] = @Year
    GROUP BY mt.[Month], mt.TargetAmount, mt.BaseIncentive
    ORDER BY mt.[Month];
END
GO
