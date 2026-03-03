import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, shadows } from '../theme';
import { Card } from '../components/cards/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { TempIndicator } from '../components/common/TempIndicator';
import { SectionTitle } from '../components/common/SectionTitle';
import { advisor, leads } from '../store/mockData';
import { formatFull, formatCompact, calcPercent, getMultiplier } from '../utils/formatters';

export const SimulatorScreen: React.FC = () => {
  const [selected, setSelected] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const picked = leads.filter((l) => selected[l.id]);
  const addVal = picked.reduce((s, l) => s + l.value, 0);
  const addComm = picked.reduce((s, l) => s + l.commission, 0);
  const newAch = advisor.achieved + addVal;
  const newPct = calcPercent(newAch, advisor.monthlyTarget);
  const curPct = calcPercent(advisor.achieved, advisor.monthlyTarget);
  const curMult = getMultiplier(curPct);
  const newMult = getMultiplier(newPct);
  const newInc = Math.round(advisor.base * newMult + advisor.bonuses + addComm);
  const gain = newInc - advisor.incentive;
  const count = picked.length;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Incentive Simulator</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {count > 0 ? (
          <LinearGradient
            colors={['#1B4D3E', '#234E42']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.projectionCard}
          >
            <Text style={styles.projLabel}>
              PROJECTED: {count} LEAD{count > 1 ? 'S' : ''} CLOSED
            </Text>
            <View style={styles.projRow}>
              <View>
                <Text style={styles.projSubLabel}>New Incentive</Text>
                <Text style={styles.projAmount}>AED {formatFull(newInc)}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.projSubLabel}>Achievement</Text>
                <Text style={styles.projPct}>{newPct}%</Text>
              </View>
            </View>
            <ProgressBar pct={newPct} height={4} color={colors.accent} bg="rgba(255,255,255,0.12)" />
            <View style={styles.gainBox}>
              <Feather name="trending-up" size={16} color="#fff" />
              <View>
                <Text style={styles.gainAmount}>+AED {formatFull(gain)} additional incentive</Text>
                <Text style={styles.gainSlab}>
                  {newMult > curMult ? `Threshold upgrade: ${curMult}x \u2192 ${newMult}x` : 'Same threshold'}
                </Text>
              </View>
            </View>
          </LinearGradient>
        ) : (
          <Card style={{ alignItems: 'center', padding: 24 }}>
            <View style={styles.emptyIcon}>
              <Feather name="crosshair" size={24} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>Select leads to simulate</Text>
            <Text style={styles.emptySub}>Toggle leads below to project incentive impact</Text>
          </Card>
        )}

        {count > 0 && (
          <View style={styles.compareRow}>
            <Card style={styles.compareCard}>
              <Text style={styles.compareLabelCurrent}>CURRENT</Text>
              <Text style={styles.compareValue}>{curPct}%</Text>
              <Text style={styles.compareSub}>AED {formatFull(advisor.incentive)}</Text>
            </Card>
            <Card style={styles.compareCardProjected}>
              <Text style={styles.compareLabelProjected}>PROJECTED</Text>
              <Text style={[styles.compareValue, { color: colors.success }]}>{newPct}%</Text>
              <Text style={[styles.compareSub, { color: colors.success }]}>AED {formatFull(newInc)}</Text>
            </Card>
          </View>
        )}

        <SectionTitle title="Select Leads" />
        {leads.map((lead) => {
          const isOn = !!selected[lead.id];
          return (
            <TouchableOpacity
              key={lead.id}
              style={[styles.leadRow, isOn && styles.leadRowActive]}
              onPress={() => toggle(lead.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, isOn && styles.checkboxActive]}>
                {isOn && <Feather name="check" size={14} color="#fff" />}
              </View>
              <View style={styles.leadInfo}>
                <View style={styles.leadNameRow}>
                  <Text style={styles.leadName} numberOfLines={1}>{lead.name}</Text>
                  <TempIndicator temperature={lead.temperature} />
                </View>
                <Text style={styles.leadSub}>{lead.vehicle} · {lead.probability}% prob.</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.leadValue}>AED {formatCompact(lead.value)}</Text>
                <Text style={styles.leadComm}>+{formatFull(lead.commission)}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 16 }} />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 16 },

  projectionCard: {
    borderRadius: borderRadius.xxl, padding: 20, marginBottom: 12,
  },
  projLabel: { fontSize: 10, color: 'rgba(255,255,255,0.55)', fontWeight: '600', letterSpacing: 1.2, marginBottom: 12 },
  projRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 },
  projSubLabel: { fontSize: 10, color: 'rgba(255,255,255,0.45)', marginBottom: 4 },
  projAmount: { fontSize: 28, fontWeight: '700', color: '#fff', letterSpacing: -0.5 },
  projPct: { fontSize: 24, fontWeight: '700', color: '#fff' },
  gainBox: {
    marginTop: 14, padding: 12, paddingHorizontal: 14,
    borderRadius: borderRadius.md, backgroundColor: 'rgba(255,255,255,0.10)',
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  gainAmount: { fontSize: 13, fontWeight: '600', color: '#fff' },
  gainSlab: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 },

  emptyIcon: {
    width: 48, height: 48, borderRadius: borderRadius.lg,
    backgroundColor: colors.primary + '0A', alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4, color: colors.text },
  emptySub: { fontSize: 12, color: colors.textTertiary, textAlign: 'center' },

  compareRow: { flexDirection: 'row', gap: 10, marginBottom: 4 },
  compareCard: { flex: 1, padding: 12, alignItems: 'center' },
  compareCardProjected: {
    flex: 1, padding: 12, alignItems: 'center',
    backgroundColor: colors.success + '06',
    borderWidth: 1, borderColor: colors.success + '18',
  },
  compareLabelCurrent: { fontSize: 9, color: colors.textTertiary, fontWeight: '600', letterSpacing: 0.8, marginBottom: 4 },
  compareLabelProjected: { fontSize: 9, color: colors.success, fontWeight: '600', letterSpacing: 0.8, marginBottom: 4 },
  compareValue: { fontSize: 16, fontWeight: '700', color: colors.textSecondary },
  compareSub: { fontSize: 11, color: colors.textTertiary, marginTop: 2 },

  leadRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.card, borderRadius: borderRadius.lg,
    padding: 12, paddingHorizontal: 14, marginBottom: 6,
    borderWidth: 1, borderColor: colors.border,
    ...shadows.card,
  },
  leadRowActive: {
    backgroundColor: colors.primary + '04',
    borderColor: colors.primary + '20',
  },
  checkbox: {
    width: 24, height: 24, borderRadius: borderRadius.sm,
    borderWidth: 1.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary, borderColor: colors.primary,
  },
  leadInfo: { flex: 1, minWidth: 0 },
  leadNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  leadName: { fontSize: 12, fontWeight: '500', flexShrink: 1 },
  leadSub: { fontSize: 10, color: colors.textTertiary },
  leadValue: { fontSize: 12, fontWeight: '600' },
  leadComm: { fontSize: 10, color: colors.accent, fontWeight: '500' },
});
