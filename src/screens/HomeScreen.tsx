// src/screens/MainScreen.tsx
import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import HoldBar from "../components/HoldBar";
import DebugPanel from "../tools/DebugPanel";
import NavigationBottomsTabs from "../components/NavigationBottomsTabs";
import { INavigationProps } from "../interfaces/INavigationProps";
import styles from "../styles/styles";

const HomeScreen = ({ navigation }: INavigationProps) => {
  return (
    <View style={styles.container}>
      <DebugPanel />
      <HoldBar />
    </View>
  );
};

export default HomeScreen;