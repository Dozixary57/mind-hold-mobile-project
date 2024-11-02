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

const Tab = createBottomTabNavigator();

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
      <Tab.Navigator
        tabBar={(props) => <NavigationBottomsTabs {...props} />} // Передаём кастомный компонент вкладок
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="UpgradeScreen" component={UpgradeScreen} options={{ title: 'Upgrade' }} />
        <Tab.Screen name="StatisticsScreen" component={StatisticsScreen} options={{ title: 'Statistics' }} />
        {/* <Tab.Screen name="MarketScreen" component={MarketScreen} options={{ title: 'Market' }} /> */}
      </Tab.Navigator>
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