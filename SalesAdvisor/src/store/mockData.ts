import type {
  Advisor, YTDMonth, WeekData, DayData,
  ProductBreakdown, CampaignBreakdown, Lead, Transaction,
  IncentiveSlab, BonusEligibility,
} from '../types';

export const advisor: Advisor = {
  name: 'Sohail Iqbal',
  empId: 'SA-2847',
  role: 'Senior Sales Advisor',
  branch: 'Downtown Premium',
  avatar: 'SI',
  monthlyTarget: 850000,
  achieved: 612000,
  incentive: 18450,
  ytdIncentive: 142800,
  leadsCount: 12,
  base: 12000,
  multiplier: 1.25,
  bonuses: 3450,
};

export const ytdData: YTDMonth[] = [
  { month: 'Jan', incentive: 14200, target: 800000, achieved: 720000 },
  { month: 'Feb', incentive: 16800, target: 800000, achieved: 780000 },
  { month: 'Mar', incentive: 12400, target: 850000, achieved: 680000 },
  { month: 'Apr', incentive: 19200, target: 850000, achieved: 820000 },
  { month: 'May', incentive: 21500, target: 900000, achieved: 900000 },
  { month: 'Jun', incentive: 15600, target: 900000, achieved: 740000 },
  { month: 'Jul', incentive: 18900, target: 850000, achieved: 790000 },
  { month: 'Aug', incentive: 17300, target: 850000, achieved: 760000 },
  { month: 'Sep', incentive: 18450, target: 850000, achieved: 612000 },
];

export const prevYearData: number[] = [
  11200, 13500, 10800, 15200, 17800, 14200, 16100, 15400, 14800, 16900, 19200, 22100,
];

export const weeklyData: WeekData[] = [
  { week: 'W1', target: 212500, achieved: 185000 },
  { week: 'W2', target: 212500, achieved: 198000 },
  { week: 'W3', target: 212500, achieved: 142000 },
  { week: 'W4', target: 212500, achieved: 87000 },
];

export const dailyData: DayData[] = [
  { day: 'Mon', value: 42000 },
  { day: 'Tue', value: 28000 },
  { day: 'Wed', value: 55000 },
  { day: 'Thu', value: 31000 },
  { day: 'Fri', value: 48000 },
  { day: 'Sat', value: 62000 },
  { day: 'Sun', value: 12000 },
];

export const byProduct: ProductBreakdown[] = [
  { name: 'New Vehicles', value: 8200, color: '#1B4D3E' },
  { name: 'Pre-Owned', value: 4800, color: '#2A7A5F' },
  { name: 'F&I Products', value: 3200, color: '#D4A853' },
  { name: 'Accessories', value: 2250, color: '#6B8FA3' },
];

export const byCampaign: CampaignBreakdown[] = [
  { name: 'Q3 Push', value: 6500 },
  { name: 'Loyalty Prog.', value: 4200 },
  { name: 'Fleet Sales', value: 3800 },
  { name: 'Digital Leads', value: 3950 },
];

