/**
 * Design System Tokens
 * Strict 8pt grid. Controlled typography scale. Enterprise palette.
 */

export const colors = {
  // Backgrounds
  bg: '#F5F5F3',
  card: '#FFFFFF',

  // Primary palette (Deep Emerald)
  primary: '#1B4D3E',
  primaryLight: '#2A7A5F',
  primaryMuted: '#3D8B6E',

  // Accent (Controlled Gold)
  accent: '#C5993E',
  accentLight: '#E8D5A8',

  // Text hierarchy (6 grayscale levels)
  text: '#111111',
  textSecondary: '#555555',
  textTertiary: '#999999',
  textMuted: '#BBBBBB',
  textDisabled: '#D5D5D5',

  // Borders & surfaces
  border: '#E8E8E6',
  borderLight: '#F0F0EE',
  surface: '#FAFAF8',

  // Semantic
  success: '#2A7A5F',
  warning: '#C5993E',
  danger: '#C0503E',

  // Lead temperatures
  hot: '#C0503E',
  warm: '#C5993E',
  cold: '#5B8FA3',
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
};

// Strict 8pt grid
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
};

// Tighter geometry
export const borderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 14,
  xxl: 16,
  pill: 20,
  full: 999,
};

// Typography tokens
export const typography = {
  fontFamily: 'DMSans_400Regular',
  fontFamilyMedium: 'DMSans_500Medium',
  fontFamilySemiBold: 'DMSans_600SemiBold',
  fontFamilyBold: 'DMSans_700Bold',
  fontFamilyExtraBold: 'DMSans_800ExtraBold',
  fontFamilyMono: 'DMMono_400Regular',
  fontFamilyMonoMedium: 'DMMono_500Medium',
};
