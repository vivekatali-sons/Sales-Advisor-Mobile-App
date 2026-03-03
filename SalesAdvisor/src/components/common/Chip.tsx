import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, borderRadius } from '../../theme';

interface ChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.chip, active ? styles.active : styles.inactive]}
    activeOpacity={0.7}
  >
    <Text style={[styles.text, active ? styles.activeText : styles.inactiveText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: borderRadius.md,
  },
  active: {
    backgroundColor: colors.primary,
  },
  inactive: {
    backgroundColor: colors.primary + '0A',
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: colors.textSecondary,
  },
});
