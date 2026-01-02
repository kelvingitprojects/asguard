import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';

export const LoginScreen = () => {
  const { login, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null); // 'owner' | 'driver'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!selectedRole) return;
    login(selectedRole);
  };

  const renderRoleSelection = () => (
    <View style={styles.roleContainer}>
      <Typography variant="h2" style={styles.title}>Welcome to Asguard</Typography>
      <Typography variant="body" style={styles.subtitle}>Choose your role to continue</Typography>
      
      <TouchableOpacity 
        style={[styles.roleCard, selectedRole === 'owner' && styles.roleCardActive]}
        onPress={() => setSelectedRole('owner')}
      >
        <View style={[styles.iconContainer, selectedRole === 'owner' && styles.iconContainerActive]}>
          <Ionicons name="car-sport" size={32} color={selectedRole === 'owner' ? '#fff' : theme.colors.primary} />
        </View>
        <View>
          <Typography variant="h3" style={selectedRole === 'owner' ? styles.textActive : styles.textInactive}>Vehicle Owner</Typography>
          <Typography variant="caption" style={selectedRole === 'owner' ? styles.textActive : styles.textInactive}>Protect your assets</Typography>
        </View>
        {selectedRole === 'owner' && <Ionicons name="checkmark-circle" size={24} color="#fff" style={styles.checkIcon} />}
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.roleCard, selectedRole === 'driver' && styles.roleCardActive]}
        onPress={() => setSelectedRole('driver')}
      >
        <View style={[styles.iconContainer, selectedRole === 'driver' && styles.iconContainerActive]}>
          <Ionicons name="shield-checkmark" size={32} color={selectedRole === 'driver' ? '#fff' : theme.colors.secondary} />
        </View>
        <View>
          <Typography variant="h3" style={selectedRole === 'driver' ? styles.textActive : styles.textInactive}>Sentinel Driver</Typography>
          <Typography variant="caption" style={selectedRole === 'driver' ? styles.textActive : styles.textInactive}>Earn by protecting</Typography>
        </View>
        {selectedRole === 'driver' && <Ionicons name="checkmark-circle" size={24} color="#fff" style={styles.checkIcon} />}
      </TouchableOpacity>
    </View>
  );

  const renderLoginForm = () => (
    <View style={styles.formContainer}>
       <View style={styles.inputGroup}>
         <Typography variant="caption" style={styles.label}>EMAIL</Typography>
         <TextInput 
           style={styles.input} 
           placeholder={selectedRole === 'driver' ? "driver@asguard.app" : "user@example.com"}
           placeholderTextColor={theme.colors.text.disabled}
           value={email}
           onChangeText={setEmail}
           autoCapitalize="none"
           keyboardType="email-address"
         />
       </View>
       <View style={styles.inputGroup}>
         <Typography variant="caption" style={styles.label}>PASSWORD</Typography>
         <TextInput 
           style={styles.input} 
           placeholder="••••••••"
           placeholderTextColor={theme.colors.text.disabled}
           value={password}
           onChangeText={setPassword}
           secureTextEntry
         />
       </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
             <Ionicons name="shield" size={60} color={theme.colors.primary} />
             <Typography variant="h1" style={styles.appName}>ASGUARD</Typography>
          </View>

          {renderRoleSelection()}

          {selectedRole && renderLoginForm()}

          <View style={styles.footer}>
             <Button 
               variant="primary" 
               title={isLoading ? "Logging in..." : "LOGIN"}
               onPress={handleLogin}
               disabled={!selectedRole || isLoading}
               style={styles.loginButton}
             />
             <TouchableOpacity onPress={() => {}}>
               <Typography variant="caption" style={styles.forgotPassword}>Forgot Password?</Typography>
             </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    padding: theme.spacing.l,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  appName: {
    letterSpacing: 4,
    marginTop: theme.spacing.s,
    color: theme.colors.text.primary,
  },
  roleContainer: {
    marginBottom: theme.spacing.l,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.l,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: 'relative',
  },
  roleCardActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  iconContainerActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  textActive: {
    color: '#fff',
  },
  textInactive: {
    color: theme.colors.text.primary,
  },
  checkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  formContainer: {
    marginBottom: theme.spacing.l,
  },
  inputGroup: {
    marginBottom: theme.spacing.m,
  },
  label: {
    marginBottom: 4,
    color: theme.colors.text.secondary,
  },
  input: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    color: theme.colors.text.primary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  footer: {
    marginTop: theme.spacing.m,
  },
  loginButton: {
    marginBottom: theme.spacing.m,
  },
  forgotPassword: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
    textDecorationLine: 'underline',
  },
});
