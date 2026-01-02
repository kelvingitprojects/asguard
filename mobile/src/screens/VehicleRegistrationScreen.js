import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import Ionicons from '@expo/vector-icons/Ionicons';

export const VehicleRegistrationScreen = ({ navigation }) => {
  const [step, setStep] = useState(1); // 1: Details, 2: Bonding
  const [vehicle, setVehicle] = useState({
    make: '',
    model: '',
    color: '',
    plate: '',
  });
  const [isScanning, setIsScanning] = useState(false);

  const handleRegister = () => {
    if (!vehicle.make || !vehicle.model || !vehicle.plate) {
      Alert.alert('Missing Details', 'Please fill in all vehicle information.');
      return;
    }
    setStep(2);
  };

  const startBonding = () => {
    setIsScanning(true);
    // Simulate BLE Scan duration
    setTimeout(() => {
      setIsScanning(false);
      Alert.alert(
        "Tag Detected!",
        "Guardian Tag [MAC: XX:XX:XX:XX] bonded successfully.",
        [
          { text: "Finish", onPress: () => navigation.navigate('Home', { newVehicle: vehicle }) }
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} onPress={() => navigation.goBack()} />
        <Typography variant="h3" style={styles.headerTitle}>ADD VEHICLE</Typography>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {step === 1 ? (
          <>
            <View style={styles.progressContainer}>
              <View style={[styles.stepDot, styles.activeStep]} />
              <View style={styles.stepLine} />
              <View style={styles.stepDot} />
            </View>
            <Typography variant="h2" style={styles.title}>Vehicle Details</Typography>
            <Typography variant="body" color="secondary" style={styles.subtitle}>
              Enter your vehicle information to create its digital twin.
            </Typography>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Typography variant="caption" style={styles.label}>MAKE</Typography>
                <TextInput 
                  style={styles.input} 
                  placeholder="e.g. Toyota" 
                  placeholderTextColor={theme.colors.text.disabled}
                  value={vehicle.make}
                  onChangeText={(t) => setVehicle({...vehicle, make: t})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Typography variant="caption" style={styles.label}>MODEL</Typography>
                <TextInput 
                  style={styles.input} 
                  placeholder="e.g. Hilux" 
                  placeholderTextColor={theme.colors.text.disabled}
                  value={vehicle.model}
                  onChangeText={(t) => setVehicle({...vehicle, model: t})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Typography variant="caption" style={styles.label}>COLOR</Typography>
                <TextInput 
                  style={styles.input} 
                  placeholder="e.g. White" 
                  placeholderTextColor={theme.colors.text.disabled}
                  value={vehicle.color}
                  onChangeText={(t) => setVehicle({...vehicle, color: t})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Typography variant="caption" style={styles.label}>NUMBER PLATE</Typography>
                <TextInput 
                  style={styles.input} 
                  placeholder="e.g. AA 12 BB GP" 
                  placeholderTextColor={theme.colors.text.disabled}
                  value={vehicle.plate}
                  onChangeText={(t) => setVehicle({...vehicle, plate: t})}
                  autoCapitalize="characters"
                />
              </View>
            </View>

            <Button onPress={handleRegister} style={styles.button}>
              NEXT STEP
            </Button>
          </>
        ) : (
          <>
             <View style={styles.progressContainer}>
              <View style={[styles.stepDot, styles.completedStep]} />
              <View style={[styles.stepLine, styles.completedLine]} />
              <View style={[styles.stepDot, styles.activeStep]} />
            </View>
            <Typography variant="h2" style={styles.title}>Bond Guardian Tag</Typography>
            <Typography variant="body" color="secondary" style={styles.subtitle}>
              Turn on your vehicle's ignition and hold your phone near the dashboard.
            </Typography>

            <View style={styles.scanContainer}>
              <View style={[styles.scanCircle, isScanning && styles.scanning]}>
                <Ionicons name="bluetooth" size={64} color={isScanning ? "#fff" : theme.colors.primary} />
              </View>
              {isScanning && (
                <Typography variant="caption" style={styles.scanningText}>Searching for Guardian Tag...</Typography>
              )}
            </View>

            <Button onPress={startBonding} disabled={isScanning} style={styles.button}>
              {isScanning ? 'SCANNING...' : 'SCAN TAG QR CODE'}
            </Button>
          </>
        )}
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
  content: {
    padding: theme.spacing.l,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.text.disabled,
  },
  activeStep: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  completedStep: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: theme.colors.surface,
  },
  completedLine: {
    backgroundColor: theme.colors.success,
  },
  title: {
    marginBottom: theme.spacing.s,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  form: {
    marginBottom: theme.spacing.l,
  },
  inputGroup: {
    marginBottom: theme.spacing.m,
  },
  label: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.text.secondary,
  },
  input: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    color: theme.colors.text.primary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  button: {
    marginTop: theme.spacing.m,
  },
  scanContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  scanCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginBottom: theme.spacing.m,
  },
  scanning: {
    backgroundColor: theme.colors.primary,
    borderColor: '#fff',
  },
  scanningText: {
    color: theme.colors.primary,
    marginTop: theme.spacing.s,
  },
});
