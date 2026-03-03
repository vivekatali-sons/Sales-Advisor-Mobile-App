import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius } from '../../theme';
import type { EligibilityStatus } from '../../types';

interface BadgeProps {
  status: EligibilityStatus;
}

const statusConfig: Record<EligibilityStatus, { bg: string; text: string }> = {
  Eligible: { bg: colors.success + '12', text: colors.success },
  'Almost Eligible': { bg: colors.warning + '14', text: colors.warning },
  'Not Eligible': { bg: colors.danger + '12', text: colors.danger },
};

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const cfg = statusConfig[status];
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <View style={[styles.dot, { backgroundColor: cfg.text }]} />
      <Text style={[styles.text, { color: cfg.text }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
