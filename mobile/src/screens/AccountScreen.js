import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, LayoutAnimation, Platform, UIManager, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const MenuItem = ({ icon, label, value, onPress, isDestructive, children }) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    if (children) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    }
    if (onPress) onPress();
  };

  return (
    <View style={styles.menuItemWrapper}>
      <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
        <View style={styles.menuIconContainer}>
          <Ionicons name={icon} size={24} color={isDestructive ? theme.colors.error : theme.colors.primary} />
        </View>
        <View style={styles.menuContent}>
          <Typography variant="body" style={[styles.menuLabel, isDestructive && { color: theme.colors.error }]}>
            {label}
          </Typography>
          {value && <Typography variant="caption" style={styles.menuValue}>{value}</Typography>}
        </View>
        <Ionicons 
          name={children && expanded ? "chevron-down" : "chevron-forward"} 
          size={20} 
          color={theme.colors.text.secondary} 
        />
      </TouchableOpacity>
      {expanded && children && (
        <View style={styles.menuChildren}>
          {children}
        </View>
      )}
    </View>
  );
};

const ToggleItem = ({ label, value, onValueChange }) => (
  <View style={styles.toggleItem}>
    <Typography variant="body" style={styles.toggleLabel}>{label}</Typography>
    <Switch 
      value={value} 
      onValueChange={onValueChange}
      trackColor={{ false: theme.colors.border, true: theme.colors.success }}
      thumbColor={'#fff'}
    />
  </View>
);

