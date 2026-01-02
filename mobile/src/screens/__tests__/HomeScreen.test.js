import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HomeScreen } from '../HomeScreen';

// Mock dependencies
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, style }) => <div style={style}>{children}</div>,
}));

jest.mock('@expo/vector-icons/Ionicons', () => 'Icon');

describe('HomeScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  it('renders correctly', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    expect(getByText('COMMUNITY SHIELD')).toBeTruthy();
    expect(getByText('My Cars')).toBeTruthy();
    expect(getByText('Sentinel Network')).toBeTruthy();
  });

  it('navigates to Map when Live View is pressed', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('Live View'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Map');
  });

  it('renders vehicle list', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    // Check for active car
    expect(getByText('Toyota Hilux - GP 123-PTA')).toBeTruthy();
    // Check for other cars
    expect(getByText('VW Polo - GP 456-JMB')).toBeTruthy();
  });
});
