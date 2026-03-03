import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView,
  Platform, Animated, Dimensions,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, shadows } from '../theme';

const { height: SCREEN_H } = Dimensions.get('window');
// iPhone SE = 568, iPhone 8 = 667, iPhone 12+ = 844+
const compact = SCREEN_H < 700;

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [empId, setEmpId] = useState('SA-2847');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<'empId' | 'password' | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  const cardAnim = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(cardAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(btnScale, { toValue: 0.97, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(btnScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 800);
  };

  return (
    <LinearGradient colors={['#F7F9F8', '#EEF2F1']} style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.inner}>
          <Animated.View
            style={[
              styles.card,
              {
                opacity: cardAnim,
                transform: [{ translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
              },
            ]}
          >
            {/* Brand */}
            <View style={styles.brandSection}>
              <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
              <Text style={styles.greeting}>Welcome back</Text>
              {!compact && <Text style={styles.subtitle}>Performance & Incentive Tracker</Text>}
            </View>

            {/* Employee ID */}
            <Text style={styles.label}>Employee ID</Text>
            <View style={[styles.inputRow, focusedField === 'empId' && styles.inputRowFocused]}>
              <Feather name="user" size={15} color={focusedField === 'empId' ? colors.primary : colors.textTertiary} style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                value={empId}
                onChangeText={setEmpId}
                placeholder="Enter Employee ID"
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="characters"
                onFocus={() => setFocusedField('empId')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Password */}
            <Text style={[styles.label, { marginTop: compact ? 10 : 14 }]}>Password</Text>
            <View style={[styles.inputRow, focusedField === 'password' && styles.inputRowFocused]}>
              <Feather name="lock" size={15} color={focusedField === 'password' ? colors.primary : colors.textTertiary} style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Password"
                placeholderTextColor={colors.textTertiary}
                secureTextEntry={!showPassword}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Feather name={showPassword ? 'eye' : 'eye-off'} size={15} color={colors.textTertiary} />
              </TouchableOpacity>
            </View>

            {/* Remember Me + Forgot Password */}
            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.rememberRow} onPress={() => setRememberMe(!rememberMe)} activeOpacity={0.7}>
                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                  {rememberMe && <Feather name="check" size={11} color="#fff" />}
                </View>
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In */}
            <Animated.View style={{ transform: [{ scale: btnScale }] }}>
              <TouchableOpacity onPress={handleLogin} onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={loading} activeOpacity={1}>
                <LinearGradient
                  colors={loading ? ['#2A6B55', '#2A6B55'] : ['#1B4D3E', '#22563F']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  style={[styles.button, loading && styles.buttonDisabled]}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <View style={styles.buttonInner}>
                      <Feather name="log-in" size={15} color="#fff" />
                      <Text style={styles.buttonText}>Sign In</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Biometric */}
            <TouchableOpacity style={styles.bioButton} activeOpacity={0.7}>
              <MaterialCommunityIcons name="fingerprint" size={18} color={colors.primary} />
              <Text style={styles.bioButtonText}>Sign in with Biometric</Text>
            </TouchableOpacity>

            {/* SSO */}
            <TouchableOpacity style={styles.ssoButton} activeOpacity={0.6}>
              <Feather name="shield" size={13} color={colors.textTertiary} />
              <Text style={styles.ssoButtonText}>SSO Login</Text>
            </TouchableOpacity>

            {/* Security footer */}
            <View style={styles.footerRow}>
              <Feather name="lock" size={11} color={colors.textMuted} />
              <Text style={styles.footer}>Secure enterprise authentication</Text>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
  inner: {
    flex: 1, justifyContent: 'center',
    paddingHorizontal: compact ? 16 : 24,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: compact ? borderRadius.lg : borderRadius.xxl,
    padding: compact ? 16 : 24,
    ...shadows.elevated,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: compact ? 12 : 20,
  },
  logo: {
    width: compact ? 110 : 160,
    height: compact ? 50 : 80,
    marginBottom: compact ? 2 : 8,
  },
  greeting: {
    fontSize: compact ? 18 : 22,
    fontWeight: '600', color: colors.text, letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13, color: colors.textSecondary, fontWeight: '400', marginTop: 3,
  },

  label: {
    fontSize: compact ? 10 : 11,
    fontWeight: '600', color: colors.textTertiary,
    marginBottom: compact ? 4 : 6,
    letterSpacing: 0.8, textTransform: 'uppercase',
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: compact ? borderRadius.md : borderRadius.lg,
    borderWidth: 1.5, borderColor: 'transparent',
    backgroundColor: '#F4F6F5',
  },
  inputRowFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
  inputIcon: { marginLeft: 12 },
  inputField: {
    flex: 1,
    paddingVertical: compact ? 10 : 14,
    paddingHorizontal: 10,
    fontSize: compact ? 13 : 15,
    color: colors.text,
  },
  eyeBtn: { paddingHorizontal: 12, paddingVertical: 10 },

  optionsRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: compact ? 8 : 10,
    marginBottom: compact ? 12 : 20,
  },
  rememberRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  checkbox: {
    width: compact ? 18 : 20, height: compact ? 18 : 20,
    borderRadius: borderRadius.xs,
    borderWidth: 1.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary, borderColor: colors.primary,
  },
  rememberText: { fontSize: compact ? 11 : 13, color: colors.textSecondary },
  forgotText: { fontSize: compact ? 11 : 13, color: colors.primary, fontWeight: '600' },

  button: {
    width: '100%',
    paddingVertical: compact ? 12 : 16,
    borderRadius: compact ? borderRadius.md : borderRadius.lg,
    alignItems: 'center', justifyContent: 'center',
    ...shadows.card,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonInner: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  buttonText: { color: '#fff', fontSize: compact ? 14 : 15, fontWeight: '600' },

  dividerRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    marginVertical: compact ? 12 : 18,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { fontSize: 12, color: colors.textTertiary },

  bioButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: compact ? 12 : 14,
    borderRadius: compact ? borderRadius.md : borderRadius.lg,
    borderWidth: 1.5, borderColor: colors.primary + '25',
    backgroundColor: 'transparent',
  },
  bioButtonText: { fontSize: compact ? 13 : 14, fontWeight: '600', color: colors.primary },

  ssoButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: compact ? 8 : 10, marginTop: 2,
  },
  ssoButtonText: { fontSize: compact ? 12 : 13, fontWeight: '500', color: colors.textTertiary },

  footerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, marginTop: compact ? 10 : 14,
  },
  footer: { fontSize: compact ? 11 : 12, color: colors.textMuted },
});
