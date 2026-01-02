import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../atoms/Typography';
import { theme } from '../../../theme';

export const DriverMap = () => {
  return (
    <View style={[styles.map, { backgroundColor: '#242f3e', justifyContent: 'center', alignItems: 'center' }]}>
      <Typography variant="body" style={{ color: '#fff' }}>Map not supported in Web Preview</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
