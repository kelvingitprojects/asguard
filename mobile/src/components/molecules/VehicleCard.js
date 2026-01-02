import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from '../../theme';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import Ionicons from '@expo/vector-icons/Ionicons';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/**
 * VehicleCard Molecule
 * Displays vehicle information in a list with expandable details
 */
export const VehicleCard = ({ name, plate, lastSeen, status = 'active', onPress }) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
    if (onPress) onPress();
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7} style={styles.container}>
        <View style={styles.iconContainer}>
           <View style={[styles.statusIndicator, { backgroundColor: status === 'active' ? theme.colors.success : theme.colors.error }]} />
        </View>
        <View style={styles.infoContainer}>
          <Typography variant="body" style={styles.title}>{name} - {plate}</Typography>
          <Typography variant="caption" color="secondary">{lastSeen}</Typography>
        </View>
        <Ionicons 
          name={expanded ? "chevron-down" : "chevron-forward"} 
          size={20} 
          color={theme.colors.text.secondary} 
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons name="battery-half" size={16} color={theme.colors.text.secondary} />
              <Typography variant="caption" style={styles.detailText}>Battery: 78%</Typography>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="bluetooth" size={16} color={theme.colors.text.secondary} />
              <Typography variant="caption" style={styles.detailText}>Tag: {status === 'active' ? 'Connected' : 'Offline'}</Typography>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons name="shield-checkmark-outline" size={16} color={theme.colors.success} />
              <Typography variant="caption" style={styles.detailText}>Insurance: Active</Typography>
            </View>
          </View>

          <View style={styles.actions}>
            <Button 
              title="View History" 
              variant="outline" 
              style={{ flex: 1, marginRight: 8, height: 40 }} 
              textStyle={{ fontSize: 12 }}
            />
             <Button 
              title="Locate" 
              variant="primary" 
              style={{ flex: 1, height: 40 }}
              textStyle={{ fontSize: 12 }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
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
    color: theme.colors.text.primary,
  },
  detailsContainer: {
    paddingLeft: 28 + theme.spacing.m, // Align with text
    paddingBottom: theme.spacing.m,
    paddingRight: theme.spacing.s,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    marginLeft: 6,
    color: theme.colors.text.secondary,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
  }
});

VehicleCard.propTypes = {
  name: PropTypes.string.isRequired,
  plate: PropTypes.string.isRequired,
  lastSeen: PropTypes.string.isRequired,
  status: PropTypes.string,
  onPress: PropTypes.func,
};
