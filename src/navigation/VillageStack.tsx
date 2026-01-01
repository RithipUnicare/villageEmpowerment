import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VillageListScreen from '../screens/main/VillageListScreen';
import VillageDetailsScreen from '../screens/details/VillageDetailsScreen';

const Stack = createStackNavigator();

export const VillageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VillageList" component={VillageListScreen} />
      <Stack.Screen name="VillageDetails" component={VillageDetailsScreen} />
    </Stack.Navigator>
  );
};
