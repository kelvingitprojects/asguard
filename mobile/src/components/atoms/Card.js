import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from '../../theme';

/**
 * Card Component
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {object} props.style - Additional styles
 * @param {string} props.variant - 'default' | 'elevated' | 'outlined'
 */
export const Card = ({ children, style, variant = 'default', ...props }) => {
  return (
    <View 
      style={[
        styles.container,
        variant === 'elevated' && theme.shadows.medium,
        variant === 'outlined' && styles.outlined,
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    overflow: 'hidden',
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'transparent',
  },
});

Card.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  variant: PropTypes.oneOf(['default', 'elevated', 'outlined']),
};
