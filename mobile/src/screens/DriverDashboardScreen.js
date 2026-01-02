import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Typography } from '../components/atoms/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';
import { backgroundScanService } from '../services/BackgroundScanService';
import { useAuth } from '../context/AuthContext';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing 
} from 'react-native-reanimated';
import { DriverMap } from '../components/organisms/DriverMap';

const { width } = Dimensions.get('window');

// Mock Data
const WALLET_ACTIVITY = [
  { id: 1, desc: 'Hotspot Bonus - N Highway', amount: 500.00, type: 'credit' },
  { id: 2, desc: 'Daily Active Bonus', amount: 25.00, type: 'credit' },
  { id: 3, desc: '25 Pings', amount: 12.50, type: 'credit' },
];

export const DriverDashboardScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('RADAR'); // RADAR, MAP, WALLET
  const [isScanning, setIsScanning] = useState(false);
  const [earnings, setEarnings] = useState({ base: 49.00, bonus: 40.00 });
  const [pings, setPings] = useState(178);

  // Radar Animation Values
  const pulse1 = useSharedValue(1);
  const pulse2 = useSharedValue(1);

  const toggleScanning = () => {
      if (isScanning) {
          setIsScanning(false);
          backgroundScanService.stopGuarding();
          pulse1.value = withTiming(1);
          pulse2.value = withTiming(1);
      } else {
          setIsScanning(true);
          backgroundScanService.startGuarding();
          // Start Animation
          pulse1.value = withRepeat(
            withSequence(
              withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) }),
              withTiming(1, { duration: 0 })
            ),
            -1,
            false
          );
          setTimeout(() => {
            pulse2.value = withRepeat(
              withSequence(
                withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) }),
                withTiming(1, { duration: 0 })
              ),
              -1,
              false
            );
          }, 1000);
      }
  };

  useEffect(() => {
    // Subscribe to service (mocked integration for UI demo)
    const unsubscribe = backgroundScanService.addListener((data) => {
      if (data.earnings) {
          setEarnings(data.earnings);
      }
      if (data.scanCount) setPings(data.scanCount);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const pulseStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: pulse1.value }],
    opacity: 1 - (pulse1.value - 1) * 2,
  }));

  const pulseStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: pulse2.value }],
    opacity: 1 - (pulse2.value - 1) * 2,
  }));

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Typography variant="h3" style={styles.headerTitle}>Community Shield</Typography>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.badge}>
            <Typography variant="caption" style={styles.badgeText}>SENTINEL</Typography>
          </View>
          <TouchableOpacity onPress={() => {
              Alert.alert('Logout', 'Are you sure you want to end your shift?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Logout', style: 'destructive', onPress: logout }
              ])
          }} style={{ marginLeft: 12 }}>
             <Ionicons name="log-out-outline" size={24} color={theme.colors.text.secondary} />
          </TouchableOpacity>
      </View>
    </View>
  );

  const renderRadarTab = () => (
    <View style={styles.tabContent}>
      <Typography variant="h3" style={styles.tabTitle}>RADAR</Typography>
      
      <View style={styles.radarContainer}>
        {isScanning && (
            <>
                <Animated.View style={[styles.pulseCircle, pulseStyle1]} />
                <Animated.View style={[styles.pulseCircle, pulseStyle2]} />
            </>
        )}
        <TouchableOpacity 
            style={[styles.coreCircle, !isScanning && { borderColor: theme.colors.text.secondary }]}
            onPress={toggleScanning}
        >
          {isScanning ? (
              <>
                <Typography variant="h2" style={styles.scanningText}>ACTIVE</Typography>
                <Typography variant="h2" style={styles.scanningText}>SCANNING</Typography>
                <View style={styles.statusPill}>
                    <Typography variant="caption" style={styles.statusPillText}>EARNING</Typography>
                </View>
              </>
          ) : (
              <>
                <Ionicons name="shield-outline" size={48} color={theme.colors.text.secondary} />
                <Typography variant="h3" style={[styles.scanningText, { color: theme.colors.text.secondary, marginTop: 8 }]}>START GUARDING</Typography>
              </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Typography variant="body" style={styles.statsLabel}>PINGS TODAY: {pings}</Typography>
        <Typography variant="h1" style={styles.earningsValue}>R{(earnings.base + earnings.bonus).toFixed(2)}</Typography>
      </View>

      <View style={styles.routeCard}>
        <Typography variant="caption" style={styles.routeLabel}>CURRENT ROUTE: Bloed St {'>'} Soshanguve</Typography>
        <View style={styles.networkRow}>
          <Ionicons name="wifi" size={16} color={theme.colors.success} />
          <Typography variant="caption" style={styles.networkText}>NETWORK STRENGTH: HIGH</Typography>
        </View>
      </View>
    </View>
  );

  const renderMapTab = () => (
    <View style={styles.tabContentFull}>
      <View style={styles.mapHeader}>
        <Typography variant="h3" style={styles.tabTitle}>MAP</Typography>
      </View>
      <View style={styles.mapContainer}>
        <DriverMap />

        {/* Floating Cards */}
        <View style={styles.mapOverlay}>
          <View style={styles.stolenAlertCard}>
            <Ionicons name="warning" size={24} color="#fff" />
            <View style={{ marginLeft: 12 }}>
              <Typography variant="h3" style={{ color: '#fff', fontSize: 16 }}>STOLEN CAR ALERT!</Typography>
              <Typography variant="caption" style={{ color: '#fff' }}>5 nearby tags</Typography>
            </View>
          </View>

          <View style={styles.bonusCard}>
            <Typography variant="h3" style={{ color: '#fff', fontSize: 16 }}>R500 BONUS</Typography>
            <Typography variant="caption" style={{ color: theme.colors.text.secondary }}>BOLO: Grey Toyota Hilux - JP 30J2 L</Typography>
            <Typography variant="caption" style={{ color: theme.colors.text.secondary }}>ROUTE: N1 North</Typography>
          </View>
        </View>
      </View>
    </View>
  );

  const renderWalletTab = () => (
    <View style={styles.tabContent}>
      <Typography variant="h3" style={styles.tabTitle}>EARNINGS WALLET</Typography>
      
      <View style={styles.balanceCard}>
        <Typography variant="caption" style={styles.balanceLabel}>TOTAL BALANCE</Typography>
        <Typography variant="h1" style={styles.balanceAmount}>R{(earnings.base + earnings.bonus).toFixed(2)}</Typography>
        
        <View style={styles.earningsBreakdown}>
            <View style={styles.breakdownItem}>
                <Typography variant="caption" style={styles.breakdownLabel}>BASE PAY</Typography>
                <Typography variant="body" style={styles.breakdownValue}>R{earnings.base.toFixed(2)}</Typography>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.breakdownItem}>
                <Typography variant="caption" style={styles.breakdownLabel}>BONUS (Max R150)</Typography>
                <Typography variant="body" style={[styles.breakdownValue, { color: theme.colors.success }]}>
                    R{earnings.bonus.toFixed(2)}
                </Typography>
            </View>
        </View>

        <TouchableOpacity 
          style={styles.withdrawButton}
          onPress={() => {}}
        >
          <Typography variant="button" style={{ color: '#000', fontWeight: 'bold' }}>Withdraw Funds</Typography>
        </TouchableOpacity>
      </View>

      <View style={styles.activitySection}>
        <Typography variant="h3" style={styles.sectionTitle}>Recent Activity</Typography>
        {WALLET_ACTIVITY.map((item) => (
          <View key={item.id} style={styles.activityItem}>
            <Typography variant="body" style={{ color: '#fff', flex: 1 }}>{item.desc}</Typography>
            <Typography variant="body" style={{ color: theme.colors.success }}>
              R{item.amount.toFixed(2)}
            </Typography>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}

      <View style={styles.mainContent}>
        {activeTab === 'RADAR' && renderRadarTab()}
        {activeTab === 'MAP' && renderMapTab()}
        {activeTab === 'WALLET' && renderWalletTab()}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('RADAR')}
        >
          <Ionicons 
            name="radio-outline" 
            size={24} 
            color={activeTab === 'RADAR' ? '#fff' : theme.colors.text.secondary} 
          />
          <Typography 
            variant="caption" 
            style={[styles.navText, activeTab === 'RADAR' && styles.navTextActive]}
          >
            RADAR
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('MAP')}
        >
          <Ionicons 
            name="map-outline" 
            size={24} 
            color={activeTab === 'MAP' ? '#fff' : theme.colors.text.secondary} 
          />
          <Typography 
            variant="caption" 
            style={[styles.navText, activeTab === 'MAP' && styles.navTextActive]}
          >
            MAP
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('WALLET')}
        >
          <Ionicons 
            name="wallet-outline" 
            size={24} 
            color={activeTab === 'WALLET' ? '#fff' : theme.colors.text.secondary} 
          />
          <Typography 
            variant="caption" 
            style={[styles.navText, activeTab === 'WALLET' && styles.navTextActive]}
          >
            WALLET
          </Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Dark Navy Background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: theme.colors.primary, // Red/Blue depending on theme but screenshot is Blue
    backgroundColor: '#3b82f6', // Use Blue manually to match screenshot badge
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  tabContentFull: {
    flex: 1,
  },
  tabTitle: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 1,
    marginBottom: 40,
    fontWeight: '600',
  },
  // Radar Styles
  radarContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  coreCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.success,
    zIndex: 10,
  },
  pulseCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: theme.colors.success,
    opacity: 0.3,
  },
  scanningText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusPill: {
    marginTop: 8,
    backgroundColor: theme.colors.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPillText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 10,
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  statsLabel: {
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  earningsValue: {
    color: theme.colors.success,
    fontSize: 42,
    fontWeight: 'bold',
  },
  routeCard: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'flex-start',
  },
  routeLabel: {
    color: '#fff',
    marginBottom: 8,
  },
  networkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  networkText: {
    color: theme.colors.text.secondary,
    fontSize: 10,
  },
  // Bottom Bar
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingBottom: 20,
    paddingTop: 16,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: theme.colors.text.secondary,
    fontSize: 10,
    marginTop: 4,
  },
  navTextActive: {
    color: '#fff',
  },
  // Map Styles
  mapHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    paddingTop: 20,
  },
  mapContainer: {
    flex: 1,
    marginTop: 60, // Space for header
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  stolenAlertCard: {
    backgroundColor: '#f97316', // Orange
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  bonusCard: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.success,
  },
  driverMarker: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverMarkerCore: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.accent, // Blue
    zIndex: 2,
  },
  driverMarkerPulse: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.accent,
    opacity: 0.3,
  },
  balanceCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.l,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  balanceLabel: {
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  balanceAmount: {
    color: theme.colors.primary,
    marginBottom: theme.spacing.m,
  },
  earningsBreakdown: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: theme.spacing.l,
      paddingVertical: theme.spacing.m,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
  },
  breakdownItem: {
      flex: 1,
      alignItems: 'center',
  },
  breakdownLabel: {
      color: theme.colors.text.secondary,
      fontSize: 10,
      marginBottom: 4,
  },
  breakdownValue: {
      color: theme.colors.text.primary,
      fontWeight: 'bold',
  },
  verticalDivider: {
      width: 1,
      backgroundColor: theme.colors.border,
      height: '100%',
  },
  withdrawButton: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    alignItems: 'center',
  },
  sectionTitle: {
      marginBottom: theme.spacing.m,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
