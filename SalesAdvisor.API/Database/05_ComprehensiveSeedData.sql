USE [AIIM_Mobile]
GO

-- =============================================
-- Comprehensive Seed Data
-- Clears and re-seeds all transactional data
-- Keeps reference data (Slabs, Categories, Campaigns)
-- =============================================

-- Clear transactional data
DELETE FROM BonusEligibility;
DELETE FROM SalesTransactions;
DELETE FROM Leads;
DELETE FROM MonthlyTargets;
GO

DECLARE @AdvisorId INT = (SELECT Id FROM SalesAdvisors WHERE EmpId = 'SA-2847');

-- =============================================
-- 2024 Monthly Targets (previous year comparison)
-- =============================================
INSERT INTO MonthlyTargets (AdvisorId, [Year], [Month], TargetAmount, BaseIncentive) VALUES
(@AdvisorId, 2024, 1,  700000, 8000),
(@AdvisorId, 2024, 2,  700000, 8000),
(@AdvisorId, 2024, 3,  750000, 8500),
(@AdvisorId, 2024, 4,  750000, 8500),
(@AdvisorId, 2024, 5,  800000, 9000),
(@AdvisorId, 2024, 6,  800000, 9000),
(@AdvisorId, 2024, 7,  750000, 9000),
(@AdvisorId, 2024, 8,  750000, 9000),
(@AdvisorId, 2024, 9,  750000, 9000),
(@AdvisorId, 2024, 10, 800000, 9500),
(@AdvisorId, 2024, 11, 800000, 9500),
(@AdvisorId, 2024, 12, 800000, 9500);

-- =============================================
-- 2025 Monthly Targets
-- =============================================
INSERT INTO MonthlyTargets (AdvisorId, [Year], [Month], TargetAmount, BaseIncentive) VALUES
(@AdvisorId, 2025, 1,  800000, 10000),
(@AdvisorId, 2025, 2,  800000, 10000),
(@AdvisorId, 2025, 3,  850000, 11000),
(@AdvisorId, 2025, 4,  850000, 11000),
(@AdvisorId, 2025, 5,  900000, 12000),
(@AdvisorId, 2025, 6,  900000, 12000),
(@AdvisorId, 2025, 7,  850000, 12000),
(@AdvisorId, 2025, 8,  850000, 12000),
(@AdvisorId, 2025, 9,  850000, 12000);
GO

-- =============================================
-- 2024 Transactions (12 months, ~5-7 per month)
-- =============================================
DECLARE @AdvisorId INT = (SELECT Id FROM SalesAdvisors WHERE EmpId = 'SA-2847');

