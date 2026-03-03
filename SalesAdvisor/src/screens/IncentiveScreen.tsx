import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors, borderRadius } from '../theme';
import { Card } from '../components/cards/Card';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { DonutChart } from '../components/charts/DonutChart';
import { SectionTitle } from '../components/common/SectionTitle';
import { advisor, byProduct, byCampaign, bonusEligibility } from '../store/mockData';
import { formatFull } from '../utils/formatters';

export const IncentiveScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const maxCampaign = Math.max(...byCampaign.map((c) => c.value));

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
        <Text style={styles.headerTitle}>Incentive Breakdown</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Card style={{ alignItems: 'center', padding: 24 }}>
          <Text style={styles.incLabel}>SEPTEMBER ESTIMATED INCENTIVE</Text>
          <AnimatedNumber value={advisor.incentive} prefix="AED " style={styles.incAmount} />
          <View style={{ marginTop: 10 }}>
            <Badge status="Almost Eligible" />
          </View>
          <Text style={styles.incSub}>8% remaining to next threshold</Text>
        </Card>

        <Card style={{ padding: 14, backgroundColor: colors.primary + '04' }}>
          <Text style={styles.formulaTitle}>CALCULATION FORMULA</Text>
          <View style={styles.formulaBox}>
            <Text style={styles.formulaMono}>(Base AED 12,000 x 1.25) + AED 3,450</Text>
            <Text style={styles.formulaResult}>= AED 18,450</Text>
          </View>
        </Card>

        <SectionTitle title="By Product Type" />
        <Card style={{ padding: 14 }}>
          <View style={{ alignItems: 'center', marginBottom: 14 }}>
            <DonutChart data={byProduct} size={130} thickness={20} />
          </View>
          {byProduct.map((p, i) => (
            <View key={i} style={[styles.productRow, i > 0 && styles.borderTop]}>
              <View style={styles.productLeft}>
                <View style={[styles.productDot, { backgroundColor: p.color }]} />
                <Text style={styles.productName}>{p.name}</Text>
              </View>
              <Text style={styles.productValue}>AED {formatFull(p.value)}</Text>
            </View>
          ))}
        </Card>

        <SectionTitle title="By Campaign" />
        <Card style={{ paddingHorizontal: 14, paddingVertical: 12 }}>
          {byCampaign.map((c, i) => (
            <View key={i} style={{ marginBottom: i < byCampaign.length - 1 ? 12 : 0 }}>
              <View style={styles.campaignHeader}>
                <Text style={styles.campaignName}>{c.name}</Text>
                <Text style={styles.campaignValue}>AED {formatFull(c.value)}</Text>
              </View>
              <ProgressBar pct={(c.value / maxCampaign) * 100} height={4} color={colors.primaryLight} />
            </View>
          ))}
        </Card>

        <SectionTitle title="Eligibility Status" />
        <Card>
          {bonusEligibility.map((b, i) => (
            <View key={i} style={[styles.eligRow, i > 0 && styles.borderTop]}>
              <Text style={styles.eligName}>{b.category}</Text>
              <Badge status={b.status} />
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

  incLabel: { fontSize: 10, color: colors.textTertiary, fontWeight: '600', letterSpacing: 1.2, marginBottom: 8 },
  incAmount: { fontSize: 32, fontWeight: '700', color: colors.primary, letterSpacing: -0.5 },
  incSub: { fontSize: 11, color: colors.textTertiary, marginTop: 8 },

  formulaTitle: { fontSize: 10, fontWeight: '600', color: colors.primary, letterSpacing: 0.8, marginBottom: 8 },
  formulaBox: { padding: 12, paddingHorizontal: 14, borderRadius: borderRadius.md, backgroundColor: colors.card, alignItems: 'center' },
  formulaMono: { fontSize: 12, fontFamily: 'monospace', lineHeight: 20, color: colors.text },
  formulaResult: { fontSize: 14, fontWeight: '700', color: colors.primary, marginTop: 4 },

  productRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  productLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  productDot: { width: 8, height: 8, borderRadius: 2 },
  productName: { fontSize: 13, color: colors.textSecondary },
  productValue: { fontSize: 13, fontWeight: '600' },

  campaignHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  campaignName: { fontSize: 12, color: colors.textSecondary },
  campaignValue: { fontSize: 12, fontWeight: '600' },

  eligRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  eligName: { fontSize: 13, color: colors.textSecondary },
  borderTop: { borderTopWidth: 1, borderTopColor: colors.border },
});
