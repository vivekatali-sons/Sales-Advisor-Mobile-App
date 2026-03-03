export type LeadTemperature = 'hot' | 'warm' | 'cold';

export type LeadStage =
  | 'Initial Contact'
  | 'Follow Up'
  | 'Test Drive'
  | 'Proposal Sent'
  | 'Negotiation';

export type EligibilityStatus = 'Eligible' | 'Almost Eligible' | 'Not Eligible';

export type TransactionType = 'New' | 'Pre-Owned';

export interface Advisor {
  name: string;
  empId: string;
  role: string;
  branch: string;
  avatar: string;
  monthlyTarget: number;
  achieved: number;
  incentive: number;
  ytdIncentive: number;
  leadsCount: number;
  base: number;
  multiplier: number;
  bonuses: number;
}

export interface YTDMonth {
  month: string;
  incentive: number;
  target: number;
  achieved: number;
}

export interface WeekData {
  week: string;
  target: number;
  achieved: number;
}

export interface DayData {
  day: string;
  value: number;
}

export interface ProductBreakdown {
  name: string;
  value: number;
  color: string;
}

export interface CampaignBreakdown {
  name: string;
  value: number;
}

export interface Lead {
  id: number;
  name: string;
  value: number;
  stage: LeadStage;
  probability: number;
  commission: number;
  temperature: LeadTemperature;
  vehicle: string;
  lastContact: string;
}

export interface Transaction {
  id: number;
  customer: string;
  vehicle: string;
  amount: number;
  date: string;
  type: TransactionType;
}

export interface IncentiveSlab {
  range: string;
  multiplier: string;
  active: boolean;
}

export interface BonusEligibility {
  category: string;
  status: EligibilityStatus;
}
