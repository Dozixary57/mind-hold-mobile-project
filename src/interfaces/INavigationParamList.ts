// src\interfaces\INavigationParamList.ts
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';

type IStackParamList = {
  MainTabs: undefined;
  Settings: undefined;
  Documentation: undefined;
};

type ITabParamList = {
  Home: undefined;
  Upgrade: undefined;
  Statistics: undefined;
};

// Export the types
export { IStackParamList, ITabParamList };
