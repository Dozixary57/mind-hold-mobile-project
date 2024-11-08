// src\components\HoldBar.tsx
import React from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import { useGlobalValues } from '../contexts/GlobalValuesContext';
import { GetScreenHeight, GetScreenWidth } from '../tools/ScreenWidth';

const HoldBar = () => {
  const { values, isHolding, setIsHolding } = useGlobalValues();

  const holdBarWidth = GetScreenWidth() * 0.9;
  const holdBarHeight = GetScreenHeight() * 0.08;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => setIsHolding(true),
    onPanResponderRelease: () => setIsHolding(false),
    onPanResponderTerminate: () => setIsHolding(false),
  });

  return (
    <View style={[styles.container, { width: holdBarWidth, height: holdBarHeight }]}>
      <Text style={styles.holdBarUnitRate}>
        {values.core_generator.rate * values.core_generator.amount} / s
      </Text>
      <View
        {...panResponder.panHandlers}
        style={styles.holdBar}
      >
        <View
          style={[styles.holdBarProgress, { width: `${(values.hold_bar.progress / values.hold_bar.capacity) * 100}%` }]}
        />
      </View>
      <Text style={styles.holdBarStatus}>
        {/* Generating... */}
        {isHolding ? 'Generating...' : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 0,
    display: 'flex',
    backgroundColor: 'transparent',
  },
  holdBar: {
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
  },
  holdBarUnitRate: {
    position: 'absolute',
    bottom: '100%',
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  holdBarProgress: {
    backgroundColor: 'white',
    height: '100%',
  },
  holdBarStatus: {
    position: 'absolute',
    top: '100%',
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HoldBar;