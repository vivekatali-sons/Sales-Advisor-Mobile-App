import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { colors } from '../../theme';
import { formatCompact } from '../../utils/formatters';

interface AreaChartProps {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  color?: string;
  showDots?: boolean;
  fillOpacity?: number;
  prevData?: number[];
  showPrev?: boolean;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  width = 320,
  height = 160,
  color = colors.primary,
  showDots = true,
  fillOpacity = 0.1,
  prevData,
  showPrev = false,
}) => {
  const allVals = [...data.map((d) => d.value), ...(showPrev && prevData ? prevData : [])];
  const max = Math.max(...allVals) * 1.2;
  const min = Math.min(...allVals) * 0.8;
  const range = max - min || 1;
  const padX = 10;
  const padY = 10;
  const chartW = width - padX * 2;
  const chartH = height - 30 - padY;

  const toPoint = (val: number, i: number, len: number) => ({
    x: padX + (i / (len - 1)) * chartW,
    y: padY + chartH - ((val - min) / range) * chartH,
  });

  const pts = data.map((d, i) => toPoint(d.value, i, data.length));
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${pts[pts.length - 1].x},${padY + chartH} L${pts[0].x},${padY + chartH} Z`;

  let prevLine = '';
  if (showPrev && prevData) {
    const prevPts = prevData.slice(0, data.length).map((v, i) => toPoint(v, i, data.length));
    prevLine = prevPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  }

  const gridLines = Array.from({ length: 4 }, (_, i) => ({
    y: padY + i * (chartH / 3),
    label: formatCompact(Math.round(max - i * (range / 3))),
  }));

  return (
    <View>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {gridLines.map((g, i) => (
          <React.Fragment key={i}>
            <Line
              x1={padX} y1={g.y} x2={width - padX} y2={g.y}
              stroke={colors.border} strokeDasharray="4,4"
            />
            <SvgText x={padX} y={g.y - 4} fontSize={9} fill={colors.textTertiary}>
              {g.label}
            </SvgText>
          </React.Fragment>
        ))}
        <Path d={areaPath} fill={color} opacity={fillOpacity} />
        <Path d={linePath} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {showPrev && prevData && (
          <Path d={prevLine} fill="none" stroke={colors.textTertiary} strokeWidth={1.5} strokeDasharray="4,4" strokeLinecap="round" />
        )}
        {showDots && pts.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={4} fill={color} stroke="#fff" strokeWidth={2} />
        ))}
        {data.map((d, i) => {
          const p = toPoint(d.value, i, data.length);
          return (
            <SvgText key={i} x={p.x} y={height - 6} textAnchor="middle" fontSize={10} fill={colors.textTertiary}>
              {d.label}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
};
