import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '../theme';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';

export const SubscriptionScreen = ({ navigation }) => {
  const features = [
    'Unlimited Background Scanning',
    'Priority Network Alerts',
    'Advanced Vehicle Analytics',
    'Theft Recovery Assistance',
    'Family Account (up to 5 devices)'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Typography variant="h3" style={styles.headerTitle}>SUBSCRIPTION</Typography>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.planHeader}>
            <View>
              <Typography variant="caption" style={styles.planLabel}>CURRENT PLAN</Typography>
              <Typography variant="h2" style={styles.planName}>Premium Sentinel</Typography>
            </View>
            <Ionicons name="shield-checkmark" size={40} color={theme.colors.primary} />
          </View>
          
          <View style={styles.priceContainer}>
            <Typography variant="h1" style={styles.price}>$9.99</Typography>
            <Typography variant="body" style={styles.period}>/ month</Typography>
          </View>

          <View style={styles.divider} />

          <Typography variant="caption" style={styles.nextBilling}>Next billing date: Feb 02, 2026</Typography>
        </View>

        <Typography variant="h3" style={styles.sectionTitle}>Included Features</Typography>
        
        <View style={styles.featuresList}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
              <Typography variant="body" style={styles.featureText}>{feature}</Typography>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
            <Button 
                variant="primary" 
                title="Manage Subscription" 
                onPress={() => {}} 
                style={styles.actionButton}
            />
            <Button 
                variant="outline" 
                title="Cancel Subscription" 
                textStyle={{ color: theme.colors.error }}
                style={[styles.actionButton, { borderColor: theme.colors.error }]}
                onPress={() => {}} 
            />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: theme.spacing.m,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.l,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.medium,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.m,
  },
  planLabel: {
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  planName: {
    color: theme.colors.primary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: theme.spacing.m,
  },
  price: {
    fontSize: 48,
    color: theme.colors.text.primary,
    fontWeight: 'bold',
  },
  period: {
    color: theme.colors.text.secondary,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.m,
  },
  nextBilling: {
    color: theme.colors.text.secondary,
  },
  sectionTitle: {
    marginBottom: theme.spacing.m,
  },
  featuresList: {
    marginBottom: theme.spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  featureText: {
    marginLeft: theme.spacing.s,
    color: theme.colors.text.primary,
  },
  actions: {
      gap: theme.spacing.m
  },
  actionButton: {
      marginBottom: theme.spacing.m
  }
});
