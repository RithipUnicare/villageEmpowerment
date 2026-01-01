import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E7D32', // Forest Green
    secondary: '#8D6E63', // Brown/Earth
    tertiary: '#FFB300', // Amber/Sun
    background: '#F5F5F5',
    surface: '#FFFFFF',
    error: '#B00020',
  },
};
