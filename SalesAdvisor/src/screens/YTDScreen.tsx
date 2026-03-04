import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors, borderRadius } from '../theme';
import { Card } from '../components/cards/Card';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { ProgressBar } from '../components/common/ProgressBar';
import { AreaChart } from '../components/charts/AreaChart';
import { Chip } from '../components/common/Chip';
import { SectionTitle } from '../components/common/SectionTitle';
import { useApp } from '../context/AppContext';
import { incentiveApi } from '../api/client';
import { formatFull, formatCompact, calcPercent } from '../utils/formatters';
import type { YTDMonth } from '../types';

export const YTDScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { state: { advisorId, year } } = useApp();

  const [ytdData, setYtdData] = useState<YTDMonth[]>([]);
  const [prevYearData, setPrevYearData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [showPrev, setShowPrev] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [currentYtd, prevYtd] = await Promise.all([
        incentiveApi.getYTD(advisorId, year),
        incentiveApi.getYTD(advisorId, year - 1),
      ]);
      setYtdData(currentYtd);
      setPrevYearData(prevYtd.map((d) => d.incentive));
    } catch (err) {
      console.error('YTDScreen fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [advisorId, year]);

  useFocusEffect(useCallback(() => { fetchData(); }, [fetchData]));

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, []);

  if (loading || ytdData.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const total = ytdData.reduce((s, d) => s + d.incentive, 0);
  const selectedData = selectedMonth ? ytdData.find((d) => d.month === selectedMonth) : null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>YTD Incentive</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Card style={{ alignItems: 'center', padding: 24 }}>
          <Text style={styles.totalLabel}>TOTAL YTD INCENTIVE {year}</Text>
          <AnimatedNumber value={total} prefix="AED " style={styles.totalAmount} />
          <View style={styles.changeRow}>
            <Feather name="trending-up" size={13} color={colors.success} />
            <Text style={styles.totalChange}>+18% vs same period last year</Text>
          </View>
        </Card>

        <View style={styles.chartHeader}>
          <SectionTitle title="Monthly Trend" />
          <Chip label={showPrev ? `Hide ${year - 1}` : `Show ${year - 1}`} active={showPrev} onPress={() => setShowPrev(!showPrev)} />
        </View>
        <Card style={{ paddingHorizontal: 8, paddingVertical: 14 }}>
          <AreaChart
            data={ytdData.map((d) => ({ label: d.month, value: d.incentive }))}
            height={170}
            prevData={showPrev ? prevYearData.slice(0, 9) : undefined}
            showPrev={showPrev}
          />
        </Card>

        {selectedData && (
          <Card style={styles.detailCard}>
            <View style={styles.detailHeader}>
              <Text style={styles.detailTitle}>{selectedData.month} {year}</Text>
              <TouchableOpacity onPress={() => setSelectedMonth(null)}>
                <Feather name="x" size={16} color={colors.textTertiary} />
              </TouchableOpacity>
            </View>
            <View style={styles.detailGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Incentive</Text>
                <Text style={styles.detailValue}>AED {formatFull(selectedData.incentive)}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Target</Text>
                <Text style={styles.detailValue}>AED {formatCompact(selectedData.target)}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Achievement</Text>
                <Text style={styles.detailValue}>{calcPercent(selectedData.achieved, selectedData.target)}%</Text>
              </View>
            </View>
          </Card>
        )}

        <SectionTitle title="Monthly Breakdown" />
        <Card>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>MONTH</Text>
            <Text style={styles.tableHeaderText}>ACHIEVEMENT</Text>
            <Text style={[styles.tableHeaderText, { textAlign: 'right' }]}>INCENTIVE</Text>
          </View>
          {ytdData.map((d) => {
            const ach = calcPercent(d.achieved, d.target);
            return (
              <TouchableOpacity
                key={d.month}
                onPress={() => setSelectedMonth(d.month)}
                style={[styles.tableRow, d.month !== ytdData[ytdData.length - 1].month && styles.borderBottom]}
              >
                <Text style={styles.monthText}>{d.month}</Text>
                <View style={styles.achCol}>
                  <View style={{ width: 72 }}>
                    <ProgressBar pct={ach} height={3} />
                  </View>
                  <Text style={styles.achText}>{ach}%</Text>
                </View>
                <Text style={styles.incText}>AED {formatFull(d.incentive)}</Text>
              </TouchableOpacity>
            );
          })}
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

  totalLabel: { fontSize: 10, color: colors.textTertiary, fontWeight: '600', letterSpacing: 1.2, marginBottom: 8 },
  totalAmount: { fontSize: 32, fontWeight: '700', color: colors.primary, letterSpacing: -0.5 },
  changeRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 },
  totalChange: { fontSize: 12, color: colors.success, fontWeight: '500' },

  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },

  detailCard: { backgroundColor: colors.primary + '04', borderWidth: 1, borderColor: colors.primary + '15' },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  detailTitle: { fontSize: 15, fontWeight: '600' },
  detailGrid: { flexDirection: 'row', gap: 8 },
  detailItem: { flex: 1, padding: 10, borderRadius: borderRadius.md, backgroundColor: colors.card },
  detailLabel: { fontSize: 10, color: colors.textTertiary },
  detailValue: { fontSize: 14, fontWeight: '600', color: colors.primary, marginTop: 2 },

  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  tableHeaderText: { fontSize: 10, fontWeight: '600', color: colors.textTertiary, letterSpacing: 0.5 },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  monthText: { fontSize: 13, fontWeight: '500', width: 36 },
  achCol: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  achText: { fontSize: 11, fontWeight: '500', color: colors.textTertiary, width: 32 },
  incText: { fontSize: 12, fontWeight: '600', color: colors.primary },
});
