import axios from 'axios';
import { Platform } from 'react-native';
import type {
  Advisor, Lead, Transaction, YTDMonth, WeekData, DayData,
  ProductBreakdown, CampaignBreakdown, IncentiveSlab, BonusEligibility,
} from '../types';

// Backend runs on port 5000 (.NET API)
const API_PORT = 5000;

const BASE_URL = Platform.select({
  android: `http://10.0.2.2:${API_PORT}/api`,
  ios: `http://localhost:${API_PORT}/api`,
  default: `http://localhost:${API_PORT}/api`,
});

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Unwrap ApiResponse<T> ─────────────────────
const unwrap = <T>(res: any): T => res.data.data;

// ── Auth ──────────────────────────────────────
export const authApi = {
  login: async (loginId: string, password: string) => {
    const res = await api.post('/auth/login', { loginId, password });
    const d = res.data.advisor;
    return {
      id: d.id as number,
      empId: d.empId as string,
      name: d.name as string,
      role: d.role as string,
      branch: d.branch as string,
      avatar: d.avatar as string,
    };
  },
};

// ── Dashboard ─────────────────────────────────
export const dashboardApi = {
  get: async (advisorId: number, year?: number, month?: number): Promise<Advisor> => {
    const res = await api.get(`/dashboard/${advisorId}`, { params: { year, month } });
    const d = res.data.data;
    return {
      name: d.advisor.name,
      empId: d.advisor.empId,
      role: d.advisor.role,
      branch: d.advisor.branch,
      avatar: d.advisor.avatar,
      monthlyTarget: d.monthlyTarget,
      achieved: d.achieved,
      incentive: d.estimatedIncentive,
      ytdIncentive: 0, // populated separately
      leadsCount: d.leadsCount,
      base: d.baseIncentive,
      multiplier: d.multiplier,
      bonuses: d.bonuses,
    };
  },
};

// ── Leads ─────────────────────────────────────
export const leadsApi = {
  getAll: async (advisorId: number, temperature?: string): Promise<Lead[]> => {
    const res = await api.get(`/leads/${advisorId}`, { params: { temperature } });
    const data: any[] = unwrap(res);
    return data.map((d) => ({
      id: d.id,
      name: d.name,
      value: d.value,
      stage: d.stage,
      probability: d.probability,
      commission: d.commission,
      temperature: d.temperature,
      vehicle: d.vehicle,
      lastContact: d.lastContact,
    }));
  },
};

// ── Transactions ──────────────────────────────
export const transactionsApi = {
  getAll: async (advisorId: number, year?: number, month?: number): Promise<Transaction[]> => {
    const res = await api.get(`/transactions/${advisorId}`, { params: { year, month } });
    const data: any[] = unwrap(res);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return data.map((d) => {
      const dt = new Date(d.date);
      return {
        id: d.id,
        customer: d.customer,
        vehicle: d.vehicle,
        amount: d.amount,
        date: `${monthNames[dt.getMonth()]} ${dt.getDate()}`,
        type: d.type,
      };
    });
  },
};

// ── Incentive ─────────────────────────────────
export const incentiveApi = {
  getSlabs: async (currentPct?: number): Promise<IncentiveSlab[]> => {
    const res = await api.get('/incentive/slabs');
    const data: any[] = unwrap(res);
    return data.map((d) => ({
      range: d.label,
      multiplier: `${d.multiplier}x`,
      active: currentPct !== undefined
        ? currentPct >= d.minPercent && currentPct < d.maxPercent
        : false,
    }));
  },

  getEligibility: async (advisorId: number, year?: number, month?: number): Promise<BonusEligibility[]> => {
    const res = await api.get(`/incentive/eligibility/${advisorId}`, { params: { year, month } });
    const data: any[] = unwrap(res);
    return data.map((d) => ({ category: d.category, status: d.status }));
  },

  getYTD: async (advisorId: number, year?: number): Promise<YTDMonth[]> => {
    const res = await api.get(`/incentive/ytd/${advisorId}`, { params: { year } });
    return unwrap(res);
  },

  getByProduct: async (advisorId: number, year?: number, month?: number): Promise<ProductBreakdown[]> => {
    const res = await api.get(`/incentive/byproduct/${advisorId}`, { params: { year, month } });
    return unwrap(res);
  },

  getByCampaign: async (advisorId: number, year?: number, month?: number): Promise<CampaignBreakdown[]> => {
    const res = await api.get(`/incentive/bycampaign/${advisorId}`, { params: { year, month } });
    return unwrap(res);
  },
};

// ── Performance ───────────────────────────────
export const performanceApi = {
  getWeekly: async (advisorId: number, year?: number, month?: number): Promise<WeekData[]> => {
    const res = await api.get(`/performance/weekly/${advisorId}`, { params: { year, month } });
    return unwrap(res);
  },

  getDaily: async (advisorId: number, year?: number, month?: number): Promise<DayData[]> => {
    const res = await api.get(`/performance/daily/${advisorId}`, { params: { year, month } });
    return unwrap(res);
  },
};

export default api;
