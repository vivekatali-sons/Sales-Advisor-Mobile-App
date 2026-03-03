import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors, borderRadius } from '../theme';
import { Card } from '../components/cards/Card';
import { CircularProgress } from '../components/common/CircularProgress';
import { ProgressBar } from '../components/common/ProgressBar';
import { BarChart } from '../components/charts/BarChart';
import { AreaChart } from '../components/charts/AreaChart';
import { Chip } from '../components/common/Chip';
import { SectionTitle } from '../components/common/SectionTitle';
import { advisor, weeklyData, dailyData, incentiveSlabs } from '../store/mockData';
import { formatCompact, formatFull, calcPercent } from '../utils/formatters';

export const PerformanceScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const pct = calcPercent(advisor.achieved, advisor.monthlyTarget);
  const gap = advisor.monthlyTarget - advisor.achieved;
  const [mode, setMode] = useState<'weekly' | 'daily'>('weekly');
  const pctColor = pct >= 80 ? colors.success : pct >= 60 ? colors.warning : colors.danger;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Monthly Performance</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Card style={{ alignItems: 'center', padding: 24 }}>
          <CircularProgress pct={pct} size={130} strokeWidth={8} color={pctColor}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.ringPct}>{pct}%</Text>
              <Text style={styles.ringLabel}>ACHIEVED</Text>
            </View>
          </CircularProgress>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Target</Text>
              <Text style={styles.statVal}>AED {formatCompact(advisor.monthlyTarget)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Achieved</Text>
              <Text style={[styles.statVal, { color: colors.success }]}>AED {formatCompact(advisor.achieved)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Gap</Text>
              <Text style={[styles.statVal, { color: colors.danger }]}>AED {formatCompact(gap)}</Text>
            </View>
          </View>
        </Card>

        <SectionTitle title="Incentive Calculation" />
        <Card>
          <View style={styles.calcHeader}>
            <Text style={styles.calcLabel}>Estimated Incentive</Text>
            <Text style={styles.calcValue}>AED {formatFull(advisor.incentive)}</Text>
          </View>
          {[
            { label: 'Base Incentive', value: `AED ${formatFull(advisor.base)}`, desc: `${pct}% achievement slab` },
            { label: 'Performance Multiplier', value: `x${advisor.multiplier}`, desc: 'Slab: 70-85% = 1.25x' },
            { label: 'Bonuses', value: `AED ${formatFull(advisor.bonuses)}`, desc: 'F&I + Accessories' },
          ].map((item, i) => (
            <View key={i} style={[styles.calcRow, i > 0 && styles.calcRowBorder]}>
              <View>
                <Text style={styles.calcRowLabel}>{item.label}</Text>
                <Text style={styles.calcRowDesc}>{item.desc}</Text>
              </View>
              <Text style={styles.calcRowValue}>{item.value}</Text>
            </View>
          ))}
          <View style={styles.formulaBox}>
            <Feather name="info" size={14} color={colors.accent} />
            <Text style={styles.formulaText}>
              (Base x Multiplier) + Bonuses = AED {formatFull(advisor.incentive)}
            </Text>
          </View>
        </Card>

        <SectionTitle title="Performance Trend" />
        <View style={styles.chipRow}>
          <Chip label="Weekly" active={mode === 'weekly'} onPress={() => setMode('weekly')} />
          <Chip label="Daily" active={mode === 'daily'} onPress={() => setMode('daily')} />
        </View>
        <Card style={{ paddingHorizontal: 12, paddingVertical: 14 }}>
          {mode === 'weekly' ? (
            <BarChart
              data={weeklyData.map((d) => ({ label: d.week, value: d.achieved, target: d.target }))}
              height={150}
              showTarget
            />
          ) : (
            <AreaChart
              data={dailyData.map((d) => ({ label: d.day, value: d.value }))}
              height={150}
            />
          )}
        </Card>

        <SectionTitle title="Incentive Slabs" />
        <Card>
          {incentiveSlabs.map((slab, i) => (
            <View key={i} style={[styles.slabRow, slab.active && styles.slabActive]}>
              <View style={styles.slabLeft}>
                {slab.active && <View style={styles.slabDot} />}
                <Text style={[styles.slabRange, slab.active && styles.slabActiveText]}>{slab.range}</Text>
              </View>
              <Text style={[styles.slabMult, slab.active && styles.slabActiveText]}>{slab.multiplier}</Text>
            </View>
          ))}
        </Card>

        <View style={{ height: 16 }} />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8,
  },
  backBtn: { width: 30 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 16 },

  ringPct: { fontSize: 28, fontWeight: '700', color: colors.primary, letterSpacing: -0.5 },
  ringLabel: { fontSize: 10, color: colors.textTertiary, fontWeight: '600', letterSpacing: 1 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, width: '100%' },
  statItem: { alignItems: 'center' },
  statLabel: { fontSize: 10, color: colors.textTertiary, fontWeight: '500', marginBottom: 4 },
  statVal: { fontSize: 15, fontWeight: '700', color: colors.text },
  divider: { width: 1, backgroundColor: colors.border },

  calcHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  calcLabel: { fontSize: 13, fontWeight: '500', color: colors.textSecondary },
  calcValue: { fontSize: 18, fontWeight: '700', color: colors.primary },
  calcRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  calcRowBorder: { borderTopWidth: 1, borderTopColor: colors.border },
  calcRowLabel: { fontSize: 13, fontWeight: '500' },
  calcRowDesc: { fontSize: 11, color: colors.textTertiary, marginTop: 1 },
  calcRowValue: { fontSize: 14, fontWeight: '600', color: colors.primary },

  formulaBox: {
    marginTop: 10, padding: 10, paddingHorizontal: 14,
    borderRadius: borderRadius.md, backgroundColor: colors.accent + '0A',
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  formulaText: { fontSize: 11, color: colors.textSecondary, flex: 1 },

  chipRow: { flexDirection: 'row', gap: 6, marginBottom: 12 },

  slabRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 10, paddingHorizontal: 12, borderRadius: borderRadius.md, marginBottom: 3,
    borderWidth: 1, borderColor: 'transparent',
  },
  slabActive: {
    backgroundColor: colors.primary + '06',
    borderColor: colors.primary + '20',
  },
  slabLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  slabDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.primary },
  slabRange: { fontSize: 13, fontWeight: '400', color: colors.textSecondary },
  slabMult: { fontSize: 13, fontWeight: '600', color: colors.textTertiary },
  slabActiveText: { color: colors.primary, fontWeight: '600' },
});
