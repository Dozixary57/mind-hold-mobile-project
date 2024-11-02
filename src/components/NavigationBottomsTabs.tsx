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
        onPress={() => navigation.navigate('UpgradeScreen')}
        style={[styles.buttons, styles.leftButton]}
      >
        <Image
          source={require('../assets/images/UpgradeScreenIcon.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={[styles.buttons, styles.middleButton]}
      >
        <Image
          source={require('../assets/images/HomeScreenIcon.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('StatisticsScreen')}
        style={[styles.buttons, styles.rightButton]}
      >
        <Image
          source={require('../assets/images/StatisticsScreenIcon.png')}
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
    borderTopColor: 'white',
    borderTopWidth: 2,
    backgroundColor: 'black',
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    paddingVertical: 7,
  },
  leftButton: {
    borderRightWidth: 2,
  },
  middleButton: {
    
  },
  rightButton: {
    borderLeftWidth: 2,
  },

  image: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
});

export default NavigationBottomsTabs;
