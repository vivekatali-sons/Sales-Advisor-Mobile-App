import React, { createContext, useContext, useState } from 'react';

interface AppState {
  advisorId: number;
  year: number;
  month: number;
  monthName: string;
}

interface AppContextType {
  state: AppState;
  setAdvisorId: (id: number) => void;
  setPeriod: (year: number, month: number) => void;
}

const MONTH_NAMES = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    advisorId: 0,
    year: 2025,
    month: 9,
    monthName: 'September',
  });

  const setAdvisorId = (id: number) => setState((s) => ({ ...s, advisorId: id }));

  const setPeriod = (year: number, month: number) =>
    setState((s) => ({ ...s, year, month, monthName: MONTH_NAMES[month] || '' }));

  return (
    <AppContext.Provider value={{ state, setAdvisorId, setPeriod }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};
