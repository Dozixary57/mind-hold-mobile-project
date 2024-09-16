import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import MainScreen from './src/screens/MainScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalValuesProvider } from './src/contexts/GlobalValuesContext';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
  }
};

export default function App() {
  return (
    <GlobalValuesProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainScreen" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalValuesProvider>
  );
};
