import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";

// Critical thinking like a multiple parameter of parameters

const StatisticsScreen = () => {
  return (
    <View style={styles.ScreenContainer}>
      <View>
        <Text style={styles.text}>Statistics</Text>
      </View>
    </View>
  );
};

export default StatisticsScreen;