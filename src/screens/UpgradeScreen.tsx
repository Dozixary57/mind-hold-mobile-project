import React from "react";
import { View, Text } from "react-native";
import { INavigationProps } from "../interfaces/INavigationProps";
import styles from "../styles/styles";

// Critical thinking like a multiple parameter of parameters

const UpgradeScreen = ({ navigation }: INavigationProps) => {
  return (
    <View style={styles.ScreenContainer}>
      <Text style={styles.text}>Inventory Screen</Text>
      {/* <NavigationBottomsTabs navigation={navigation} /> */}
    </View>
  );
};

export default UpgradeScreen;