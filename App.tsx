// src\App.tsx
import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import { useGameLoop } from './src/utils/gameLogic';
import { GlobalValuesProvider, useGlobalValues } from './src/contexts/GlobalValuesContext';

const Stack = createNativeStackNavigator();

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
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GlobalValuesProvider>
      <AppContent />
    </GlobalValuesProvider>
  );
}