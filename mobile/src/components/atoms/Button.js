import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from '../../theme';
import { Typography } from './Typography';

/**
 * Button Component
 * @param {object} props
 * @param {string} props.title - Button text
 * @param {function} props.onPress - Click handler
 * @param {string} props.variant - 'primary' | 'secondary' | 'outline' | 'ghost'
 * @param {string} props.size - 'small' | 'medium' | 'large'
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @param {object} props.style - Additional styles
 */
export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  children,
  ...props 
}) => {
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.text.secondary;
    if (variant === 'outline' || variant === 'ghost') return 'transparent';
    return theme.colors[variant] || theme.colors.primary;
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.surface;
    if (variant === 'outline' || variant === 'ghost') return theme.colors.primary;
    return theme.colors.text.primary;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        variant === 'outline' && styles.outline,
        styles[size],
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {children ? children : (
            <Typography 
              variant="button" 
              color={variant === 'outline' || variant === 'ghost' ? 'primary' : 'primary'}
              style={{ color: getTextColor() }}
            >
              {title}
            </Typography>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outline: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  small: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.m,
  },
  medium: {
    paddingVertical: theme.spacing.s + 4,
    paddingHorizontal: theme.spacing.l,
  },
  large: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.xl,
  },
  disabled: {
    opacity: 0.5,
  },
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
