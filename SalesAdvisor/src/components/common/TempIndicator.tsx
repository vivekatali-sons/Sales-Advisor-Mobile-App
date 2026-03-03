import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius } from '../../theme';
import type { LeadTemperature } from '../../types';

interface TempIndicatorProps {
  temperature: LeadTemperature;
  size?: number;
  showLabel?: boolean;
}

const tempColors: Record<LeadTemperature, string> = {
  hot: colors.hot,
  warm: colors.warm,
  cold: colors.cold,
};

export const TempIndicator: React.FC<TempIndicatorProps> = ({
  temperature,
  size = 5,
  showLabel = true,
}) => {
  const color = tempColors[temperature];

  if (!showLabel) {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color }} />
    );
  }

  return (
    <View style={[styles.pill, { backgroundColor: color + '14' }]}>
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color }} />
      <Text style={[styles.label, { color }]}>{temperature.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.xs,
  },
  label: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
});
