import React, { useEffect, useRef, useState } from 'react';
import { Text, TextStyle } from 'react-native';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  style?: TextStyle;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 800,
  style,
}) => {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(Date.now());
  const rafRef = useRef<number>();

  useEffect(() => {
    startRef.current = Date.now();
    const animate = () => {
      const progress = Math.min((Date.now() - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return (
    <Text style={style}>
      {prefix}{display.toLocaleString()}{suffix}
    </Text>
  );
};
