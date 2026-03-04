-- Create Database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'AIIM_Mobile')
BEGIN
    CREATE DATABASE [AIIM_Mobile]
END
GO

USE [AIIM_Mobile]
GO
