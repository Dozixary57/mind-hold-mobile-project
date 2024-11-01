// src/screens/MainScreen.tsx
import React from "react";
import { View } from "react-native";
import HoldBar from "../components/HoldBar";
import DebugPanel from "../tools/DebugPanel";
import styles from "../styles/styles";
import LevelAndStorageBar from "../components/LevelAndStorageBar";
import ProblemGenerator from "../utils/ProblemGenerator";

const HomeScreen = () => {
  return (
    <View style={styles.ScreenContainer}>
      <LevelAndStorageBar />
      {/* <DebugPanel /> */}
      <ProblemGenerator />
      <HoldBar />
    </View>
  );
};

export default HomeScreen;