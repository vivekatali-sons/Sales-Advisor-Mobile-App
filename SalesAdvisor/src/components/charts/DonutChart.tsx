import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface DonutChartProps {
  data: { value: number; color: string }[];
  size?: number;
  thickness?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 140,
  thickness = 25,
}) => {
  const radius = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const total = data.reduce((s, d) => s + d.value, 0);

  let cumAngle = -90;
  const segments = data.map((d) => {
    const angle = (d.value / total) * 360;
    const startAngle = cumAngle;
    cumAngle += angle;
    const endAngle = cumAngle;

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const start = {
      x: cx + radius * Math.cos(toRad(startAngle)),
      y: cy + radius * Math.sin(toRad(startAngle)),
    };
    const end = {
      x: cx + radius * Math.cos(toRad(endAngle)),
      y: cy + radius * Math.sin(toRad(endAngle)),
    };
    const largeArc = angle > 180 ? 1 : 0;
    const path = `M${start.x},${start.y} A${radius},${radius} 0 ${largeArc} 1 ${end.x},${end.y}`;

    return { path, color: d.color };
  });

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        {segments.map((seg, i) => (
          <Path
            key={i}
            d={seg.path}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeLinecap="round"
          />
        ))}
      </Svg>
    </View>
  );
};
