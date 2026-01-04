import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from '../../theme';
import { Typography } from '../atoms/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * AlertItem Molecule
 * Displays an alert in a list
 */
export const AlertItem = ({ type, title, message, time, isNew, onPress }) => {
  const getIcon = () => {
    switch (type) {
      case 'theft': return 'alert-circle';
      case 'movement': return 'car';
      case 'maintenance': return 'construct'; // or battery-dead
      case 'update': return 'thumbs-up';
      default: return 'information-circle';
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

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.wrapper}>
      <View style={[styles.container, { borderLeftColor: getColor() }]}>
        <View style={[styles.iconBox, { backgroundColor: getColor() }]}>
          <Ionicons name={getIcon()} size={24} color="#fff" />
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <Typography variant="body" style={{ fontWeight: 'bold', color: '#fff' }}>
              {type === 'theft' ? 'THEFT ALERT' : type.toUpperCase() + ' ALERT'}
            </Typography>
            <Typography variant="caption" color="secondary">{time}</Typography>
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
  },
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    borderLeftWidth: 4,
  },
  iconBox: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  message: {
    color: theme.colors.text.secondary,
    fontSize: 14,
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