export const AccountScreen = ({ navigation }) => {
  const { logout } = useAuth();
  // Preferences State
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false
  });
  const [security, setSecurity] = useState({
    biometric: true,
    twoFactor: false
  });
  const [language, setLanguage] = useState('English');

  const languages = ['English', 'IsiZulu', 'Afrikaans', 'Sepedi'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Typography variant="h3" style={styles.headerTitle}>ACCOUNT</Typography>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>
          <View style={styles.profileInfo}>
            <Typography variant="h3" style={styles.profileName}>Kelvin M.</Typography>
            <Typography variant="caption" style={styles.profileStatus}>PREMIUM SENTINEL</Typography>
          </View>
          <View style={styles.scoreContainer}>
            <Typography variant="h2" style={styles.scoreValue}>850</Typography>
            <Typography variant="caption" style={styles.scoreLabel}>SCORE</Typography>
          </View>
        </View>

        {/* Section: General */}
        <Typography variant="caption" style={styles.sectionTitle}>GENERAL</Typography>
        <View style={styles.section}>
          <MenuItem 
            icon="person-outline" 
            label="Personal Information" 
            onPress={() => navigation.navigate('Profile')} 
          />
          <MenuItem 
            icon="car-sport-outline" 
            label="My Vehicles" 
            value="2 Active" 
            onPress={() => navigation.navigate('VehicleRegistration')} 
          />
          <MenuItem 
            icon="card-outline" 
            label="Subscription" 
            value="Premium" 
            onPress={() => navigation.navigate('Subscription')} 
          />
        </View>

        {/* Section: Partner */}
        <Typography variant="caption" style={styles.sectionTitle}>PARTNER</Typography>
        <View style={styles.section}>
          <MenuItem 
            icon="shield-checkmark" 
            label="Switch to Driver Account" 
            value="Log in as Sentinel" 
            onPress={() => {
                Alert.alert(
                    "Switch Account",
                    "You need to log in with a Driver account to access the dashboard. Continue?",
                    [
                        { text: "Cancel", style: "cancel" },
                        { text: "Switch", onPress: logout }
                    ]
                );
            }} 
          />
        </View>

        {/* Section: Preferences */}
        <Typography variant="caption" style={styles.sectionTitle}>PREFERENCES</Typography>
        <View style={styles.section}>
          <MenuItem icon="notifications-outline" label="Notifications">
             <ToggleItem 
               label="Push Notifications" 
               value={notifications.push} 
               onValueChange={v => setNotifications({...notifications, push: v})} 
             />
             <ToggleItem 
               label="Email Alerts" 
               value={notifications.email} 
               onValueChange={v => setNotifications({...notifications, email: v})} 
             />
             <ToggleItem 
               label="SMS Alerts" 
               value={notifications.sms} 
               onValueChange={v => setNotifications({...notifications, sms: v})} 
             />
          </MenuItem>

          <MenuItem icon="shield-checkmark-outline" label="Security & Privacy">
             <ToggleItem 
               label="Biometric Login" 
               value={security.biometric} 
               onValueChange={v => setSecurity({...security, biometric: v})} 
             />
             <ToggleItem 
               label="Two-Factor Auth" 
               value={security.twoFactor} 
               onValueChange={v => setSecurity({...security, twoFactor: v})} 
             />
             <Button 
               title="Change Password" 
               variant="outline" 
               style={{ marginTop: 12 }} 
               textStyle={{ fontSize: 14 }}
               onPress={() => Alert.alert("Reset Password", "A reset link has been sent to your email.")}
             />
          </MenuItem>

          <MenuItem icon="globe-outline" label="Language" value={language}>
             {languages.map(lang => (
               <TouchableOpacity 
                 key={lang} 
                 style={styles.languageOption}
                 onPress={() => setLanguage(lang)}
               >
                 <Typography variant="body" style={{ color: language === lang ? theme.colors.primary : theme.colors.text.primary }}>
                   {lang}
                 </Typography>
                 {language === lang && <Ionicons name="checkmark" size={20} color={theme.colors.primary} />}
               </TouchableOpacity>
             ))}
          </MenuItem>
        </View>

        {/* Section: Support */}
        <Typography variant="caption" style={styles.sectionTitle}>SUPPORT</Typography>
        <View style={styles.section}>
          <MenuItem icon="help-circle-outline" label="Help Center">
             <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('StaticContent', {
                title: 'Help Center',
                type: 'faq',
                content: [
                    { question: 'How does Asguard work?', answer: 'Asguard uses a community network of Bluetooth sensors to locate stolen vehicles. When you report a vehicle stolen, all nearby users receive an alert.' },
                    { question: 'Is my data safe?', answer: 'Yes, all location data is anonymized and encrypted. We only share location data when a theft is reported and verified.' },
                    { question: 'How do I report a theft?', answer: 'Use the "Report Stolen" button on the Home screen. This will notify all nearby users and local authorities.' },
                    { question: 'What is a Sentinel Score?', answer: 'Your Sentinel Score reflects your contribution to the network. You earn points by keeping your app active and verifying alerts.' }
                ]
             })}>
                <Typography variant="body" style={styles.subMenuText}>Frequently Asked Questions</Typography>
                <Ionicons name="open-outline" size={16} color={theme.colors.text.secondary} />
             </TouchableOpacity>
             <TouchableOpacity style={styles.subMenuItem} onPress={() => Linking.openURL('mailto:support@asguard.app')}>
                <Typography variant="body" style={styles.subMenuText}>Contact Support</Typography>
                <Ionicons name="chatbubble-ellipses-outline" size={16} color={theme.colors.text.secondary} />
             </TouchableOpacity>
             <TouchableOpacity style={styles.subMenuItem} onPress={() => Linking.openURL('mailto:bugs@asguard.app?subject=Bug Report')}>
                <Typography variant="body" style={styles.subMenuText}>Report a Bug</Typography>
                <Ionicons name="bug-outline" size={16} color={theme.colors.text.secondary} />
             </TouchableOpacity>
          </MenuItem>

          <MenuItem icon="information-circle-outline" label="About Asguard" value="v1.0.0">
             <View style={styles.aboutContainer}>
               <Typography variant="caption" style={styles.aboutText}>
                 Asguard Community Shield is a decentralized vehicle recovery network powered by the people.
               </Typography>
               <View style={styles.divider} />
               <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('StaticContent', {
                   title: 'Terms of Service',
                   content: ' TERMS OF SERVICE\n\n1. ACCEPTANCE OF TERMS\nBy accessing and using Asguard, you accept and agree to be bound by the terms and provision of this agreement.\n\n2. USE OF SERVICE\nYou agree to use the service only for lawful purposes. You are prohibited from using the service to harass, abuse, or harm another person.\n\n3. PRIVACY\nYour privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.\n\n4. DISCLAIMER\nAsguard is a community-based tool and does not guarantee the recovery of stolen vehicles. We are not liable for any damages or losses.'
               })}>
                  <Typography variant="body" style={styles.subMenuText}>Terms of Service</Typography>
                  <Ionicons name="chevron-forward" size={16} color={theme.colors.text.secondary} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('StaticContent', {
                   title: 'Privacy Policy',
                   content: ' PRIVACY POLICY\n\n1. INFORMATION COLLECTION\nWe collect location data to help locate stolen vehicles. This data is anonymized.\n\n2. DATA USAGE\nWe use your data to improve our services and to alert you of nearby threats.\n\n3. DATA SHARING\nWe do not sell your personal data to third parties. We may share anonymized data with law enforcement in the event of a theft.'
               })}>
                  <Typography variant="body" style={styles.subMenuText}>Privacy Policy</Typography>
                  <Ionicons name="chevron-forward" size={16} color={theme.colors.text.secondary} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('StaticContent', {
                   title: 'Open Source Licenses',
                   type: 'license',
                   content: [
                       { name: 'React Native', text: 'MIT License' },
                       { name: 'Expo', text: 'MIT License' },
                       { name: 'React Navigation', text: 'MIT License' },
                       { name: 'WatermelonDB', text: 'MIT License' }
                   ]
               })}>
                  <Typography variant="body" style={styles.subMenuText}>Open Source Licenses</Typography>
                  <Ionicons name="chevron-forward" size={16} color={theme.colors.text.secondary} />
               </TouchableOpacity>
             </View>
          </MenuItem>
        </View>

        <Button 
          variant="outline" 
          style={styles.logoutButton}
          textStyle={{ color: theme.colors.error }}
          onPress={logout}
        >
          LOG OUT
        </Button>
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
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    alignItems: 'center',
  },
  headerTitle: {
    textTransform: 'uppercase',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.m,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.l,
    ...theme.shadows.medium,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    marginBottom: 4,
  },
  profileStatus: {
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.s,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  scoreValue: {
    color: theme.colors.primary,
  },
  scoreLabel: {
    fontSize: 10,
  },
  sectionTitle: {
    marginLeft: theme.spacing.s,
    marginBottom: theme.spacing.s,
    marginTop: theme.spacing.s,
    color: theme.colors.text.secondary,
  },
  section: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    marginBottom: theme.spacing.m,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  menuItemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuChildren: {
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.m,
    paddingLeft: 32 + theme.spacing.m + theme.spacing.m, // Align with text
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  toggleLabel: {
    color: theme.colors.text.secondary,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  subMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  subMenuText: {
    color: theme.colors.text.primary,
    fontSize: 14,
  },
  aboutContainer: {
    paddingTop: 8,
  },
  aboutText: {
    color: theme.colors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: 4,
  },
  menuIconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontWeight: '500',
  },
  menuValue: {
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  logoutButton: {
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.xl,
    borderColor: theme.colors.error,
  },
});
