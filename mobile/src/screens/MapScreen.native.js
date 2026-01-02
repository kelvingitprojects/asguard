import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
  withSequence,
  Easing
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

export const MapScreen = ({ navigation }) => {
  const rippleScale = useSharedValue(1);
  const rippleOpacity = useSharedValue(0.6);

  useEffect(() => {
    rippleScale.value = withRepeat(
      withTiming(3, { duration: 2000, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
    rippleOpacity.value = withRepeat(
      withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: rippleScale.value }],
      opacity: rippleOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={Platform.OS === 'android' ? DarkMapStyle : undefined}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        initialRegion={{
          latitude: -25.5414, // Soshanguve approx
          longitude: 28.1020,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {/* Main Target Car */}
        <Marker coordinate={{ latitude: -25.5414, longitude: 28.1020 }}>
          <View style={styles.markerContainer}>
            <Animated.View style={[styles.ripple, animatedStyle]} />
            <View style={styles.carMarker}>
               <Ionicons name="car-sport" size={24} color="#fff" />
            </View>
          </View>
        </Marker>

        {/* Nearby Sentinels */}
        <Marker coordinate={{ latitude: -25.5430, longitude: 28.1040 }}>
           <View style={styles.sentinelMarker}>
             <Ionicons name="car" size={16} color={theme.colors.accent} />
           </View>
        </Marker>
        <Marker coordinate={{ latitude: -25.5400, longitude: 28.0990 }}>
           <View style={styles.sentinelMarker}>
             <Ionicons name="car" size={16} color={theme.colors.accent} />
           </View>
        </Marker>
      </MapView>

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        {/* Header */}
        <View style={styles.header}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
             <Ionicons name="menu-outline" size={28} color="#fff" />
           </TouchableOpacity>
           <Typography variant="h3" style={styles.headerTitle}>COMMUNITY SHIELD - Pretoria</Typography>
           <View style={{ width: 28 }} />
        </View>

        {/* Alert Banner */}
        <View style={styles.alertBanner}>
           <Typography style={styles.alertBannerText}>THEFT IN PROGRESS - SOSHANGUVE BLOCK L</Typography>
        </View>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Bottom Info Card */}
        <View style={styles.infoCard}>
           <View style={styles.statusRow}>
              <Typography style={styles.statusText}>Last Ping: 5 seconds ago</Typography>
              <View style={styles.statusDivider} />
              <Typography style={styles.statusText}>Speed: 45 km/h</Typography>
           </View>
        </View>

        {/* Bottom Actions */}
        <View style={styles.actionContainer}>
           <TouchableOpacity style={styles.alertButton}>
              <Ionicons name="notifications-off-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Typography style={styles.actionButtonText}>ALERT POLICE & SENTINELS</Typography>
           </TouchableOpacity>
           
           <TouchableOpacity style={styles.listenButton}>
              <Typography style={styles.actionButtonText}>REMOTE LISTEN</Typography>
           </TouchableOpacity>
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
    width: width,
    height: height,
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.s,
    backgroundColor: 'rgba(15, 23, 42, 0.8)', // Semi-transparent header
    paddingBottom: theme.spacing.m,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  alertBanner: {
    backgroundColor: theme.colors.error,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    alignItems: 'center',
    marginHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    marginTop: theme.spacing.s,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  alertBannerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  carMarker: {
    backgroundColor: theme.colors.error,
    padding: 8,
    borderRadius: 20,
    zIndex: 2,
    borderWidth: 2,
    borderColor: '#fff',
  },
  ripple: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.5)',
    zIndex: 1,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  sentinelMarker: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },
  infoCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    marginHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.m,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statusDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#64748b',
    marginHorizontal: theme.spacing.m,
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.m,
    justifyContent: 'space-between',
    gap: 12,
  },
  alertButton: {
    flex: 1.5,
    backgroundColor: theme.colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    borderBottomWidth: 4,
    borderBottomColor: '#b91c1c', // Darker red
  },
  listenButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