-- Jan 2024 (~510K achieved = 73%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Rashid Al Maktoum', 'Audi A4', 68000, '2024-01-05', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Sultan Al Dhaheri', 'VW Tiguan', 55000, '2024-01-10', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Faisal Qasim', 'Skoda Octavia', 45000, '2024-01-14', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Amira Saleh', 'Porsche Macan', 98000, '2024-01-18', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Yousuf Ibrahim', 'MG HS+', 38000, '2024-01-22', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Dana Khalil', 'Audi Q5 (CPO)', 52000, '2024-01-25', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Bilal Hashim', 'Porsche Cayenne', 142000, '2024-01-28', 'New', 'New Vehicles', 3),
(@AdvisorId, 'Nadia Zayed', 'F&I Package', 12000, '2024-01-29', 'New', 'F&I Products', NULL);

-- Feb 2024 (~620K achieved = 89%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Abdullah Rashid', 'Porsche Cayenne', 148000, '2024-02-03', 'New', 'New Vehicles', 3),
(@AdvisorId, 'Fatima Al Suwaidi', 'Audi Q7', 118000, '2024-02-07', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Omar Saeed', 'VW Golf R', 72000, '2024-02-12', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Sara Mansour', 'Skoda Kodiaq', 49000, '2024-02-16', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Hamdan Al Nahyan', 'Audi A6', 85000, '2024-02-20', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Aisha Khalifa', 'VW Tiguan (CPO)', 42000, '2024-02-24', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Majid Al Marzouqi', 'MG5', 35000, '2024-02-26', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Hana Yousuf', 'Accessories Pack', 8000, '2024-02-27', 'New', 'Accessories', NULL),
(@AdvisorId, 'Waleed Tamim', 'Porsche Macan', 95000, '2024-02-28', 'New', 'New Vehicles', NULL);

-- Mar 2024 (~540K achieved = 72%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Lubna Al Shamsi', 'VW ID.4', 58000, '2024-03-04', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Khaled Barakat', 'Audi Q5', 82000, '2024-03-08', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Dina Mustafa', 'Skoda Superb', 62000, '2024-03-12', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Saif Al Nuaimi', 'Porsche Macan (CPO)', 78000, '2024-03-18', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Maryam Jaber', 'MG ZS EV', 42000, '2024-03-22', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Adel Rashed', 'Audi A4', 65000, '2024-03-25', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Noura Al Ketbi', 'VW Tiguan', 55000, '2024-03-28', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Zayed Al Qassimi', 'Porsche Cayenne', 148000, '2024-03-30', 'New', 'New Vehicles', 3);

-- Apr 2024 (~680K achieved = 91%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Hala Mansoor', 'Porsche 911', 185000, '2024-04-02', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Fahad Al Muhairi', 'Audi Q7', 122000, '2024-04-06', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Salma Saeed', 'VW Arteon', 72000, '2024-04-10', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Ibrahim Al Zaabi', 'Skoda Kodiaq', 49000, '2024-04-14', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Rania Talal', 'Audi A4 (CPO)', 45000, '2024-04-18', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Badr Al Suwaidi', 'MG HS+', 39000, '2024-04-22', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Yasmin Ali', 'Porsche Macan', 105000, '2024-04-25', 'New', 'New Vehicles', 3),
(@AdvisorId, 'Nawaf Al Muhairbi', 'F&I Package', 15000, '2024-04-26', 'New', 'F&I Products', NULL),
(@AdvisorId, 'Dalal Hassan', 'VW Golf', 48000, '2024-04-28', 'New', 'New Vehicles', NULL);

-- May 2024 (~790K achieved = 99%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Jassim Al Tayer', 'Porsche Cayenne', 158000, '2024-05-03', 'New', 'New Vehicles', 3),
(@AdvisorId, 'Shaikha Rashed', 'Audi e-tron', 125000, '2024-05-07', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Abdulrahman Nasser', 'VW Tiguan', 56000, '2024-05-10', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Leila Fouad', 'Skoda Superb', 62000, '2024-05-14', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Ali Hassan', 'Porsche Macan', 102000, '2024-05-18', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Noor Al Ain', 'Audi Q5', 85000, '2024-05-21', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Tariq Aziz', 'VW ID.4', 58000, '2024-05-24', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Saeed Abdullah', 'MG5', 36000, '2024-05-26', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Khalid Mansoor', 'Audi A6 (CPO)', 62000, '2024-05-28', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Mariam Yousef', 'Accessories Pack', 9000, '2024-05-29', 'New', 'Accessories', NULL),
(@AdvisorId, 'Hassan Ali', 'F&I Package', 14000, '2024-05-30', 'New', 'F&I Products', NULL);

-- Jun 2024 (~640K achieved = 80%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Reem Sultan', 'Audi Q5', 82000, '2024-06-03', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Jamal Nasser', 'VW Golf R', 72000, '2024-06-07', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Huda Karim', 'Porsche Macan', 105000, '2024-06-11', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Layla Farouk', 'Skoda Octavia', 45000, '2024-06-15', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Sultan Al Dhaheri', 'MG ZS EV', 42000, '2024-06-19', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Mona Rizk', 'Audi A4 (CPO)', 48000, '2024-06-22', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Faisal Qasim', 'Porsche Cayenne', 145000, '2024-06-25', 'New', 'New Vehicles', 3),
(@AdvisorId, 'Amira Saleh', 'VW Tiguan', 52000, '2024-06-28', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Yousuf Ibrahim', 'F&I Package', 12000, '2024-06-29', 'New', 'F&I Products', NULL);

-- Jul 2024 (~700K achieved = 93%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Dana Khalil', 'Porsche 911', 195000, '2024-07-02', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Bilal Hashim', 'Audi Q7', 118000, '2024-07-06', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Nadia Zayed', 'VW Arteon', 72000, '2024-07-10', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Abdullah Rashid', 'Skoda Kodiaq', 49000, '2024-07-14', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Fatima Al Suwaidi', 'Audi e-tron (CPO)', 72000, '2024-07-18', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Omar Saeed', 'MG HS+', 39000, '2024-07-22', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Sara Mansour', 'Porsche Macan', 98000, '2024-07-25', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Hamdan Al Nahyan', 'VW Golf', 48000, '2024-07-28', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Aisha Khalifa', 'Accessories Pack', 11000, '2024-07-29', 'New', 'Accessories', NULL);

-- Aug 2024 (~660K achieved = 88%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Majid Al Marzouqi', 'Audi A6', 88000, '2024-08-02', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Hana Yousuf', 'Porsche Macan', 102000, '2024-08-06', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Waleed Tamim', 'VW Tiguan', 55000, '2024-08-10', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Lubna Al Shamsi', 'Skoda Superb', 62000, '2024-08-14', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Khaled Barakat', 'MG5', 35000, '2024-08-18', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Dina Mustafa', 'Audi Q5 (CPO)', 55000, '2024-08-22', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Saif Al Nuaimi', 'Porsche Cayenne', 148000, '2024-08-25', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Maryam Jaber', 'VW ID.4', 58000, '2024-08-28', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Adel Rashed', 'F&I Package', 13000, '2024-08-29', 'New', 'F&I Products', NULL),
(@AdvisorId, 'Noura Al Ketbi', 'Accessories Pack', 8000, '2024-08-30', 'New', 'Accessories', NULL);

-- Sep 2024 (~620K achieved = 83%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Zayed Al Qassimi', 'Audi Q5', 82000, '2024-09-02', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Hala Mansoor', 'VW Golf R', 72000, '2024-09-06', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Fahad Al Muhairi', 'Porsche Macan', 105000, '2024-09-10', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Salma Saeed', 'Skoda Octavia', 45000, '2024-09-14', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Ibrahim Al Zaabi', 'Audi A4 (CPO)', 48000, '2024-09-18', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Rania Talal', 'Porsche Cayenne', 152000, '2024-09-22', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Badr Al Suwaidi', 'MG HS+', 39000, '2024-09-25', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Yasmin Ali', 'VW Tiguan', 55000, '2024-09-28', 'New', 'New Vehicles', NULL);

-- Oct 2024 (~720K achieved = 90%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Nawaf Al Muhairbi', 'Porsche 911', 198000, '2024-10-02', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Dalal Hassan', 'Audi Q7', 122000, '2024-10-06', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Jassim Al Tayer', 'VW Arteon', 72000, '2024-10-10', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Shaikha Rashed', 'Skoda Kodiaq', 49000, '2024-10-14', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Abdulrahman Nasser', 'Audi e-tron (CPO)', 72000, '2024-10-18', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Leila Fouad', 'Porsche Macan', 105000, '2024-10-22', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Ali Hassan', 'MG ZS EV', 42000, '2024-10-25', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Noor Al Ain', 'VW Golf', 48000, '2024-10-28', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Tariq Aziz', 'F&I Package', 14000, '2024-10-29', 'New', 'F&I Products', NULL);

-- Nov 2024 (~810K achieved = 101%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Saeed Abdullah', 'Porsche Taycan', 245000, '2024-11-02', 'New', 'New Vehicles', 3),
(@AdvisorId, 'Khalid Mansoor', 'Audi Q7', 125000, '2024-11-05', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Mariam Yousef', 'VW Tiguan', 56000, '2024-11-08', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Hassan Ali', 'Audi A6', 88000, '2024-11-12', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Reem Sultan', 'Skoda Superb', 62000, '2024-11-15', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Jamal Nasser', 'Porsche Macan (CPO)', 78000, '2024-11-18', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Huda Karim', 'MG HS+', 42000, '2024-11-21', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Layla Farouk', 'VW ID.4', 58000, '2024-11-24', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Sultan Al Dhaheri', 'Audi Q5', 82000, '2024-11-27', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Mona Rizk', 'Accessories Pack', 12000, '2024-11-28', 'New', 'Accessories', NULL);

-- Dec 2024 (~850K achieved = 106%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Faisal Qasim', 'Porsche 911', 215000, '2024-12-02', 'New', 'New Vehicles', 3),
(@AdvisorId, 'Amira Saleh', 'Porsche Cayenne', 155000, '2024-12-05', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Yousuf Ibrahim', 'Audi e-tron', 128000, '2024-12-08', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Dana Khalil', 'VW Golf R', 72000, '2024-12-12', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Bilal Hashim', 'Skoda Kodiaq', 49000, '2024-12-15', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Nadia Zayed', 'Audi A4', 68000, '2024-12-18', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Abdullah Rashid', 'MG5', 36000, '2024-12-20', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Fatima Al Suwaidi', 'VW Tiguan (CPO)', 42000, '2024-12-22', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Omar Saeed', 'Porsche Macan', 102000, '2024-12-25', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Sara Mansour', 'F&I Package', 16000, '2024-12-28', 'New', 'F&I Products', NULL),
(@AdvisorId, 'Hamdan Al Nahyan', 'Accessories Pack', 10000, '2024-12-29', 'New', 'Accessories', NULL);
GO

-- =============================================
-- 2025 Transactions (Jan - Sep)
-- =============================================
DECLARE @AdvisorId INT = (SELECT Id FROM SalesAdvisors WHERE EmpId = 'SA-2847');

-- Jan 2025 (~720K achieved = 90%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Ali Hassan', 'Audi Q7', 125000, '2025-01-03', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Noor Al Ain', 'VW Tiguan', 56000, '2025-01-06', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Tariq Aziz', 'Porsche Macan', 108000, '2025-01-10', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Saeed Abdullah', 'Skoda Kodiaq', 49000, '2025-01-13', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Khalid Mansoor', 'MG HS+', 42000, '2025-01-16', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Mariam Yousef', 'Audi A4 (CPO)', 48000, '2025-01-19', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Hassan Ali', 'Porsche Cayenne', 155000, '2025-01-22', 'New', 'New Vehicles', 3),
(@AdvisorId, 'Reem Sultan', 'VW Golf R', 72000, '2025-01-25', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Jamal Nasser', 'F&I Package', 15000, '2025-01-27', 'New', 'F&I Products', NULL),
(@AdvisorId, 'Huda Karim', 'Skoda Superb', 58000, '2025-01-30', 'New', 'New Vehicles', NULL);

-- Feb 2025 (~780K achieved = 97.5%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Layla Farouk', 'Porsche 911', 195000, '2025-02-03', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Sultan Al Dhaheri', 'Audi Q5', 85000, '2025-02-06', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Mona Rizk', 'VW Arteon', 72000, '2025-02-10', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Faisal Qasim', 'Skoda Kodiaq', 49000, '2025-02-13', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Amira Saleh', 'Audi e-tron (CPO)', 72000, '2025-02-16', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Yousuf Ibrahim', 'Porsche Macan', 105000, '2025-02-19', 'New', 'New Vehicles', 3),
(@AdvisorId, 'Dana Khalil', 'MG ZS EV', 42000, '2025-02-21', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Bilal Hashim', 'VW Tiguan', 55000, '2025-02-23', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Nadia Zayed', 'Audi A6', 88000, '2025-02-26', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Abdullah Rashid', 'Accessories Pack', 12000, '2025-02-27', 'New', 'Accessories', NULL),
(@AdvisorId, 'Fatima Al Suwaidi', 'F&I Package', 14000, '2025-02-28', 'New', 'F&I Products', NULL);

-- Mar 2025 (~680K achieved = 80%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Omar Saeed', 'Audi A4', 68000, '2025-03-03', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Sara Mansour', 'VW ID.4', 58000, '2025-03-06', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Hamdan Al Nahyan', 'Porsche Macan', 102000, '2025-03-10', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Aisha Khalifa', 'Skoda Octavia', 45000, '2025-03-13', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Majid Al Marzouqi', 'MG HS+', 39000, '2025-03-16', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Hana Yousuf', 'Audi Q5 (CPO)', 55000, '2025-03-19', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Waleed Tamim', 'VW Golf', 48000, '2025-03-22', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Lubna Al Shamsi', 'Porsche Cayenne', 145000, '2025-03-25', 'New', 'New Vehicles', 3),
(@AdvisorId, 'Khaled Barakat', 'Skoda Kodiaq', 49000, '2025-03-28', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Dina Mustafa', 'Accessories Pack', 9000, '2025-03-29', 'New', 'Accessories', NULL),
(@AdvisorId, 'Saif Al Nuaimi', 'F&I Package', 12000, '2025-03-30', 'New', 'F&I Products', NULL);

-- Apr 2025 (~820K achieved = 96.5%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Maryam Jaber', 'Porsche Cayenne', 158000, '2025-04-02', 'New', 'New Vehicles', 3),
(@AdvisorId, 'Adel Rashed', 'Audi e-tron', 128000, '2025-04-05', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Noura Al Ketbi', 'VW Tiguan', 56000, '2025-04-08', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Zayed Al Qassimi', 'Skoda Superb', 62000, '2025-04-11', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Hala Mansoor', 'Audi Q5', 85000, '2025-04-14', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Fahad Al Muhairi', 'Porsche Macan (CPO)', 78000, '2025-04-17', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Salma Saeed', 'MG5', 36000, '2025-04-20', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Ibrahim Al Zaabi', 'VW Golf R', 72000, '2025-04-23', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Rania Talal', 'Audi A6', 88000, '2025-04-26', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Badr Al Suwaidi', 'Porsche Macan', 98000, '2025-04-29', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Yasmin Ali', 'F&I Package', 15000, '2025-04-30', 'New', 'F&I Products', NULL);

-- May 2025 (~920K achieved = 102%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Nawaf Al Muhairbi', 'Porsche 911', 215000, '2025-05-02', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Dalal Hassan', 'Porsche Cayenne', 155000, '2025-05-05', 'New', 'New Vehicles', 3),
(@AdvisorId, 'Jassim Al Tayer', 'Audi Q7', 122000, '2025-05-08', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Shaikha Rashed', 'VW Arteon', 72000, '2025-05-11', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Abdulrahman Nasser', 'Skoda Kodiaq', 49000, '2025-05-14', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Leila Fouad', 'Audi A4 (CPO)', 48000, '2025-05-17', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Ali Hassan', 'VW Tiguan', 56000, '2025-05-20', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Noor Al Ain', 'MG HS+', 42000, '2025-05-22', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Tariq Aziz', 'Porsche Macan', 105000, '2025-05-25', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Saeed Abdullah', 'Audi A4', 68000, '2025-05-28', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Khalid Mansoor', 'F&I Package', 16000, '2025-05-29', 'New', 'F&I Products', NULL),
(@AdvisorId, 'Mariam Yousef', 'Accessories Pack', 11000, '2025-05-30', 'New', 'Accessories', NULL);

-- Jun 2025 (~740K achieved = 82%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Hassan Ali', 'Audi Q5', 85000, '2025-06-02', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Reem Sultan', 'VW Golf R', 72000, '2025-06-05', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Jamal Nasser', 'Porsche Macan', 105000, '2025-06-09', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Huda Karim', 'Skoda Superb', 62000, '2025-06-12', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Layla Farouk', 'MG ZS EV', 42000, '2025-06-15', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Sultan Al Dhaheri', 'Audi A6 (CPO)', 62000, '2025-06-18', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Mona Rizk', 'Porsche Cayenne', 148000, '2025-06-21', 'New', 'New Vehicles', 3),
(@AdvisorId, 'Faisal Qasim', 'VW ID.4', 58000, '2025-06-24', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Amira Saleh', 'Skoda Octavia', 45000, '2025-06-27', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Yousuf Ibrahim', 'Audi A4', 65000, '2025-06-30', 'New', 'New Vehicles', 2);

-- Jul 2025 (~790K achieved = 93%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Dana Khalil', 'Porsche 911', 195000, '2025-07-02', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Bilal Hashim', 'Audi Q7', 122000, '2025-07-05', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Nadia Zayed', 'VW Arteon', 72000, '2025-07-09', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Abdullah Rashid', 'Skoda Kodiaq', 49000, '2025-07-12', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Fatima Al Suwaidi', 'Audi A4 (CPO)', 48000, '2025-07-15', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Omar Saeed', 'MG HS+', 42000, '2025-07-18', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Sara Mansour', 'Porsche Macan', 105000, '2025-07-21', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Hamdan Al Nahyan', 'VW Golf', 48000, '2025-07-24', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Aisha Khalifa', 'Audi A6', 88000, '2025-07-27', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Majid Al Marzouqi', 'F&I Package', 14000, '2025-07-29', 'New', 'F&I Products', NULL),
(@AdvisorId, 'Hana Yousuf', 'Accessories Pack', 10000, '2025-07-30', 'New', 'Accessories', NULL);

-- Aug 2025 (~760K achieved = 89%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Waleed Tamim', 'Porsche Cayenne', 152000, '2025-08-02', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Lubna Al Shamsi', 'Audi Q5', 85000, '2025-08-05', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Khaled Barakat', 'VW Tiguan', 56000, '2025-08-08', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Dina Mustafa', 'Skoda Octavia', 45000, '2025-08-11', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Saif Al Nuaimi', 'Audi e-tron (CPO)', 72000, '2025-08-14', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Maryam Jaber', 'MG5', 36000, '2025-08-17', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Adel Rashed', 'VW Golf R', 72000, '2025-08-20', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Noura Al Ketbi', 'Porsche Macan', 105000, '2025-08-23', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Zayed Al Qassimi', 'Audi A4', 68000, '2025-08-26', 'New', 'New Vehicles', 2),
(@AdvisorId, 'Hala Mansoor', 'Skoda Superb', 62000, '2025-08-29', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Fahad Al Muhairi', 'F&I Package', 15000, '2025-08-30', 'New', 'F&I Products', NULL);

-- Sep 2025 (~612K achieved = 72%)
INSERT INTO SalesTransactions (AdvisorId, CustomerName, Vehicle, Amount, TransactionDate, [Type], ProductCategory, CampaignId) VALUES
(@AdvisorId, 'Michael Brown', 'Audi Q5', 82000, '2025-09-28', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Anna Kowalski', 'Porsche Macan', 95000, '2025-09-25', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Yuki Tanaka', 'VW ID.4', 58000, '2025-09-22', 'New', 'New Vehicles', 4),
(@AdvisorId, 'Robert Kim', 'Audi A4 (CPO)', 42000, '2025-09-20', 'Pre-Owned', 'Pre-Owned', NULL),
(@AdvisorId, 'Priya Sharma', 'Skoda Kodiaq', 48000, '2025-09-18', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Thomas Weber', 'Porsche Cayenne', 125000, '2025-09-15', 'New', 'New Vehicles', 1),
(@AdvisorId, 'Maria Santos', 'VW Tiguan', 52000, '2025-09-12', 'New', 'New Vehicles', 2),
(@AdvisorId, 'John O''Brien', 'MG HS+', 38000, '2025-09-08', 'New', 'New Vehicles', NULL),
(@AdvisorId, 'Wei Zhang', 'Audi e-tron (CPO)', 72000, '2025-09-05', 'Pre-Owned', 'Pre-Owned', NULL);
GO

-- =============================================
-- Leads (same as before, kept fresh)
-- =============================================
DECLARE @AdvisorId INT = (SELECT Id FROM SalesAdvisors WHERE EmpId = 'SA-2847');

INSERT INTO Leads (AdvisorId, CustomerName, Vehicle, DealValue, Commission, Stage, Probability, Temperature, LastContact) VALUES
(@AdvisorId, 'Ahmed Al Rashid', 'Porsche Cayenne', 185000, 4625, 'Negotiation', 85, 'hot', '2 hours ago'),
(@AdvisorId, 'Sarah Mitchell', 'Audi Q7', 142000, 3550, 'Test Drive', 70, 'hot', '1 day ago'),
(@AdvisorId, 'Omar Khalil', 'VW Tiguan', 95000, 2375, 'Proposal Sent', 60, 'warm', '3 days ago'),
(@AdvisorId, 'Lisa Chen', 'Porsche 911', 220000, 5500, 'Negotiation', 75, 'hot', '5 hours ago'),
(@AdvisorId, 'James Wilson', 'Skoda Octavia', 68000, 1700, 'Initial Contact', 30, 'cold', '1 week ago'),
(@AdvisorId, 'Fatima Hassan', 'Audi A6', 115000, 2875, 'Test Drive', 65, 'warm', '2 days ago'),
(@AdvisorId, 'David Park', 'VW Golf R', 78000, 1950, 'Follow Up', 40, 'warm', '4 days ago'),
(@AdvisorId, 'Nina Patel', 'Porsche Macan', 198000, 4950, 'Negotiation', 80, 'hot', '6 hours ago'),
(@AdvisorId, 'Carlos Rivera', 'MG ZS EV', 52000, 1300, 'Initial Contact', 20, 'cold', '2 weeks ago'),
(@AdvisorId, 'Emma Thompson', 'Audi e-tron GT', 165000, 4125, 'Proposal Sent', 55, 'warm', '3 days ago'),
(@AdvisorId, 'Raj Mehta', 'Skoda Superb', 88000, 2200, 'Follow Up', 45, 'warm', '5 days ago'),
(@AdvisorId, 'Sophie Laurent', 'Porsche Taycan', 275000, 6875, 'Test Drive', 50, 'warm', '1 day ago');
GO

-- =============================================
-- Bonus Eligibility (all months 2025)
-- =============================================
DECLARE @AdvisorId INT = (SELECT Id FROM SalesAdvisors WHERE EmpId = 'SA-2847');

-- Jan 2025
INSERT INTO BonusEligibility (AdvisorId, Category, [Status], [Year], [Month]) VALUES
(@AdvisorId, 'New Vehicle Bonus', 'Eligible', 2025, 1),
(@AdvisorId, 'Volume Accelerator', 'Not Eligible', 2025, 1),
(@AdvisorId, 'Customer Satisfaction', 'Eligible', 2025, 1),
(@AdvisorId, 'F&I Penetration', 'Not Eligible', 2025, 1);

-- Feb 2025
INSERT INTO BonusEligibility (AdvisorId, Category, [Status], [Year], [Month]) VALUES
(@AdvisorId, 'New Vehicle Bonus', 'Eligible', 2025, 2),
(@AdvisorId, 'Volume Accelerator', 'Almost Eligible', 2025, 2),
(@AdvisorId, 'Customer Satisfaction', 'Eligible', 2025, 2),
(@AdvisorId, 'F&I Penetration', 'Not Eligible', 2025, 2);

-- Mar 2025
INSERT INTO BonusEligibility (AdvisorId, Category, [Status], [Year], [Month]) VALUES
(@AdvisorId, 'New Vehicle Bonus', 'Eligible', 2025, 3),
(@AdvisorId, 'Volume Accelerator', 'Not Eligible', 2025, 3),
(@AdvisorId, 'Customer Satisfaction', 'Eligible', 2025, 3),
(@AdvisorId, 'F&I Penetration', 'Not Eligible', 2025, 3);

-- Apr 2025
INSERT INTO BonusEligibility (AdvisorId, Category, [Status], [Year], [Month]) VALUES
(@AdvisorId, 'New Vehicle Bonus', 'Eligible', 2025, 4),
(@AdvisorId, 'Volume Accelerator', 'Eligible', 2025, 4),
(@AdvisorId, 'Customer Satisfaction', 'Eligible', 2025, 4),
(@AdvisorId, 'F&I Penetration', 'Almost Eligible', 2025, 4);

-- May 2025
INSERT INTO BonusEligibility (AdvisorId, Category, [Status], [Year], [Month]) VALUES
(@AdvisorId, 'New Vehicle Bonus', 'Eligible', 2025, 5),
(@AdvisorId, 'Volume Accelerator', 'Eligible', 2025, 5),
(@AdvisorId, 'Customer Satisfaction', 'Eligible', 2025, 5),
(@AdvisorId, 'F&I Penetration', 'Eligible', 2025, 5);

-- Jun 2025
INSERT INTO BonusEligibility (AdvisorId, Category, [Status], [Year], [Month]) VALUES
(@AdvisorId, 'New Vehicle Bonus', 'Eligible', 2025, 6),
(@AdvisorId, 'Volume Accelerator', 'Not Eligible', 2025, 6),
(@AdvisorId, 'Customer Satisfaction', 'Almost Eligible', 2025, 6),
(@AdvisorId, 'F&I Penetration', 'Not Eligible', 2025, 6);

-- Jul 2025
INSERT INTO BonusEligibility (AdvisorId, Category, [Status], [Year], [Month]) VALUES
(@AdvisorId, 'New Vehicle Bonus', 'Eligible', 2025, 7),
(@AdvisorId, 'Volume Accelerator', 'Almost Eligible', 2025, 7),
(@AdvisorId, 'Customer Satisfaction', 'Eligible', 2025, 7),
(@AdvisorId, 'F&I Penetration', 'Almost Eligible', 2025, 7);

-- Aug 2025
INSERT INTO BonusEligibility (AdvisorId, Category, [Status], [Year], [Month]) VALUES
(@AdvisorId, 'New Vehicle Bonus', 'Eligible', 2025, 8),
(@AdvisorId, 'Volume Accelerator', 'Almost Eligible', 2025, 8),
(@AdvisorId, 'Customer Satisfaction', 'Eligible', 2025, 8),
(@AdvisorId, 'F&I Penetration', 'Not Eligible', 2025, 8);

-- Sep 2025
INSERT INTO BonusEligibility (AdvisorId, Category, [Status], [Year], [Month]) VALUES
(@AdvisorId, 'New Vehicle Bonus', 'Eligible', 2025, 9),
(@AdvisorId, 'Volume Accelerator', 'Almost Eligible', 2025, 9),
(@AdvisorId, 'Customer Satisfaction', 'Eligible', 2025, 9),
(@AdvisorId, 'F&I Penetration', 'Not Eligible', 2025, 9);
GO

PRINT 'Comprehensive seed data inserted successfully.';
PRINT '';

-- Verify counts
SELECT 'MonthlyTargets' AS [Table], COUNT(*) AS [Rows] FROM MonthlyTargets
UNION ALL SELECT 'SalesTransactions', COUNT(*) FROM SalesTransactions
UNION ALL SELECT 'Leads', COUNT(*) FROM Leads
UNION ALL SELECT 'BonusEligibility', COUNT(*) FROM BonusEligibility;
GO
