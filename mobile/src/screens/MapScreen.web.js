import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Typography } from '../components/atoms/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';

export const MapScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
         <Typography variant="h3" style={styles.headerTitle}>COMMUNITY SHIELD</Typography>
      </View>
      <View style={styles.content}>
        <Ionicons name="map-outline" size={64} color={theme.colors.text.secondary} />
        <Typography variant="h3" style={styles.message}>
          Live Tracking Not Available on Web
        </Typography>
        <Typography variant="body" style={styles.subMessage}>
          Please use the mobile app for real-time tracking and radar features.
        </Typography>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.m,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    color: '#fff',
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
  },
  message: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.s,
  },
  subMessage: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
