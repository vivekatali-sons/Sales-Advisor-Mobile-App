-- Create Database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'SalesAdvisorDB')
BEGIN
    CREATE DATABASE [SalesAdvisorDB]
END
GO

USE [SalesAdvisorDB]
GO
