import React from "react";
import { View, Text } from "react-native";
import { INavigationProps } from "../interfaces/INavigationProps";
import gStyles from "../styles/styles";

// Critical thinking like a multiple parameter of parameters

const UpgradeScreen = ({ navigation }: INavigationProps) => {
  return (
    <View style={gStyles.ScreenContainer_stretch}>
      <Text style={gStyles.text}>Inventory Screen</Text>
      {/* <NavigationBottomsTabs navigation={navigation} /> */}
    </View>
  );
};

export default UpgradeScreen;