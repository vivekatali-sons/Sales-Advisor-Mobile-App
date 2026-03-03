import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, borderRadius } from '../theme';

import { DashboardScreen } from '../screens/DashboardScreen';
import { PerformanceScreen } from '../screens/PerformanceScreen';
import { IncentiveScreen } from '../screens/IncentiveScreen';
import { YTDScreen } from '../screens/YTDScreen';
import { LeadsScreen } from '../screens/LeadsScreen';
import { SimulatorScreen } from '../screens/SimulatorScreen';
import { TransactionsScreen } from '../screens/TransactionsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type FeatherIcon = React.ComponentProps<typeof Feather>['name'];

const tabMeta: Record<string, { icon: FeatherIcon; label: string }> = {
  HomeTab: { icon: 'bar-chart-2', label: 'Home' },
  PerfTab: { icon: 'target', label: 'Performance' },
  IncTab: { icon: 'dollar-sign', label: 'Incentive' },
  LeadsTab: { icon: 'users', label: 'Leads' },
  SimulatorTab: { icon: 'sliders', label: 'Simulator' },
};

const TabIcon = ({ routeName, focused }: { routeName: string; focused: boolean }) => {
  const meta = tabMeta[routeName] || { icon: 'grid' as FeatherIcon, label: routeName };
  const color = focused ? colors.primary : colors.textTertiary;

  return (
    <View style={[styles.tabItem, focused && styles.tabItemActive]}>
      <Feather name={meta.icon} size={18} color={color} />
      <Text style={[styles.tabLabel, { color }]} numberOfLines={1}>
        {meta.label}
      </Text>
    </View>
  );
};

// Home tab stack
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="Performance" component={PerformanceScreen} />
    <Stack.Screen name="Incentive" component={IncentiveScreen} />
    <Stack.Screen name="YTD" component={YTDScreen} />
    <Stack.Screen name="Transactions" component={TransactionsScreen} />
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.card,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        paddingTop: 6,
        paddingBottom: 28,
        height: 76,
      },
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeStack}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon routeName="HomeTab" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="PerfTab"
      component={PerformanceScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon routeName="PerfTab" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="IncTab"
      component={IncentiveScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon routeName="IncTab" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="LeadsTab"
      component={LeadsScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon routeName="LeadsTab" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="SimulatorTab"
      component={SimulatorScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon routeName="SimulatorTab" focused={focused} />,
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: borderRadius.md,
    minWidth: 56,
  },
  tabItemActive: {
    backgroundColor: colors.primary + '0A',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});
