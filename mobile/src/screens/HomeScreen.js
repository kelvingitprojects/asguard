import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import { Card } from '../components/atoms/Card';
import { VehicleCard } from '../components/molecules/VehicleCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('My Cars');
  
  // Animation values for the "Report Stolen" pulse
  const pulse1 = useSharedValue(1);
  const pulse2 = useSharedValue(1);

  useEffect(() => {
    // Start pulsing animation
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
  }, []);

  const pulseStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: pulse1.value }],
    opacity: 1 - (pulse1.value - 1) * 2,
  }));

  const pulseStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: pulse2.value }],
    opacity: 1 - (pulse2.value - 1) * 2,
  }));

  const myCars = [
    { id: '1', name: 'Toyota Hilux', plate: 'GP 123-PTA', lastSeen: '2 minutes ago, Bloed St. Rank', status: 'active' },
    { id: '2', name: 'VW Polo', plate: 'GP 456-JMB', lastSeen: '1 hour ago', status: 'inactive' },
    { id: '3', name: 'Nissan NP200', plate: '785 9-TRT', lastSeen: 'Yesterday', status: 'inactive' },
  ];

  const handleReportStolen = () => {
    Alert.alert(
      "CONFIRM STOLEN ALERT",
      "This will immediately notify the police and the entire Sentinel Network. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "ACTIVATE BEACON", 
          style: "destructive",
          onPress: () => {
            // In a real app, this would call an API
            Alert.alert("BEACON ACTIVATED", "Network is now hunting for your vehicle.");
            navigation.navigate('Map');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
           <Ionicons name="menu-outline" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Typography variant="h3" style={styles.headerTitle}>COMMUNITY SHIELD</Typography>
        <TouchableOpacity>
           <Ionicons name="notifications-outline" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Custom Segmented Control Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.segmentedControl}>
          <TouchableOpacity 
            style={[styles.segment, activeTab === 'My Cars' && styles.activeSegment]}
            onPress={() => setActiveTab('My Cars')}
          >
            <Typography variant="button" style={{color: activeTab === 'My Cars' ? '#fff' : theme.colors.text.secondary, fontSize: 14}}>
              My Cars
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.segment, activeTab === 'Sentinel Network' && styles.activeSegment]}
            onPress={() => setActiveTab('Sentinel Network')}
          >
            <Typography variant="button" style={{color: activeTab === 'Sentinel Network' ? '#fff' : theme.colors.text.secondary, fontSize: 14}}>
              Sentinel Network
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Active Car Card */}
        <View style={styles.mainCardContainer}>
          <Card variant="elevated" style={styles.activeCarCard}>
            <View style={styles.cardHeader}>
              <View>
                <Typography variant="h3" style={{color: '#fff', fontWeight: 'bold'}}>{myCars[0].name} - {myCars[0].plate}</Typography>
                <Typography variant="caption" style={{color: theme.colors.text.secondary, marginTop: 4}}>LAST SEEN: {myCars[0].lastSeen}</Typography>
              </View>
              <Ionicons name="shield-checkmark" size={24} color={theme.colors.text.primary} />
            </View>

            {/* Map Preview Placeholder */}
            <View style={styles.mapPreview}>
              {/* Grid Lines */}
               <View style={styles.gridLineVertical} />
               <View style={styles.gridLineHorizontal} />
               
               {/* Map Elements */}
               <View style={styles.mapRoad} />
               <View style={styles.carIconMap}>
                  <Ionicons name="car" size={20} color="#fff" />
               </View>
               
               {/* Report Stolen Button Overlay */}
               <View style={styles.stolenButtonWrapper}>
                 <Animated.View style={[styles.rippleRing, pulseStyle1]} />
                 <Animated.View style={[styles.rippleRing, pulseStyle2]} />
                 <TouchableOpacity 
                    style={styles.stolenButton}
                    onPress={handleReportStolen}
                    activeOpacity={0.8}
                 >
                    <Ionicons name="lock-closed" size={28} color="#fff" style={styles.lockIcon}/>
                    <Typography style={styles.stolenText}>REPORT</Typography>
                    <Typography style={styles.stolenText}>STOLEN</Typography>
                 </TouchableOpacity>
               </View>
            </View>

            <View style={styles.cardActions}>
              <Button 
                title="Live View" 
                variant="ghost" 
                onPress={() => navigation.navigate('Map')} 
                style={styles.actionButton}
              />
              <View style={styles.divider} />
              <Button 
                title="Trip History" 
                variant="ghost" 
                onPress={() => {}} 
                style={styles.actionButton}
              />
            </View>
          </Card>
        </View>

        {/* Other Cars List */}
        <View style={styles.listContainer}>
          {myCars.slice(1).map(car => (
            <VehicleCard 
              key={car.id}
              name={car.name}
              plate={car.plate}
              lastSeen={`Last seen: ${car.lastSeen}`}
              status={car.status}
              onPress={() => {}}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
  },
  headerTitle: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 16,
    letterSpacing: 1,
  },
  tabContainer: {
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: 4,
    height: 48,
  },
  segment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.s,
  },
  activeSegment: {
    backgroundColor: '#334155', // Slightly lighter than surface
  },
  content: {
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
  },
  mainCardContainer: {
    marginBottom: theme.spacing.l,
  },
  activeCarCard: {
    padding: 0,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  mapPreview: {
    height: 220,
    backgroundColor: '#1e293b',
    position: 'relative',
    overflow: 'hidden',
  },
  // Simple styling to mimic map
  gridLineVertical: {
    position: 'absolute',
    left: '30%',
    width: 1,
    height: '100%',
    backgroundColor: '#334155',
  },
  gridLineHorizontal: {
    position: 'absolute',
    top: '40%',
    width: '100%',
    height: 1,
    backgroundColor: '#334155',
  },
  mapRoad: {
    position: 'absolute',
    top: '20%',
    left: '60%',
    width: 40,
    height: '100%',
    backgroundColor: '#334155',
    transform: [{ rotate: '15deg' }],
  },
  carIconMap: {
    position: 'absolute',
    top: '35%',
    left: '45%',
    backgroundColor: theme.colors.accent,
    padding: 6,
    borderRadius: 8,
    zIndex: 1,
  },
  stolenButtonWrapper: {
    position: 'absolute',
    bottom: -20, // Push it down slightly
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    zIndex: 10,
  },
  stolenButton: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.error,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
    zIndex: 20,
  },
  rippleRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: theme.colors.error,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    zIndex: 5,
  },
  lockIcon: {
    marginBottom: 4,
  },
  stolenText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.s,
    backgroundColor: theme.colors.surface,
  },
  actionButton: {
    flex: 1,
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: theme.colors.border,
  },
  listContainer: {
    marginTop: theme.spacing.s,
  },
});
