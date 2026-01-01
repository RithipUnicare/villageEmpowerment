import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppState } from 'react-native';
import { AuthNavigator, MainTabNavigator } from './src/navigation';
import { theme } from './src/theme';
import { StorageService } from './src/utils/storage';
import { UserProvider } from './src/context/UserContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();

    // Listen for app state changes
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkAuthStatus();
      }
    });

    // Check auth status periodically
    const interval = setInterval(() => {
      checkAuthStatus();
    }, 1000); // Check every second

    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, []);

  const checkAuthStatus = async () => {
    const authenticated = await StorageService.isAuthenticated();
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <PaperProvider theme={theme}>
      <UserProvider>
        <NavigationContainer>
          {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </UserProvider>
    </PaperProvider>
  );
};

export default App;
