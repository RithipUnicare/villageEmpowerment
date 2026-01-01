import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthNavigator, MainTabNavigator } from './src/navigation';
import { theme } from './src/theme';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Temporary for testing

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
