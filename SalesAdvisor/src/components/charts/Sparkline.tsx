import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../theme';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 120,
  height = 30,
  color = colors.primary,
}) => {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * (height - 4) - 2,
  }));

  const line = 'M' + points.map((p) => `${p.x},${p.y}`).join(' L');
  const area = `${line} L${width},${height} L0,${height} Z`;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        <Path d={area} fill={color} opacity={0.1} />
        <Path d={line} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      </Svg>
    </View>
  );
};