export const leads: Lead[] = [
  { id: 1, name: 'Ahmed Al Rashid', value: 185000, stage: 'Negotiation', probability: 85, commission: 4625, temperature: 'hot', vehicle: 'Porsche Cayenne', lastContact: '2 hours ago' },
  { id: 2, name: 'Sarah Mitchell', value: 142000, stage: 'Test Drive', probability: 70, commission: 3550, temperature: 'hot', vehicle: 'Audi Q7', lastContact: '1 day ago' },
  { id: 3, name: 'Omar Khalil', value: 95000, stage: 'Proposal Sent', probability: 60, commission: 2375, temperature: 'warm', vehicle: 'VW Tiguan', lastContact: '3 days ago' },
  { id: 4, name: 'Lisa Chen', value: 220000, stage: 'Negotiation', probability: 75, commission: 5500, temperature: 'hot', vehicle: 'Porsche 911', lastContact: '5 hours ago' },
  { id: 5, name: 'James Wilson', value: 68000, stage: 'Initial Contact', probability: 30, commission: 1700, temperature: 'cold', vehicle: 'Skoda Octavia', lastContact: '1 week ago' },
  { id: 6, name: 'Fatima Hassan', value: 115000, stage: 'Test Drive', probability: 65, commission: 2875, temperature: 'warm', vehicle: 'Audi A6', lastContact: '2 days ago' },
  { id: 7, name: 'David Park', value: 78000, stage: 'Follow Up', probability: 40, commission: 1950, temperature: 'warm', vehicle: 'VW Golf R', lastContact: '4 days ago' },
  { id: 8, name: 'Nina Patel', value: 198000, stage: 'Negotiation', probability: 80, commission: 4950, temperature: 'hot', vehicle: 'Porsche Macan', lastContact: '6 hours ago' },
  { id: 9, name: 'Carlos Rivera', value: 52000, stage: 'Initial Contact', probability: 20, commission: 1300, temperature: 'cold', vehicle: 'MG ZS EV', lastContact: '2 weeks ago' },
  { id: 10, name: 'Emma Thompson', value: 165000, stage: 'Proposal Sent', probability: 55, commission: 4125, temperature: 'warm', vehicle: 'Audi e-tron GT', lastContact: '3 days ago' },
  { id: 11, name: 'Raj Mehta', value: 88000, stage: 'Follow Up', probability: 45, commission: 2200, temperature: 'warm', vehicle: 'Skoda Superb', lastContact: '5 days ago' },
  { id: 12, name: 'Sophie Laurent', value: 275000, stage: 'Test Drive', probability: 50, commission: 6875, temperature: 'warm', vehicle: 'Porsche Taycan', lastContact: '1 day ago' },
];

export const transactions: Transaction[] = [
  { id: 1, customer: 'Michael Brown', vehicle: 'Audi Q5', amount: 82000, date: 'Sep 28', type: 'New' },
  { id: 2, customer: 'Anna Kowalski', vehicle: 'Porsche Macan', amount: 95000, date: 'Sep 25', type: 'New' },
  { id: 3, customer: 'Yuki Tanaka', vehicle: 'VW ID.4', amount: 58000, date: 'Sep 22', type: 'New' },
  { id: 4, customer: 'Robert Kim', vehicle: 'Audi A4 (CPO)', amount: 42000, date: 'Sep 20', type: 'Pre-Owned' },
  { id: 5, customer: 'Priya Sharma', vehicle: 'Skoda Kodiaq', amount: 48000, date: 'Sep 18', type: 'New' },
  { id: 6, customer: 'Thomas Weber', vehicle: 'Porsche Cayenne', amount: 125000, date: 'Sep 15', type: 'New' },
  { id: 7, customer: 'Maria Santos', vehicle: 'VW Tiguan', amount: 52000, date: 'Sep 12', type: 'New' },
  { id: 8, customer: 'John O\'Brien', vehicle: 'MG HS+', amount: 38000, date: 'Sep 8', type: 'New' },
  { id: 9, customer: 'Wei Zhang', vehicle: 'Audi e-tron (CPO)', amount: 72000, date: 'Sep 5', type: 'Pre-Owned' },
];

export const incentiveSlabs: IncentiveSlab[] = [
  { range: '0 – 50%', multiplier: '0.5x', active: false },
  { range: '50 – 70%', multiplier: '1.0x', active: false },
  { range: '70 – 85%', multiplier: '1.25x', active: true },
  { range: '85 – 100%', multiplier: '1.75x', active: false },
  { range: '100%+', multiplier: '2.5x', active: false },
];

export const bonusEligibility: BonusEligibility[] = [
  { category: 'New Vehicle Bonus', status: 'Eligible' },
  { category: 'Volume Accelerator', status: 'Almost Eligible' },
  { category: 'Customer Satisfaction', status: 'Eligible' },
  { category: 'F&I Penetration', status: 'Not Eligible' },
];
