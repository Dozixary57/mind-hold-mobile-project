import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import HoldProgressBar from "../components/HoldProgressBar";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <HoldProgressBar />
      {/* <StatusBar /> */}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});