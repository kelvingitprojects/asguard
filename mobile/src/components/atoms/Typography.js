import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from '../../theme';

/**
 * Typography Component
 * @param {object} props
 * @param {string} props.variant - 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button'
 * @param {string} props.color - Color key from theme or hex code
 * @param {object} props.style - Additional styles
 * @param {React.ReactNode} props.children
 */
export const Typography = ({ variant = 'body', color = 'primary', style, children, ...props }) => {
  const textColor = theme.colors.text[color] || theme.colors[color] || color;
  
  return (
    <Text 
      style={[
        theme.typography[variant],
        { color: textColor },
        style
      ]} 
      {...props}
    >
      {children}
    </Text>
  );
};

Typography.propTypes = {
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'body', 'caption', 'button']),
  color: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node.isRequired,
};
