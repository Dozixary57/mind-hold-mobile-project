import React from "react";
import { View, Text } from "react-native";
import { INavigationProps } from "../interfaces/INavigationProps";
import styles from "../styles/styles";

const InventoryScreen = ({ navigation }: INavigationProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inventory Screen</Text>
      {/* <NavigationBottomsTabs navigation={navigation} /> */}
    </View>
  );
};

export default InventoryScreen;