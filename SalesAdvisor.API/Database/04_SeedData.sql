USE [AIIM_Mobile]
GO

-- Seed Advisor (M365 login for authentication)
IF NOT EXISTS (SELECT * FROM SalesAdvisors WHERE EmpId = 'SA-2847')
    INSERT INTO SalesAdvisors (EmpId, M365LoginId, Name, Role, Branch, Avatar)
    VALUES ('SA-2847', 'sohail.iqbal@ali-sons.com', 'Sohail Iqbal', 'Senior Sales Advisor', 'Downtown Premium', 'SI');
GO

-- Seed Incentive Slabs
IF NOT EXISTS (SELECT * FROM IncentiveSlabs)
BEGIN
    INSERT INTO IncentiveSlabs (MinPercent, MaxPercent, Multiplier, Label) VALUES (0, 50, 0.50, '0 - 50%');
    INSERT INTO IncentiveSlabs (MinPercent, MaxPercent, Multiplier, Label) VALUES (50, 70, 1.00, '50 - 70%');
    INSERT INTO IncentiveSlabs (MinPercent, MaxPercent, Multiplier, Label) VALUES (70, 85, 1.25, '70 - 85%');
    INSERT INTO IncentiveSlabs (MinPercent, MaxPercent, Multiplier, Label) VALUES (85, 100, 1.75, '85 - 100%');
    INSERT INTO IncentiveSlabs (MinPercent, MaxPercent, Multiplier, Label) VALUES (100, 999, 2.50, '100%+');
END
GO

-- Seed Product Categories
IF NOT EXISTS (SELECT * FROM ProductCategories)
BEGIN
    INSERT INTO ProductCategories (Name, Color) VALUES ('New Vehicles', '#1B4D3E');
    INSERT INTO ProductCategories (Name, Color) VALUES ('Pre-Owned', '#2A7A5F');
    INSERT INTO ProductCategories (Name, Color) VALUES ('F&I Products', '#D4A853');
    INSERT INTO ProductCategories (Name, Color) VALUES ('Accessories', '#6B8FA3');
END
GO

-- Seed Campaigns
IF NOT EXISTS (SELECT * FROM Campaigns)
BEGIN
    INSERT INTO Campaigns (Name) VALUES ('Q3 Push');
    INSERT INTO Campaigns (Name) VALUES ('Loyalty Prog.');
    INSERT INTO Campaigns (Name) VALUES ('Fleet Sales');
    INSERT INTO Campaigns (Name) VALUES ('Digital Leads');
END
GO

-- Seed Monthly Targets
DECLARE @AdvisorId INT = (SELECT Id FROM SalesAdvisors WHERE EmpId = 'SA-2847');

IF NOT EXISTS (SELECT * FROM MonthlyTargets WHERE AdvisorId = @AdvisorId AND [Year] = 2025)
BEGIN
    INSERT INTO MonthlyTargets (AdvisorId, [Year], [Month], TargetAmount, BaseIncentive) VALUES (@AdvisorId, 2025, 1, 800000, 10000);
    INSERT INTO MonthlyTargets (AdvisorId, [Year], [Month], TargetAmount, BaseIncentive) VALUES (@AdvisorId, 2025, 2, 800000, 10000);
    INSERT INTO MonthlyTargets (AdvisorId, [Year], [Month], TargetAmount, BaseIncentive) VALUES (@AdvisorId, 2025, 3, 850000, 11000);
    INSERT INTO MonthlyTargets (AdvisorId, [Year], [Month], TargetAmount, BaseIncentive) VALUES (@AdvisorId, 2025, 4, 850000, 11000);
    INSERT INTO MonthlyTargets (AdvisorId, [Year], [Month], TargetAmount, BaseIncentive) VALUES (@AdvisorId, 2025, 5, 900000, 12000);
    INSERT INTO MonthlyTargets (AdvisorId, [Year], [Month], TargetAmount, BaseIncentive) VALUES (@AdvisorId, 2025, 6, 900000, 12000);
    INSERT INTO MonthlyTargets (AdvisorId, [Year], [Month], TargetAmount, BaseIncentive) VALUES (@AdvisorId, 2025, 7, 850000, 12000);
    INSERT INTO MonthlyTargets (AdvisorId, [Year], [Month], TargetAmount, BaseIncentive) VALUES (@AdvisorId, 2025, 8, 850000, 12000);
    INSERT INTO MonthlyTargets (AdvisorId, [Year], [Month], TargetAmount, BaseIncentive) VALUES (@AdvisorId, 2025, 9, 850000, 12000);
END
GO

-- Seed Transactions
DECLARE @AdvisorId INT = (SELECT Id FROM SalesAdvisors WHERE EmpId = 'SA-2847');

IF NOT EXISTS (SELECT * FROM SalesTransactions WHERE AdvisorId = @AdvisorId)
BEGIN
    INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type]) VALUES (@AdvisorId, 'Michael Brown', 'Audi Q5', 82000, '2025-09-28', 'New');
    INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type]) VALUES (@AdvisorId, 'Anna Kowalski', 'Porsche Macan', 95000, '2025-09-25', 'New');
    INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type]) VALUES (@AdvisorId, 'Yuki Tanaka', 'VW ID.4', 58000, '2025-09-22', 'New');
    INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type]) VALUES (@AdvisorId, 'Robert Kim', 'Audi A4 (CPO)', 42000, '2025-09-20', 'Pre-Owned');
    INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type]) VALUES (@AdvisorId, 'Priya Sharma', 'Skoda Kodiaq', 48000, '2025-09-18', 'New');
    INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type]) VALUES (@AdvisorId, 'Thomas Weber', 'Porsche Cayenne', 125000, '2025-09-15', 'New');
    INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type]) VALUES (@AdvisorId, 'Maria Santos', 'VW Tiguan', 52000, '2025-09-12', 'New');
    INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type]) VALUES (@AdvisorId, 'John O''Brien', 'MG HS+', 38000, '2025-09-08', 'New');
    INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type]) VALUES (@AdvisorId, 'Wei Zhang', 'Audi e-tron (CPO)', 72000, '2025-09-05', 'Pre-Owned');
