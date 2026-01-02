import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Typography } from '../components/atoms/Typography';
import { AlertItem } from '../components/molecules/AlertItem';
import Ionicons from '@expo/vector-icons/Ionicons';

export const AlertsScreen = ({ navigation }) => {
  const alerts = [
    {
      id: '1',
      type: 'theft',
      title: 'THEFT ALERT',
      message: 'Your Toyota Hilux is moving from Bloed St. without your phone. Tap for live map.',
      time: '2m ago',
      isNew: true,
    },
    {
      id: '2',
      type: 'movement',
      title: 'MOVEMENT ALERT',
      message: 'Your VW Polo just arrived at work (07:30)',
      time: '20m ago',
      isNew: true,
    },
    {
      id: '3',
      type: 'maintenance',
      title: 'MAINTENANCE',
      message: 'Nissan NP200 tag battery low. Please charge/replace.',
      time: 'Yesterday',
      isNew: false,
    },
    {
      id: '4',
      type: 'update',
      title: 'UPDATE',
      message: 'Your Sentinel Score increased! You earned R5 in data.',
      time: '1 days ago',
      isNew: false,
    },
    {
      id: '5',
      type: 'info',
      title: 'INFO',
      message: 'Welcome to Community Shield! Set up Geofencing for instant alerts.',
      time: '2 days ago',
      isNew: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} onPress={() => navigation.goBack()} />
        <Typography variant="h3" style={styles.headerTitle}>ALERTS</Typography>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={alerts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <AlertItem
            type={item.type}
            title={item.title}
            message={item.message}
            time={item.time}
            isNew={item.isNew}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
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
  listContent: {
    padding: theme.spacing.m,
  },
});
