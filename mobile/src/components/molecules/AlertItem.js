import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from '../../theme';
import { Typography } from '../atoms/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * AlertItem Molecule
 * Displays an alert in a list with enterprise styling
 */
export const AlertItem = ({ type, title, message, time, isNew, onPress }) => {
  const getIcon = () => {
    switch (type) {
      case 'theft': return 'alert-circle-outline';
      case 'movement': return 'car-sport-outline';
      case 'maintenance': return 'battery-dead-outline';
      case 'update': return 'thumbs-up-outline';
      default: return 'information-circle-outline';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'theft': return theme.colors.error;
      case 'movement': return theme.colors.info;
      case 'maintenance': return theme.colors.warning;
      case 'update': return theme.colors.success;
      default: return theme.colors.text.secondary;
    }
  };

  const color = getColor();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.wrapper}>
      <View style={styles.container}>
        {/* Left Color Block */}
        <View style={[styles.iconBox, { backgroundColor: color }]}>
          <Ionicons name={getIcon()} size={28} color="#fff" />
        </View>

        {/* Right Content */}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Typography variant="body" style={[styles.title, { color: color }]}>
              {type === 'theft' ? 'THEFT ALERT:' : 
               type === 'movement' ? 'MOVEMENT ALERT' :
               type === 'maintenance' ? 'MAINTENANCE:' :
               type === 'update' ? 'UPDATE:' : 'INFO:'}
            </Typography>
            <Typography variant="caption" style={styles.time}>{time}</Typography>
          </View>
          
          <Typography variant="body" style={styles.message} numberOfLines={3}>
            {message}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.m,
    ...theme.shadows.small,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    minHeight: 100,
  },
  iconBox: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: theme.spacing.m,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    marginRight: theme.spacing.s,
  },
  time: {
    color: theme.colors.text.secondary,
    fontSize: 12,
  },
  message: {
    color: theme.colors.text.primary,
    fontSize: 14,
    lineHeight: 20,
  },
});

AlertItem.propTypes = {
  type: PropTypes.oneOf(['theft', 'movement', 'maintenance', 'update', 'info']).isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  onPress: PropTypes.func,
};
