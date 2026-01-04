import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from '../../theme';
import { Typography } from '../atoms/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * VehicleCard Molecule
 * Displays vehicle information in a list
 */
export const VehicleCard = ({ name, plate, lastSeen, status = 'active', onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
           {/* Placeholder for car icon if we had SVG, using circle for now */}
           <View style={[styles.statusIndicator, { backgroundColor: status === 'active' ? theme.colors.text.secondary : theme.colors.error }]} />
        </View>
        <View style={styles.infoContainer}>
          <Typography variant="body" style={styles.title}>{name} - {plate}</Typography>
          <Typography variant="caption" color="secondary">{lastSeen}</Typography>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.colors.text.secondary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  iconContainer: {
    marginRight: theme.spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
});

VehicleCard.propTypes = {
  name: PropTypes.string.isRequired,
  plate: PropTypes.string.isRequired,
  lastSeen: PropTypes.string.isRequired,
  status: PropTypes.string,
  onPress: PropTypes.func,
};
