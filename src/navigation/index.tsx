import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Placeholder Screens (to be implemented)
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import DashboardScreen from '../screens/main/DashboardScreen';
import VillageListScreen from '../screens/main/VillageListScreen';
import IssueListScreen from '../screens/main/IssueListScreen';
import SchemeScreen from '../screens/main/SchemeScreen';
import AnnouncementScreen from '../screens/main/AnnouncementScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2E7D32', // Village Green
        headerStyle: { backgroundColor: '#2E7D32' },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Villages"
        component={VillageListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-city"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Issues"
        component={IssueListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="alert-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Schemes"
        component={SchemeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-document"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Announcements"
        component={AnnouncementScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bullhorn" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};
