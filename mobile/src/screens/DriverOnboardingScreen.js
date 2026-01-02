import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { permissionService } from '../services/PermissionService';

const { width } = Dimensions.get('window');

export const DriverOnboardingScreen = ({ navigation }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Earn Passive Income",
      description: "Just turn on 'Guard Mode' and drive. You earn R49 base pay daily plus up to R150 in bonuses for network coverage.",
      icon: "wallet-outline",
      action: "Next",
      onAction: () => setStep(1)
    },
    {
      title: "Always On Guard",
      description: "To catch stolen vehicles, Asguard needs to scan even when your phone is in your pocket. Please set Location to 'Always Allow'.",
      icon: "location-outline",
      action: "Grant Location",
      onAction: async () => {
        await permissionService.requestLocationPermission();
        await permissionService.requestBackgroundLocation();
        setStep(2);
      }
    },
    {
      title: "Stay Active",
      description: "Don't let your phone put us to sleep. Exclude Asguard from Battery Optimization to ensure you never miss a bounty.",
      icon: "battery-charging-outline",
      action: "Fix Battery Settings",
      onAction: async () => {
        await permissionService.requestBatteryOptimization();
        setStep(3);
      }
    },
    {
      title: "You're Ready",
      description: "Hit the road and start earning. Remember to keep Bluetooth on!",
      icon: "checkmark-circle-outline",
      action: "Start Guarding",
      onAction: () => navigation.replace('DriverDashboard')
    }
  ];

  const currentStep = steps[step];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name={currentStep.icon} size={80} color={theme.colors.primary} />
        </View>
        
        <Typography variant="h1" style={styles.title}>{currentStep.title}</Typography>
        <Typography variant="body" style={styles.description}>{currentStep.description}</Typography>

        <View style={styles.dotsContainer}>
          {steps.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.dot, 
                index === step && styles.activeDot
              ]} 
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button 
          variant="primary" 
          title={currentStep.action} 
          onPress={currentStep.onAction}
          style={styles.button}
        />
        {step < 3 && (
            <Button 
                variant="outline" 
                title="Skip (Dev Only)" 
                onPress={() => navigation.replace('DriverDashboard')}
                style={{ marginTop: 12, borderColor: 'transparent' }}
                textStyle={{ color: theme.colors.text.secondary, fontSize: 12 }}
            />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.medium,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.m,
    color: theme.colors.text.primary,
  },
  description: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
    lineHeight: 24,
    maxWidth: width * 0.8,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: theme.spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.border,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: theme.colors.primary,
    width: 24,
  },
  footer: {
    padding: theme.spacing.xl,
  },
  button: {
    width: '100%',
  }
});
