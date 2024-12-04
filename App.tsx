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
import { IStackParamList, ITabParamList } from './src/interfaces/INavigationParamList';
import { SafeAreaView } from 'react-native-safe-area-context';
// import ModalAuthorizationScreen from './src/ModalScreens/ModalAuthorizationScreen';

const Stack = createStackNavigator<IStackParamList>();
const Tab = createBottomTabNavigator<ITabParamList>();

const TabNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <NavigationBottomsTabs {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home', animation: 'fade' }} />
    <Tab.Screen name="Upgrade" component={UpgradeScreen} options={{ title: 'Upgrade', animation: 'fade' }} />
    <Tab.Screen name="Statistics" component={StatisticsScreen} options={{ title: 'Statistics', animation: 'fade' }} />
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
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Settings" component={ModalSettingsScreen} options={{ title: 'Settings', animation: 'fade' }} />
        <Stack.Screen name="Documentation" component={ModalDocumentationScreen} options={{ title: 'Documentation', animation: 'fade' }} />
        {/* <Stack.Screen name="ModalAuthorizationScreen" component={ModalAuthorizationScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GlobalValuesProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <StatusBar hidden={true} />
        <AppContent />
      </SafeAreaView>
    </GlobalValuesProvider>
  );
}