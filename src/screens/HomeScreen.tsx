// src/screens/MainScreen.tsx
import React from "react";
import { View } from "react-native";
import HoldBar from "../components/HoldBar";
import DebugPanel from "../tools/DebugPanel";
import gStyles from "../styles/styles";
import LevelAndStorageBar from "../components/LevelAndStorageBar";
import ProblemGenerator from "../utils/ProblemGenerator";

const HomeScreen = () => {
  return (
    <View style={gStyles.ScreenContainer_stretch}>
      <LevelAndStorageBar />
      {/* <DebugPanel /> */}
      <ProblemGenerator />
      <HoldBar />
    </View>
  );
};

export default HomeScreen;