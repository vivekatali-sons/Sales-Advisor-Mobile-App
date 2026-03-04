import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, borderRadius } from '../theme';
import { Card } from '../components/cards/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { TempIndicator } from '../components/common/TempIndicator';
import { Chip } from '../components/common/Chip';
import { useApp } from '../context/AppContext';
import { leadsApi } from '../api/client';
import { formatFull, formatCompact } from '../utils/formatters';
import type { Lead, LeadTemperature } from '../types';

export const LeadsScreen: React.FC = () => {
  const { state: { advisorId } } = useApp();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | LeadTemperature>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await leadsApi.getAll(advisorId);
      setLeads(data);
    } catch (err) {
      console.error('LeadsScreen fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [advisorId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, []);

  if (loading || leads.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const filtered = filter === 'all' ? leads : leads.filter((l) => l.temperature === filter);
  const totalPipeline = leads.reduce((s, l) => s + l.value, 0);
  const totalCommission = leads.reduce((s, l) => s + l.commission, 0);

  const filters: { key: typeof filter; label: string }[] = [
    { key: 'all', label: `All (${leads.length})` },
    { key: 'hot', label: `Hot (${leads.filter((l) => l.temperature === 'hot').length})` },
    { key: 'warm', label: `Warm (${leads.filter((l) => l.temperature === 'warm').length})` },
    { key: 'cold', label: `Cold (${leads.filter((l) => l.temperature === 'cold').length})` },
  ];

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lead Pipeline</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Card style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
          <View>
            <Text style={styles.sumLabel}>Pipeline Value</Text>
            <Text style={styles.sumValuePrimary}>AED {formatCompact(totalPipeline)}</Text>
          </View>
          <View style={styles.sumDivider} />
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.sumLabel}>Potential Incentive</Text>
            <Text style={styles.sumValueAccent}>AED {formatFull(totalCommission)}</Text>
          </View>
        </Card>

        <View style={styles.filterRow}>
          {filters.map((f) => (
            <Chip key={f.key} label={f.label} active={filter === f.key} onPress={() => setFilter(f.key)} />
          ))}
        </View>

        {selectedLead && (
          <Card style={styles.detailCard}>
            <View style={styles.detailHeader}>
              <View>
                <Text style={styles.detailName}>{selectedLead.name}</Text>
                <Text style={styles.detailVehicle}>{selectedLead.vehicle}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedLead(null)}>
                <Feather name="x" size={16} color={colors.textTertiary} />
              </TouchableOpacity>
            </View>
            <View style={styles.detailGrid}>
              {[
                { label: 'Deal Value', value: `AED ${formatFull(selectedLead.value)}` },
                { label: 'Commission', value: `AED ${formatFull(selectedLead.commission)}` },
                { label: 'Stage', value: selectedLead.stage },
                { label: 'Probability', value: `${selectedLead.probability}%` },
              ].map((item) => (
                <View key={item.label} style={styles.detailItem}>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text style={styles.detailValue}>{item.value}</Text>
                </View>
              ))}
            </View>
            <View style={styles.lastContactRow}>
              <Feather name="clock" size={12} color={colors.textTertiary} />
              <Text style={styles.lastContact}>Last contact: {selectedLead.lastContact}</Text>
            </View>
          </Card>
        )}

        {filtered.map((lead) => (
          <Card key={lead.id} onPress={() => setSelectedLead(lead)} style={{ padding: 14, marginBottom: 8 }}>
            <View style={styles.leadTop}>
              <View style={{ flex: 1 }}>
                <View style={styles.leadNameRow}>
                  <Text style={styles.leadName}>{lead.name}</Text>
                  <TempIndicator temperature={lead.temperature} />
                </View>
                <Text style={styles.leadSub}>{lead.vehicle} · {lead.stage}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.leadValue}>AED {formatFull(lead.value)}</Text>
                <Text style={styles.leadComm}>+AED {formatFull(lead.commission)}</Text>
              </View>
            </View>
            <View style={styles.probRow}>
              <View style={{ flex: 1 }}>
                <ProgressBar
                  pct={lead.probability}
                  height={3}
                  color={lead.probability >= 70 ? colors.success : lead.probability >= 50 ? colors.warning : colors.cold}
                />
              </View>
              <Text style={styles.probText}>{lead.probability}%</Text>
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 16 },

  sumLabel: { fontSize: 10, color: colors.textTertiary, fontWeight: '500', marginBottom: 4 },
  sumValuePrimary: { fontSize: 18, fontWeight: '700', color: colors.primary },
  sumValueAccent: { fontSize: 18, fontWeight: '700', color: colors.accent },
  sumDivider: { width: 1, backgroundColor: colors.border },

  filterRow: { flexDirection: 'row', gap: 6, marginBottom: 14 },

  detailCard: { backgroundColor: colors.primary + '04', borderWidth: 1, borderColor: colors.primary + '15', marginBottom: 14 },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  detailName: { fontSize: 15, fontWeight: '600' },
  detailVehicle: { fontSize: 11, color: colors.textTertiary, marginTop: 2 },
  detailGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  detailItem: { width: '47%', padding: 10, borderRadius: borderRadius.md, backgroundColor: colors.card },
  detailLabel: { fontSize: 10, color: colors.textTertiary },
  detailValue: { fontSize: 14, fontWeight: '600', marginTop: 2 },
  lastContactRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  lastContact: { fontSize: 11, color: colors.textTertiary },

  leadTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  leadNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 },
  leadName: { fontSize: 13, fontWeight: '600' },
  leadSub: { fontSize: 11, color: colors.textTertiary },
  leadValue: { fontSize: 13, fontWeight: '600' },
  leadComm: { fontSize: 10, color: colors.accent, fontWeight: '500', marginTop: 2 },
  probRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  probText: { fontSize: 10, fontWeight: '500', color: colors.textTertiary, width: 28 },
});
