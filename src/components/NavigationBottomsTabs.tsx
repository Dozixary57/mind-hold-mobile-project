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
        onPress={() => navigation.navigate('MainTabs', { screen: 'Upgrade' })}
        style={[styles.buttons, styles.leftButton]}
      >
        <Image
          source={require('../assets/images/UpgradeScreenIcon.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        style={[styles.buttons, styles.middleButton]}
      >
        <Image
          source={require('../assets/images/HomeScreenIcon.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('MainTabs', { screen: 'Statistics' })}
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
    borderTopWidth: 1,
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
    borderRightWidth: 1,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  rightButton: {
    borderLeftWidth: 1,
  },

  image: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
});

export default NavigationBottomsTabs;