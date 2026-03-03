import axios from 'axios';
import { Platform } from 'react-native';

// Use 10.0.2.2 for Android emulator, localhost for iOS/web
const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3000/api',
  ios: 'http://localhost:3000/api',
  default: 'http://localhost:3000/api',
});

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: (empId: string, password: string) =>
    api.post('/auth/login', { empId, password }),
};

export const dashboardApi = {
  get: (advisorId: number) =>
    api.get(`/dashboard/${advisorId}`),
};

export const leadsApi = {
  getAll: (advisorId: number, temperature?: string) =>
    api.get(`/leads/${advisorId}`, { params: { temperature } }),
};

export const transactionsApi = {
  getAll: (advisorId: number, year?: number, month?: number) =>
    api.get(`/transactions/${advisorId}`, { params: { year, month } }),
};

export const incentiveApi = {
  getSlabs: () => api.get('/incentive/slabs'),
  getEligibility: (advisorId: number, year?: number, month?: number) =>
    api.get(`/incentive/eligibility/${advisorId}`, { params: { year, month } }),
  getYTD: (advisorId: number, year?: number) =>
    api.get(`/incentive/ytd/${advisorId}`, { params: { year } }),
};

export default api;
