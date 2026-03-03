import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface ProgressBarProps {
  pct: number;
  height?: number;
  color?: string;
  bg?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  pct,
  height = 8,
  color = colors.primary,
  bg = colors.border,
}) => (
  <View style={[styles.track, { height, backgroundColor: bg, borderRadius: height / 2 }]}>
    <View
      style={[
        styles.fill,
        {
          height,
          width: `${Math.min(pct, 100)}%`,
          backgroundColor: color,
          borderRadius: height / 2,
        },
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
