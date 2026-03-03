# Ali & Sons DMS — Sales Advisor Mobile App

A high-performance internal mobile application that empowers Sales Advisors at Ali & Sons to track real-time sales performance, monitor incentive earnings, manage their lead pipeline, and simulate deal outcomes — all from a single, unified interface.

Built with **React Native** (Expo SDK 55 / RN 0.83) on the frontend and **ASP.NET Core 10** with **Dapper** on the backend, backed by **SQL Server** with a stored-procedure-only data access pattern.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Screens & Features](#screens--features)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Stored Procedures](#stored-procedures)
- [Business Logic](#business-logic)
- [Design System](#design-system)
- [Development Guidelines](#development-guidelines)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    MOBILE CLIENT                        │
│            React Native (Expo SDK 55)                   │
│     TypeScript · React Navigation · react-native-svg    │
└──────────────────────┬──────────────────────────────────┘
                       │  REST / JSON
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   API GATEWAY                           │
│              ASP.NET Core 10 Web API                    │
│                                                         │
│  Controllers ──► Services ──► Repositories ──► Dapper   │
│                                                         │
│  • Interface-driven DI throughout                       │
│  • DTOs for all request/response contracts              │
│  • No inline SQL — stored procedures only               │
└──────────────────────┬──────────────────────────────────┘
                       │  Dapper + Microsoft.Data.SqlClient
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  SQL SERVER 2022                         │
│           Docker (dev) / ASETIDEV02 (staging)           │
│                                                         │
│  Tables: SalesAdvisors, MonthlyTargets, Leads,          │
│          SalesTransactions, IncentiveSlabs,              │
│          BonusEligibility, Campaigns, ProductCategories  │
│                                                         │
│  SPs: sp_AuthenticateAdvisor, sp_GetDashboardData,      │
│       sp_GetLeads, sp_GetTransactions,                  │
│       sp_GetIncentiveSlabs, sp_GetBonusEligibility,     │
│       sp_GetYtdData                                     │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer       | Technology                                              | Version    |
|-------------|---------------------------------------------------------|------------|
| Mobile      | React Native (Expo)                                     | RN 0.83 / SDK 55 |
| Language    | TypeScript                                              | 5.9        |
| Navigation  | React Navigation (Bottom Tabs + Native Stack)           | 7.x        |
| Charts      | react-native-svg (custom chart components)              | 15.x       |
| HTTP Client | Axios                                                   | 1.13       |
| Animations  | react-native-reanimated                                 | 4.x        |
| Backend     | ASP.NET Core (Minimal API + Controllers)                | .NET 10    |
| ORM         | Dapper (micro-ORM, stored procedures only)              | 2.1        |
| DB Driver   | Microsoft.Data.SqlClient                                | 6.1        |
| Database    | SQL Server 2022 (Docker dev / ASETIDEV02 staging)       | 2022       |
| Currency    | AED (UAE Dirhams)                                       | —          |

---

## Project Structure

```
DMS_MobileApp/
│
├── SalesAdvisor/                           # FRONTEND — React Native (Expo)
│   ├── App.tsx                             # Root — auth gate + navigation
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── api/
│       │   └── client.ts                   # Axios instance + typed API functions
│       ├── components/
│       │   ├── cards/
│       │   │   └── Card.tsx                # Reusable pressable card
│       │   ├── charts/
│       │   │   ├── AreaChart.tsx            # SVG area/line chart
│       │   │   ├── BarChart.tsx             # SVG bar chart
│       │   │   ├── DonutChart.tsx           # SVG donut/ring chart
│       │   │   └── Sparkline.tsx            # Inline sparkline
│       │   └── common/
│       │       ├── AnimatedNumber.tsx       # Count-up number animation
│       │       ├── Badge.tsx                # Eligibility status badge
│       │       ├── Chip.tsx                 # Filter pill toggle
│       │       ├── CircularProgress.tsx     # SVG radial progress ring
│       │       ├── ProgressBar.tsx          # Horizontal progress bar
│       │       ├── SectionTitle.tsx         # Uppercase section header
│       │       └── TempIndicator.tsx        # Lead temperature dot
│       ├── navigation/
│       │   └── AppNavigator.tsx             # Tab + Stack navigators
│       ├── screens/
│       │   ├── LoginScreen.tsx
│       │   ├── DashboardScreen.tsx
│       │   ├── PerformanceScreen.tsx
│       │   ├── IncentiveScreen.tsx
│       │   ├── YTDScreen.tsx
│       │   ├── LeadsScreen.tsx
│       │   ├── SimulatorScreen.tsx
│       │   └── TransactionsScreen.tsx
│       ├── store/
│       │   └── mockData.ts                 # Mock dataset (mirrors DB seed)
│       ├── theme/
│       │   └── index.ts                    # Colors, shadows, spacing, radii, typography
│       ├── types/
│       │   └── index.ts                    # Shared TypeScript interfaces
│       └── utils/
│           └── formatters.ts               # AED formatting, % calc, slab lookup
│
├── SalesAdvisor.API/                       # BACKEND — ASP.NET Core 10
│   ├── Program.cs                          # DI registration, CORS, routing
│   ├── SalesAdvisor.API.csproj
│   ├── appsettings.json
│   ├── docker-compose.yml                  # SQL Server 2022 container
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   ├── DashboardController.cs
│   │   ├── IncentiveController.cs
│   │   ├── LeadsController.cs
│   │   └── TransactionsController.cs
│   ├── Services/                           # Business logic layer
│   │   ├── IAuthService.cs / AuthService.cs
│   │   ├── IDashboardService.cs / DashboardService.cs
│   │   ├── IIncentiveService.cs / IncentiveService.cs
│   │   ├── ILeadsService.cs / LeadsService.cs
│   │   └── ITransactionsService.cs / TransactionsService.cs
│   ├── Repositories/                       # Data access — Dapper + SPs only
│   │   ├── IAuthRepository.cs / AuthRepository.cs
│   │   ├── IDashboardRepository.cs / DashboardRepository.cs
│   │   ├── IIncentiveRepository.cs / IncentiveRepository.cs
│   │   ├── ILeadsRepository.cs / LeadsRepository.cs
│   │   └── ITransactionsRepository.cs / TransactionsRepository.cs
│   ├── Models/                             # Database entity classes
│   ├── DTOs/                               # Request/Response data contracts
│   ├── Infrastructure/
│   │   └── DbConnectionFactory.cs          # IDbConnectionFactory (Dapper)
│   └── Database/                           # SQL scripts (run in order)
│       ├── 01_CreateDatabase.sql
│       ├── 02_CreateTables.sql
│       ├── 03_StoredProcedures.sql
│       └── 04_SeedData.sql
│
├── DMS_MobileApp.sln                       # Visual Studio solution
├── sales-advisor-app.html                  # Interactive HTML prototype
└── README.md
```

---

## Getting Started

### Prerequisites

| Tool         | Version  | Purpose                      |
|--------------|----------|------------------------------|
| Node.js      | 24+      | React Native / Expo CLI      |
| .NET SDK     | 10.0+    | Backend API                  |
| Docker       | 29+      | SQL Server container (dev)   |
| Expo Go App  | Latest   | Mobile preview on device     |

### 1. Start SQL Server (Docker)

```bash
cd SalesAdvisor.API
docker compose up -d
```

Verify the container is running:
```bash
docker ps | grep sales-advisor-db
```

### 2. Initialize the Database

Run the SQL scripts in order against the Docker container:

```bash
# Connect to SQL Server and run scripts
sqlcmd -S localhost,1433 -U sa -P "SalesAdvisor@2025" -i Database/01_CreateDatabase.sql
sqlcmd -S localhost,1433 -U sa -P "SalesAdvisor@2025" -i Database/02_CreateTables.sql
sqlcmd -S localhost,1433 -U sa -P "SalesAdvisor@2025" -i Database/03_StoredProcedures.sql
sqlcmd -S localhost,1433 -U sa -P "SalesAdvisor@2025" -i Database/04_SeedData.sql
```

### 3. Start the API Server

```bash
cd SalesAdvisor.API
dotnet run
```

The API will be available at `https://localhost:5001` (or `http://localhost:5000`).

### 4. Start the Mobile App

```bash
cd SalesAdvisor
npx expo start --web --offline
```

- **Web**: Opens at http://localhost:8081 (use browser DevTools → mobile viewport)
- **Android**: Press `a` in terminal or scan QR with Expo Go
- **iOS**: Press `i` in terminal or scan QR with Expo Go

### Test Credentials

| Field       | Value        |
|-------------|--------------|
| Employee ID | `SA-2847`    |
| Password    | `password123`|

---

## Screens & Features

### Login
Employee ID + password authentication with company branding, loading states, and forgot-password flow.

### Dashboard (Home)
The primary landing screen with at-a-glance KPIs:
- **Hero card**: Monthly target vs achieved with circular progress ring and progress bar
- **Stats grid**: Estimated monthly incentive (MoM %) and YTD incentive with sparkline
- **Alert banner**: AI-driven motivational nudge ("Close 2 more leads to reach next slab!")
- **Leads summary**: Open lead count with hot/warm/cold temperature breakdown
- **Simulator CTA**: Quick-access to the what-if incentive simulator
- **Weekly chart**: Daily sales bar chart for the current week

### Performance
Deep-dive into monthly performance metrics:
- Large circular progress with color-coded thresholds (green/yellow/red)
- Target / Achieved / Gap summary
- Full incentive calculation breakdown (Base x Multiplier + Bonuses)
- Weekly vs Daily trend toggle (bar chart and area chart)
- Incentive slab table with active slab highlighted

### Incentive Breakdown
Granular view of how incentive is earned:
- Monthly estimated incentive with eligibility badge
- Calculation formula in monospace format
- By Product Type — donut chart (New Vehicles, Pre-Owned, F&I, Accessories)
- By Campaign — horizontal progress bars
- Bonus eligibility status per category

### YTD Incentive
Year-to-date incentive tracking:
- Total YTD with YoY comparison percentage
- Monthly trend area chart with optional previous-year overlay
- Interactive month selection with drill-down popup
- Monthly breakdown table (achievement bar + incentive amount)

### Leads
Full pipeline management:
- Pipeline value and potential incentive summary
- Filter by temperature: All / Hot / Warm / Cold
- Lead cards with customer, vehicle, value, commission, probability bar
- Expandable lead detail (deal value, commission, stage, probability, last contact)

### Incentive Simulator
Interactive what-if analysis:
- Select/deselect leads to simulate closing
- Real-time projection: new incentive, achievement %, slab upgrade
- Current vs Projected side-by-side comparison
- Per-lead commission and deal value visibility

### Sales Transactions
Transaction history and reporting:
- Summary stats: count, total value, average deal
- Export buttons (PDF / Excel)
- Chronological transaction list with customer, vehicle, amount, date, type

---

## API Endpoints

| Method | Endpoint                              | Description                      |
|--------|---------------------------------------|----------------------------------|
| POST   | `/api/auth/login`                     | Authenticate advisor             |
| GET    | `/api/dashboard/{advisorId}`          | Dashboard KPIs + summary         |
| GET    | `/api/leads/{advisorId}?temperature=` | Leads list (optional filter)     |
| GET    | `/api/transactions/{advisorId}?year=&month=` | Transaction history       |
| GET    | `/api/incentive/slabs`                | Incentive slab configuration     |
| GET    | `/api/incentive/eligibility/{advisorId}?year=&month=` | Bonus eligibility |
| GET    | `/api/incentive/ytd/{advisorId}?year=`| YTD monthly incentive data       |
| GET    | `/api/health`                         | Health check                     |

All endpoints return a consistent `ApiResponse<T>` envelope:
```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

---

## Database Schema

### Tables

| Table              | Description                                          |
|--------------------|------------------------------------------------------|
| `SalesAdvisors`    | Employee profiles (ID, name, role, branch, auth)     |
| `MonthlyTargets`   | Per-advisor monthly sales targets + base incentive   |
| `SalesTransactions`| Individual sale records with vehicle, amount, type   |
| `Leads`            | Lead pipeline (stage, probability, temperature)      |
| `IncentiveSlabs`   | Slab config mapping achievement % → multiplier       |
| `BonusEligibility` | Per-advisor monthly bonus category status            |
| `Campaigns`        | Campaign definitions                                 |
| `ProductCategories`| Product types with display colors                    |

### ERD (Key Relationships)

```
SalesAdvisors (1) ──► (N) MonthlyTargets
SalesAdvisors (1) ──► (N) SalesTransactions
SalesAdvisors (1) ──► (N) Leads
SalesAdvisors (1) ──► (N) BonusEligibility
```

---

## Stored Procedures

All database access is exclusively through stored procedures — no inline SQL.

| Procedure                  | Parameters                           | Returns                                    |
|----------------------------|--------------------------------------|--------------------------------------------|
| `sp_AuthenticateAdvisor`   | @EmpId, @Password                    | Advisor record or empty                    |
| `sp_GetDashboardData`      | @AdvisorId, @Year, @Month            | Combined KPIs (target, achieved, incentive, leads) |
| `sp_GetLeads`              | @AdvisorId, @Temperature (optional)  | Filtered open leads                        |
| `sp_GetTransactions`       | @AdvisorId, @Year, @Month (optional) | Transaction history                        |
| `sp_GetIncentiveSlabs`     | —                                    | All slab configurations                    |
| `sp_GetBonusEligibility`   | @AdvisorId, @Year, @Month            | Bonus category statuses                    |
| `sp_GetYtdData`            | @AdvisorId, @Year                    | Monthly breakdown with calculated incentive|

---

## Business Logic

### Incentive Calculation

```
Estimated Incentive = (Base Incentive x Multiplier) + Bonuses

Achievement % = (Achieved Sales / Monthly Target) x 100
```

### Performance Slab Multipliers

| Achievement Range | Multiplier | Classification    |
|-------------------|------------|-------------------|
| 0 – 49%          | 0.50x      | Below threshold   |
| 50 – 69%         | 1.00x      | Base performance  |
| 70 – 84%         | 1.25x      | Good performance  |
| 85 – 99%         | 1.75x      | High performance  |
| 100%+            | 2.50x      | Overachiever      |

### Lead Temperature

| Temperature | Color     | Meaning                               |
|-------------|-----------|---------------------------------------|
| Hot         | `#C75B4A` | High probability, recent engagement   |
| Warm        | `#D4A853` | Medium probability, active pipeline   |
| Cold        | `#6B8FA3` | Low probability, needs follow-up      |

### Simulator Logic

When an advisor toggles leads in the simulator:
1. New Achieved = Current Achieved + Sum of selected lead values
2. New Achievement % = New Achieved / Monthly Target x 100
3. New Multiplier = lookup from slab table
4. New Incentive = (Base x New Multiplier) + Bonuses + Sum of selected commissions
5. Gain = New Incentive - Current Incentive

---

## Design System

### Color Palette

| Token          | Hex       | Usage                    |
|----------------|-----------|--------------------------|
| Primary        | `#1B4D3E` | Brand, active states     |
| Primary Light  | `#2A7A5F` | Secondary actions        |
| Accent (Gold)  | `#D4A853` | Incentive highlights     |
| Background     | `#F8F7F4` | Screen backgrounds       |
| Card           | `#FFFFFF` | Card surfaces            |
| Text           | `#1A1A1A` | Primary text             |
| Text Secondary | `#7A7A7A` | Descriptions             |
| Text Tertiary  | `#B0B0B0` | Hints, placeholders      |
| Success        | `#2A7A5F` | Positive values          |
| Danger         | `#C75B4A` | Negative values, alerts  |

### Typography

- **Primary**: DM Sans (400, 500, 600, 700, 800)
- **Monospace**: DM Mono (formulas)

### Component Specs

- **Cards**: 20px radius, shadow `0 2px 16px rgba(0,0,0,0.06)`, 1px border
- **Buttons**: 14px radius, full-width, 16px padding
- **Chips**: 24px pill radius, toggle states
- **Inputs**: 14px radius, 1.5px border, #FAFAFA background

---

## Development Guidelines

### Backend Principles
- **No inline SQL** — every query goes through a stored procedure
- **No Entity Framework** — Dapper micro-ORM only
- **Interface-driven DI** — Controller → Service → Repository
- **DTOs for all boundaries** — no entity leakage to API responses
- **`ApiResponse<T>` wrapper** — consistent response contract

### Frontend Principles
- **TypeScript strict** — all components typed
- **Custom SVG charts** — no heavy chart library dependencies
- **Component composition** — small, reusable building blocks
- **Mock data layer** — screens work offline with `store/mockData.ts`
- **Platform-aware API client** — auto-selects correct base URL per platform

### Environments

| Environment | Database Server | API URL                     |
|-------------|-----------------|-----------------------------|
| Development | Docker localhost:1433 | http://localhost:5000  |
| Staging     | ASETIDEV02      | TBD                         |
| Production  | TBD             | TBD                         |

---

## Prototype

The interactive HTML prototype is available at [sales-advisor-app.html](sales-advisor-app.html). Open in any browser to preview all 8 screens with full interactivity.
