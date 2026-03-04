import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Animated, ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadows, spacing, borderRadius } from '../theme';
import { Card } from '../components/cards/Card';
import { CircularProgress } from '../components/common/CircularProgress';
import { ProgressBar } from '../components/common/ProgressBar';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { TempIndicator } from '../components/common/TempIndicator';
import { Sparkline } from '../components/charts/Sparkline';
import { BarChart } from '../components/charts/BarChart';
import { SectionTitle } from '../components/common/SectionTitle';
import { formatCompact, formatFull, calcPercent } from '../utils/formatters';
import { useApp } from '../context/AppContext';
import { dashboardApi, leadsApi, performanceApi, incentiveApi } from '../api/client';
import type { Advisor, Lead, DayData, YTDMonth } from '../types';

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { state: { advisorId, year, month, monthName } } = useApp();

  const [advisor, setAdvisor] = useState<Advisor | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [dailyData, setDailyData] = useState<DayData[]>([]);
  const [ytdData, setYtdData] = useState<YTDMonth[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [adv, lds, daily, ytd] = await Promise.all([
        dashboardApi.get(advisorId, year, month),
        leadsApi.getAll(advisorId),
        performanceApi.getDaily(advisorId, year, month),
        incentiveApi.getYTD(advisorId, year),
      ]);
      const ytdTotal = ytd.reduce((s, d) => s + d.incentive, 0);
      setAdvisor({ ...adv, ytdIncentive: ytdTotal });
      setLeads(lds);
      setDailyData(daily);
      setYtdData(ytd);
    } catch (e) {
      console.error('Dashboard fetch error', e);
    } finally {
      setLoading(false);
    }
  }, [advisorId, year, month]);

  useFocusEffect(useCallback(() => { fetchData(); }, [fetchData]));

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, []);

  if (loading || !advisor) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const pct = calcPercent(advisor.achieved, advisor.monthlyTarget);
  const hotCount = leads.filter((l) => l.temperature === 'hot').length;
  const warmCount = leads.filter((l) => l.temperature === 'warm').length;
  const coldCount = leads.filter((l) => l.temperature === 'cold').length;
  const pipelineValue = leads.reduce((s, l) => s + l.value, 0);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{advisor.avatar}</Text>
          </View>
          <View>
            <Text style={styles.greeting}>Hi, {advisor.name.split(' ')[0]}</Text>
            <Text style={styles.role}>{advisor.role}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn} onPress={fetchData}>
            <Feather name="refresh-cw" size={15} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="bell" size={15} color={colors.textSecondary} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.alertBanner}>
          <Feather name="trending-up" size={16} color={colors.accent} />
          <Text style={styles.alertText}>
            <Text style={{ fontWeight: '600' }}>2 leads</Text> remaining to next incentive threshold
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Performance')} activeOpacity={0.85}>
          <LinearGradient colors={['#1B4D3E', '#234E42']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroCard}>
            <View style={styles.heroTop}>
              <View style={{ flex: 1 }}>
                <Text style={styles.heroLabel}>{monthName.toUpperCase()} TARGET</Text>
                <AnimatedNumber value={advisor.achieved} prefix="AED " style={styles.heroAmount} />
                <Text style={styles.heroSubtext}>of AED {formatFull(advisor.monthlyTarget)}</Text>
              </View>
              <CircularProgress pct={pct} size={68} strokeWidth={5} color={colors.accent}>
                <Text style={styles.heroPct}>{pct}%</Text>
              </CircularProgress>
            </View>
            <ProgressBar pct={pct} height={4} color={colors.accent} bg="rgba(255,255,255,0.12)" />
            <View style={styles.heroRange}>
              <Text style={styles.heroRangeText}>AED {formatCompact(advisor.achieved)}</Text>
              <Text style={styles.heroRangeText}>AED {formatCompact(advisor.monthlyTarget)}</Text>
            </View>
            <View style={styles.heroArrow}>
              <Text style={styles.heroArrowText}>View Details</Text>
              <Feather name="arrow-right" size={12} color="rgba(255,255,255,0.5)" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.statsGrid}>
          <Card onPress={() => navigation.navigate('Incentive')} style={styles.statCard}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: colors.accent + '12' }]}>
                <Feather name="credit-card" size={15} color={colors.accent} />
              </View>
            </View>
            <Text style={styles.statLabel}>Est. Incentive</Text>
            <AnimatedNumber value={advisor.incentive} prefix="AED " style={styles.statValue} />
            <View style={styles.statChangeRow}>
              <Feather name="arrow-up-right" size={12} color={colors.success} />
              <Text style={styles.statChange}>+12% vs Aug</Text>
            </View>
          </Card>
          <Card onPress={() => navigation.navigate('YTD')} style={styles.statCard}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: colors.primary + '10' }]}>
                <Feather name="bar-chart-2" size={15} color={colors.primary} />
              </View>
            </View>
            <Text style={styles.statLabel}>YTD Incentive</Text>
            <AnimatedNumber value={advisor.ytdIncentive} prefix="AED " style={styles.statValue} />
            <View style={{ marginTop: 8 }}>
              <Sparkline data={ytdData.slice(-5).map((d) => d.incentive)} />
            </View>
          </Card>
        </View>

        <Card onPress={() => navigation.navigate('LeadsTab')}>
          <View style={styles.leadsRow}>
            <View style={styles.leadsLeft}>
              <View style={styles.leadsIcon}>
                <Feather name="users" size={18} color={colors.primaryLight} />
              </View>
              <View>
                <Text style={styles.leadsTitle}>Open Leads</Text>
                <Text style={styles.leadsSub}>AED {formatCompact(pipelineValue)} pipeline</Text>
              </View>
            </View>
            <View style={styles.leadsRight}>
              <Text style={styles.leadsCount}>{leads.length}</Text>
              <Feather name="chevron-right" size={18} color={colors.textMuted} />
            </View>
          </View>
          <View style={styles.tempRow}>
            <TempIndicator temperature="hot" />
            <Text style={styles.tempText}>{hotCount}</Text>
            <TempIndicator temperature="warm" />
            <Text style={styles.tempText}>{warmCount}</Text>
            <TempIndicator temperature="cold" />
            <Text style={styles.tempText}>{coldCount}</Text>
          </View>
        </Card>

        <Card onPress={() => navigation.navigate('SimulatorTab')} style={styles.simCard}>
          <View style={styles.simRow}>
            <View style={styles.simIcon}>
              <Feather name="crosshair" size={20} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.simTitle}>Incentive Simulator</Text>
              <Text style={styles.simSub}>Project earnings based on pipeline</Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.textMuted} />
          </View>
        </Card>

        <SectionTitle title="This Week's Activity" />
        <Card style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
          <BarChart data={dailyData.map((d) => ({ label: d.day, value: d.value }))} height={120} highlightIndex={5} />
        </Card>

        <View style={{ height: 16 }} />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  greeting: { fontSize: 15, fontWeight: '600', color: colors.text },
  role: { fontSize: 11, color: colors.textTertiary, marginTop: 1 },
  headerRight: { flexDirection: 'row', gap: 6 },
  iconBtn: { width: 36, height: 36, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  notifDot: { position: 'absolute', top: 7, right: 7, width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger, borderWidth: 1.5, borderColor: '#fff' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 16 },
  alertBanner: { backgroundColor: colors.accent + '0C', borderRadius: borderRadius.md, padding: 12, paddingHorizontal: 14, marginBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: colors.accent + '20' },
  alertText: { fontSize: 12, flex: 1, lineHeight: 18, color: colors.textSecondary },
  heroCard: { borderRadius: borderRadius.xxl, padding: 20, marginBottom: 12 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  heroLabel: { fontSize: 10, color: 'rgba(255,255,255,0.55)', fontWeight: '600', letterSpacing: 1.2, marginBottom: 6 },
  heroAmount: { fontSize: 28, fontWeight: '700', color: '#fff', letterSpacing: -0.5 },
  heroSubtext: { fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4 },
  heroPct: { fontSize: 16, fontWeight: '700', color: '#fff' },
  heroRange: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  heroRangeText: { fontSize: 10, color: 'rgba(255,255,255,0.35)' },
  heroArrow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4, marginTop: 6 },
  heroArrowText: { fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: '500' },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  statCard: { flex: 1, padding: 14 },
  statHeader: { marginBottom: 8 },
  statIcon: { width: 32, height: 32, borderRadius: borderRadius.sm, alignItems: 'center', justifyContent: 'center' },
  statLabel: { fontSize: 11, color: colors.textTertiary, fontWeight: '500', marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: '700', color: colors.primary, letterSpacing: -0.3 },
  statChangeRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 4 },
  statChange: { fontSize: 11, color: colors.success, fontWeight: '500' },
  leadsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leadsLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  leadsIcon: { width: 40, height: 40, borderRadius: borderRadius.md, backgroundColor: colors.primaryLight + '10', alignItems: 'center', justifyContent: 'center' },
  leadsTitle: { fontSize: 14, fontWeight: '600', marginBottom: 1 },
  leadsSub: { fontSize: 11, color: colors.textTertiary },
  leadsRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  leadsCount: { fontSize: 24, fontWeight: '700', color: colors.primary },
  tempRow: { flexDirection: 'row', gap: 6, marginTop: 12, alignItems: 'center' },
  tempText: { fontSize: 12, color: colors.textSecondary, fontWeight: '500' },
  simCard: { backgroundColor: colors.accent + '06', borderColor: colors.accent + '18' },
  simRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  simIcon: { width: 40, height: 40, borderRadius: borderRadius.md, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  simTitle: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  simSub: { fontSize: 11, color: colors.textTertiary },
});
