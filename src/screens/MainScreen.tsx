import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import HoldBar from "../components/HoldBar";
import DebugPanel from "../tools/DebugPanel";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <DebugPanel />
      <HoldBar />
      {/* <StatusBar /> */}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});