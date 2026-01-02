import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '../theme';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';

export const ProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Kelvin M.',
    email: 'kelvin@example.com',
    phone: '+27 82 123 4567',
    location: 'Johannesburg, South Africa'
  });

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const InputField = ({ label, value, field, keyboardType = 'default' }) => (
    <View style={styles.inputContainer}>
      <Typography variant="caption" style={styles.inputLabel}>{label}</Typography>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(text) => setFormData({ ...formData, [field]: text })}
          keyboardType={keyboardType}
          placeholderTextColor={theme.colors.text.secondary}
        />
      ) : (
        <Typography variant="body" style={styles.inputValue}>{value}</Typography>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Typography variant="h3" style={styles.headerTitle}>PERSONAL INFO</Typography>
        <TouchableOpacity onPress={() => isEditing ? handleSave() : setIsEditing(true)}>
          <Typography variant="body" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
            {isEditing ? 'Save' : 'Edit'}
          </Typography>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={60} color="#fff" />
            {isEditing && (
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
          <Typography variant="h2" style={styles.name}>{formData.name}</Typography>
          <Typography variant="caption" style={styles.sentinelId}>Sentinel ID: #882910</Typography>
        </View>

        <View style={styles.formSection}>
          <InputField label="Full Name" value={formData.name} field="name" />
          <InputField label="Email Address" value={formData.email} field="email" keyboardType="email-address" />
          <InputField label="Phone Number" value={formData.phone} field="phone" keyboardType="phone-pad" />
          <InputField label="Location" value={formData.location} field="location" />
        </View>

        {isEditing && (
            <Button 
                variant="outline" 
                style={styles.cancelButton}
                textStyle={{ color: theme.colors.error }}
                onPress={() => setIsEditing(false)}
            >
                CANCEL
            </Button>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginLeft: -24, // Offset for back button balance if needed, but visually centered usually works with flex
  },
  content: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
    position: 'relative',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  name: {
    marginBottom: theme.spacing.xs,
  },
  sentinelId: {
    color: theme.colors.text.secondary,
  },
  formSection: {
    padding: theme.spacing.m,
  },
  inputContainer: {
    marginBottom: theme.spacing.l,
  },
  inputLabel: {
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  inputValue: {
    fontSize: 16,
    color: theme.colors.text.primary,
    paddingVertical: 8,
  },
  input: {
    fontSize: 16,
    color: theme.colors.text.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
    paddingVertical: 8,
  },
  cancelButton: {
      marginTop: theme.spacing.m,
      marginHorizontal: theme.spacing.m,
      borderColor: theme.colors.error
  }
});
