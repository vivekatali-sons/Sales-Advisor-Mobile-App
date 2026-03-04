import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors, borderRadius } from '../theme';
import { Card } from '../components/cards/Card';
import { SectionTitle } from '../components/common/SectionTitle';
import { useApp } from '../context/AppContext';
import { transactionsApi } from '../api/client';
import { formatFull, formatCompact } from '../utils/formatters';
import type { Transaction } from '../types';

export const TransactionsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { state: { advisorId, year, month } } = useApp();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await transactionsApi.getAll(advisorId, year, month);
      setTransactions(data);
    } catch (err) {
      console.error('TransactionsScreen fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [advisorId, year, month]);

  useFocusEffect(useCallback(() => { fetchData(); }, [fetchData]));

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, []);

  if (loading || transactions.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const total = transactions.reduce((s, t) => s + t.amount, 0);
  const avg = Math.round(total / transactions.length);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sales Transactions</Text>
        <TouchableOpacity>
          <Feather name="download" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Card style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 16 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.sumLabel}>TRANSACTIONS</Text>
            <Text style={styles.sumValue}>{transactions.length}</Text>
          </View>
          <View style={styles.divider} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.sumLabel}>TOTAL VALUE</Text>
            <Text style={styles.sumValue}>AED {formatCompact(total)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.sumLabel}>AVG. DEAL</Text>
            <Text style={styles.sumValue}>AED {formatCompact(avg)}</Text>
          </View>
        </Card>

        <View style={styles.exportRow}>
          <TouchableOpacity style={styles.exportBtn} activeOpacity={0.7}>
            <Feather name="file-text" size={15} color={colors.textSecondary} />
            <Text style={styles.exportText}>Export PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportBtn} activeOpacity={0.7}>
            <Feather name="grid" size={15} color={colors.textSecondary} />
            <Text style={styles.exportText}>Export Excel</Text>
          </TouchableOpacity>
        </View>

        <SectionTitle title="Transaction History" />
        {transactions.map((t) => (
          <Card key={t.id} style={{ padding: 12, paddingHorizontal: 14, marginBottom: 6, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={styles.txnIcon}>
              <Feather name="shopping-bag" size={16} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.txnCustomer}>{t.customer}</Text>
              <Text style={styles.txnVehicle}>{t.vehicle}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.txnAmount}>AED {formatFull(t.amount)}</Text>
              <Text style={styles.txnDate}>{t.date}</Text>
            </View>
          </Card>
        ))}

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

  sumLabel: { fontSize: 9, color: colors.textTertiary, fontWeight: '600', letterSpacing: 0.5 },
  sumValue: { fontSize: 18, fontWeight: '700', color: colors.primary, marginTop: 4 },
  divider: { width: 1, backgroundColor: colors.border },

  exportRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  exportBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 10, borderRadius: borderRadius.md,
    borderWidth: 1, borderColor: colors.border,
  },
  exportText: { fontSize: 12, fontWeight: '500', color: colors.textSecondary },

  txnIcon: {
    width: 38, height: 38, borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '08',
    alignItems: 'center', justifyContent: 'center',
  },
  txnCustomer: { fontSize: 13, fontWeight: '500', marginBottom: 2 },
  txnVehicle: { fontSize: 11, color: colors.textTertiary },
  txnAmount: { fontSize: 13, fontWeight: '600', color: colors.primary },
  txnDate: { fontSize: 10, color: colors.textMuted },
});
