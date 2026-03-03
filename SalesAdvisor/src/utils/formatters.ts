export const formatCompact = (n: number): string => {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e4) return Math.round(n / 1e3) + 'K';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n.toLocaleString();
};

export const formatFull = (n: number): string => {
  return n.toLocaleString();
};

export const calcPercent = (achieved: number, target: number): number => {
  if (target === 0) return 0;
  return Math.round((achieved / target) * 100);
};

export const getMultiplier = (pct: number): number => {
  if (pct >= 100) return 2.5;
  if (pct >= 85) return 1.75;
  if (pct >= 70) return 1.25;
  if (pct >= 50) return 1;
  return 0.5;
};

export const getSlabLabel = (pct: number): string => {
  if (pct >= 100) return '100%+ = 2.5x';
  if (pct >= 85) return '85-100% = 1.75x';
  if (pct >= 70) return '70-85% = 1.25x';
  if (pct >= 50) return '50-70% = 1.0x';
  return '0-50% = 0.5x';
};
