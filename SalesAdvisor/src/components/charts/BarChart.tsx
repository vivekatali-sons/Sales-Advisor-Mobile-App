import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { colors } from '../../theme';

interface BarChartProps {
  data: { label: string; value: number; target?: number }[];
  height?: number;
  color?: string;
  highlightIndex?: number;
  showTarget?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 130,
  color = colors.primary,
  highlightIndex = -1,
  showTarget = false,
}) => {
  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.value, showTarget ? d.target || 0 : 0))
  ) * 1.15;
  const chartHeight = height - 24;

  return (
    <View style={{ height }}>
      <View style={styles.barsContainer}>
        {data.map((d, i) => {
          const barH = (d.value / maxVal) * chartHeight;
          const tgtH = showTarget && d.target ? (d.target / maxVal) * chartHeight : 0;
          const barColor =
            highlightIndex >= 0
              ? i === highlightIndex
                ? color
                : color + '30'
              : color;

          return (
            <View key={i} style={styles.barGroup}>
              <View style={{ height: chartHeight, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
                {showTarget && (
                  <View
                    style={[
                      styles.bar,
                      { height: tgtH, backgroundColor: colors.primary + '20' },
                    ]}
                  />
                )}
                <View
                  style={[styles.bar, { height: barH, backgroundColor: barColor }]}
                />
              </View>
              <Text style={styles.label}>{d.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flex: 1,
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 28,
    borderRadius: 4,
    minHeight: 2,
  },
  label: {
    fontSize: 10,
    color: '#B0B0B0',
    marginTop: 6,
  },
});
