import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const DarkMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#242f3e" }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#746855" }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#242f3e" }]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#d59563" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#d59563" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{ "color": "#263c3f" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#6b9a76" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#38414e" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#212a37" }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#9ca5b3" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{ "color": "#746855" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#1f2835" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#f3d19c" }]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{ "color": "#2f3948" }]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#d59563" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#17263c" }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#515c6d" }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#17263c" }]
  }
];

const RadarRing = ({ delay }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(4, { duration: 2000 }),
        withTiming(0, { duration: 0 })
      ),
      -1,
      false
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 2000 }),
        withTiming(1, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.radarRing, animatedStyle]} />
  );
};

export const MapScreen = ({ navigation }) => {
  const initialRegion = {
    latitude: -25.7479, // Pretoria
    longitude: 28.2293,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={DarkMapStyle}
        initialRegion={initialRegion}
      >
        <Marker coordinate={{ latitude: -25.7479, longitude: 28.2293 }}>
          <View style={styles.markerContainer}>
             <Ionicons name="car" size={24} color={theme.colors.text.primary} />
          </View>
        </Marker>
        {/* Radar Effect around marker - This needs to be absolute positioned over the map relative to screen or marker view */}
      </MapView>
      
      {/* Radar Overlay Center Screen (Simplified for Demo) */}
      <View style={styles.radarContainer}>
         <RadarRing delay={0} />
         <RadarRing delay={1000} />
      </View>

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        {/* Header */}
        <View style={styles.header}>
           <View style={styles.menuButton}>
             <Ionicons name="menu" size={24} color="white" />
           </View>
           <Typography variant="h3" style={styles.headerTitle}>COMMUNITY SHIELD - Pretoria</Typography>
        </View>

        {/* Theft Alert Banner */}
        <View style={styles.alertBanner}>
          <Typography variant="body" style={{ fontWeight: 'bold', color: 'white' }}>
            THEFT IN PROGRESS - SOSHANGUVE BLOCK L
          </Typography>
        </View>

        {/* Bottom Sheet Info */}
        <View style={styles.bottomSheet}>
          <View style={styles.infoRow}>
            <View>
              <Typography variant="caption" color="secondary">Last Ping: 5 seconds ago</Typography>
              <Typography variant="body" style={{ fontWeight: 'bold' }}>Speed: 45 km/h</Typography>
            </View>
            <View style={styles.signalIcon}>
              <Ionicons name="cellular" size={20} color={theme.colors.success} />
            </View>
          </View>
          
          <View style={styles.actionButtons}>
             <Button 
               title="ALERT POLICE & SENTINELS" 
               variant="primary" 
               style={{ flex: 1, marginRight: 8, backgroundColor: theme.colors.error }}
               onPress={() => {}}
             />
             <Button 
               title="REMOTE LISTEN" 
               variant="secondary" 
               style={{ flex: 1, marginLeft: 8, backgroundColor: theme.colors.surface }}
               onPress={() => {}}
             />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    backgroundColor: theme.colors.error,
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  radarContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.colors.error,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  menuButton: {
    marginRight: theme.spacing.m,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
  },
  alertBanner: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.s,
    marginHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
    marginTop: theme.spacing.s,
  },
  bottomSheet: {
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    padding: theme.spacing.m,
    borderTopLeftRadius: theme.borderRadius.l,
    borderTopRightRadius: theme.borderRadius.l,
    margin: theme.spacing.m,
    marginBottom: theme.spacing.xl, // Space for bottom tabs
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.m,
    paddingBottom: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  actionButtons: {
    flexDirection: 'row',
  },
});
