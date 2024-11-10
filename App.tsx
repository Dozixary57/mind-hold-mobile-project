// src/App.tsx
import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import UpgradeScreen from './src/screens/UpgradeScreen';
import NavigationBottomsTabs from './src/components/NavigationBottomsTabs';
import { useGameLoop } from './src/utils/gameLogic';
import { GlobalValuesProvider, useGlobalValues } from './src/contexts/GlobalValuesContext';
import { StatusBar } from 'expo-status-bar';
import StatisticsScreen from './src/screens/StatisticsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ModalSettingsScreen from './src/ModalScreens/ModalSettingsScreen';
import ModalDocumentationScreen from './src/ModalScreens/ModalDocumentationScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <NavigationBottomsTabs {...props} />} // Передаём кастомный компонент вкладок
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
    <Tab.Screen name="UpgradeScreen" component={UpgradeScreen} options={{ title: 'Upgrade' }} />
    <Tab.Screen name="StatisticsScreen" component={StatisticsScreen} options={{ title: 'Statistics' }} />
    {/* <Tab.Screen name="MarketScreen" component={MarketScreen} options={{ title: 'Market' }} /> */}
  </Tab.Navigator>
);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
  }
};

function AppContent() {
  const { saveAppData } = useGlobalValues();

  useGameLoop();

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        saveAppData();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [saveAppData]);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="ModalSettingsScreen" component={ModalSettingsScreen} />
        <Stack.Screen name="ModalDocumentationScreen" component={ModalDocumentationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GlobalValuesProvider>
      <StatusBar hidden={true} />
      <AppContent />
    </GlobalValuesProvider>
  );
}