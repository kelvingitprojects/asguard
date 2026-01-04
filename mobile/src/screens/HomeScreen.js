import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import { Card } from '../components/atoms/Card';
import { VehicleCard } from '../components/molecules/VehicleCard';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('My Cars');

  const myCars = [
    { id: '1', name: 'Toyota Hilux', plate: 'GP 123-PTA', lastSeen: '2 minutes ago, Bloed St. Rank', status: 'active' },
    { id: '2', name: 'VW Polo', plate: 'GP 456-JMB', lastSeen: '1 hour ago', status: 'inactive' },
    { id: '3', name: 'Nissan NP200', plate: '785 9-TRT', lastSeen: 'Yesterday', status: 'inactive' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="car-sport" size={24} color={theme.colors.text.primary} />
        <Typography variant="h3" style={styles.headerTitle}>COMMUNITY SHIELD</Typography>
        <View style={{ width: 24 }} /> 
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Button 
          title="My Cars" 
          variant={activeTab === 'My Cars' ? 'primary' : 'ghost'} 
          onPress={() => setActiveTab('My Cars')}
          style={styles.tabButton}
        />
        <Button 
          title="Sentinel Network" 
          variant={activeTab === 'Sentinel Network' ? 'primary' : 'ghost'} 
          onPress={() => setActiveTab('Sentinel Network')}
          style={styles.tabButton}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Active Car Card */}
        <Card variant="elevated" style={styles.activeCarCard}>
          <View style={styles.cardHeader}>
            <View>
              <Typography variant="h3">{myCars[0].name} - {myCars[0].plate}</Typography>
              <Typography variant="caption" color="secondary">LAST SEEN: {myCars[0].lastSeen}</Typography>
            </View>
            <Ionicons name="shield-checkmark" size={24} color={theme.colors.text.primary} />
          </View>

          {/* Map Preview Placeholder */}
          <View style={styles.mapPreview}>
             {/* In real app, use Lite MapView or Image Snapshot */}
             <View style={styles.mapGrid}>
                <View style={styles.carIconMap}>
                   <Ionicons name="car" size={20} color={theme.colors.primary} />
                </View>
             </View>
             
             {/* Report Stolen Button Overlay on app. */}
             <View style={styles.stolenButtonContainer}>
               <Button 
                 title="REPORT STOLEN" 
                 variant="primary" 
                 style={styles.stolenButton}
                 onPress={() => navigation.navigate('Map')}
               />
               <Ionicons name="lock-closed" size={24} color="white" style={{position: 'absolute', top: 15}}/>
             </View>
          </View>

          <View style={styles.cardActions}>
            <Button title="Live View" variant="ghost" onPress={() => navigation.navigate('Map')} />
            <Button title="Trip History" variant="ghost" onPress={() => {}} />
          </View>
        </Card>

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
    padding: theme.spacing.m,
  },
  headerTitle: {
    textTransform: 'uppercase',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  content: {
    padding: theme.spacing.m,
  },
  activeCarCard: {
    padding: 0,
    marginBottom: theme.spacing.l,
    backgroundColor: theme.colors.surface,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
  },
  mapPreview: {
    height: 200,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mapGrid: {
    width: '100%',
    height: '100%',
    // Simple grid pattern simulation
    borderWidth: 1,
    borderColor: '#475569',
  },
  carIconMap: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 12,
  },
  stolenButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stolenButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.error,
    borderWidth: 4,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.error,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
  },
  listContainer: {
    marginTop: theme.spacing.s,
  },
});