END
GO

-- Seed Leads
DECLARE @AdvisorId INT = (SELECT Id FROM SalesAdvisors WHERE EmpId = 'SA-2847');

IF NOT EXISTS (SELECT * FROM Leads WHERE AdvisorId = @AdvisorId)
BEGIN
    INSERT INTO Leads (AdvisorId, CustomerName, Vehicle, DealValue, Commission, Stage, Probability, Temperature, LastContact) VALUES (@AdvisorId, 'Ahmed Al Rashid', 'Porsche Cayenne', 185000, 4625, 'Negotiation', 85, 'hot', '2 hours ago');
    INSERT INTO Leads (AdvisorId, CustomerName, Vehicle, DealValue, Commission, Stage, Probability, Temperature, LastContact) VALUES (@AdvisorId, 'Sarah Mitchell', 'Audi Q7', 142000, 3550, 'Test Drive', 70, 'hot', '1 day ago');
    INSERT INTO Leads (AdvisorId, CustomerName, Vehicle, DealValue, Commission, Stage, Probability, Temperature, LastContact) VALUES (@AdvisorId, 'Omar Khalil', 'VW Tiguan', 95000, 2375, 'Proposal Sent', 60, 'warm', '3 days ago');
    INSERT INTO Leads (AdvisorId, CustomerName, Vehicle, DealValue, Commission, Stage, Probability, Temperature, LastContact) VALUES (@AdvisorId, 'Lisa Chen', 'Porsche 911', 220000, 5500, 'Negotiation', 75, 'hot', '5 hours ago');
    INSERT INTO Leads (AdvisorId, CustomerName, Vehicle, DealValue, Commission, Stage, Probability, Temperature, LastContact) VALUES (@AdvisorId, 'James Wilson', 'Skoda Octavia', 68000, 1700, 'Initial Contact', 30, 'cold', '1 week ago');
    INSERT INTO Leads (AdvisorId, CustomerName, Vehicle, DealValue, Commission, Stage, Probability, Temperature, LastContact) VALUES (@AdvisorId, 'Fatima Hassan', 'Audi A6', 115000, 2875, 'Test Drive', 65, 'warm', '2 days ago');
    INSERT INTO Leads (AdvisorId, CustomerName, Vehicle, DealValue, Commission, Stage, Probability, Temperature, LastContact) VALUES (@AdvisorId, 'David Park', 'VW Golf R', 78000, 1950, 'Follow Up', 40, 'warm', '4 days ago');
    INSERT INTO Leads (AdvisorId, CustomerName, Vehicle, DealValue, Commission, Stage, Probability, Temperature, LastContact) VALUES (@AdvisorId, 'Nina Patel', 'Porsche Macan', 198000, 4950, 'Negotiation', 80, 'hot', '6 hours ago');
    INSERT INTO Leads (AdvisorId, CustomerName, Vehicle, DealValue, Commission, Stage, Probability, Temperature, LastContact) VALUES (@AdvisorId, 'Carlos Rivera', 'MG ZS EV', 52000, 1300, 'Initial Contact', 20, 'cold', '2 weeks ago');
    INSERT INTO Leads (AdvisorId, CustomerName, Vehicle, DealValue, Commission, Stage, Probability, Temperature, LastContact) VALUES (@AdvisorId, 'Emma Thompson', 'Audi e-tron GT', 165000, 4125, 'Proposal Sent', 55, 'warm', '3 days ago');
    INSERT INTO Leads (AdvisorId, CustomerName, Vehicle, DealValue, Commission, Stage, Probability, Temperature, LastContact) VALUES (@AdvisorId, 'Raj Mehta', 'Skoda Superb', 88000, 2200, 'Follow Up', 45, 'warm', '5 days ago');
    INSERT INTO Leads (AdvisorId, CustomerName, Vehicle, DealValue, Commission, Stage, Probability, Temperature, LastContact) VALUES (@AdvisorId, 'Sophie Laurent', 'Porsche Taycan', 275000, 6875, 'Test Drive', 50, 'warm', '1 day ago');
END
GO

-- Seed Bonus Eligibility
DECLARE @AdvisorId INT = (SELECT Id FROM SalesAdvisors WHERE EmpId = 'SA-2847');

IF NOT EXISTS (SELECT * FROM BonusEligibility WHERE AdvisorId = @AdvisorId AND [Year] = 2025 AND [Month] = 9)
BEGIN
    INSERT INTO BonusEligibility (AdvisorId, Category, [Status], [Year], [Month]) VALUES (@AdvisorId, 'New Vehicle Bonus', 'Eligible', 2025, 9);
    INSERT INTO BonusEligibility (AdvisorId, Category, [Status], [Year], [Month]) VALUES (@AdvisorId, 'Volume Accelerator', 'Almost Eligible', 2025, 9);
    INSERT INTO BonusEligibility (AdvisorId, Category, [Status], [Year], [Month]) VALUES (@AdvisorId, 'Customer Satisfaction', 'Eligible', 2025, 9);
    INSERT INTO BonusEligibility (AdvisorId, Category, [Status], [Year], [Month]) VALUES (@AdvisorId, 'F&I Penetration', 'Not Eligible', 2025, 9);
END
GO
