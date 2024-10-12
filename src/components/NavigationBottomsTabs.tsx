import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const NavigationBottomsTabs = ({ navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('MarketScreen')}
      >
        <Image
          source={require('../images/MarketIcon.png')}
          style={styles.image}
        />
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => navigation.navigate('InventoryScreen')}
      >
        <Image
          source={require('../images/InventoryIcon.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('MainScreen')}
      >
        <Image
          source={require('../images/HomeIcon.png')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: 'white',
    borderTopWidth: 2,
    paddingVertical: 10,
    backgroundColor: 'black',
  },
  image: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
});

export default NavigationBottomsTabs;
