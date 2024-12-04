import React, { useRef } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import { useGlobalValues } from '../contexts/GlobalValuesContext';
import { GetScreenHeight, GetScreenWidth } from '../tools/ScreenWidth';
import { RemainingTimeFormatter } from '../tools/TimeFormater';

const HoldBar = () => {
  const { values, setIsHolding, isHoldingRef, progress } = useGlobalValues();

  const holdBarWidth = GetScreenWidth() * 0.9;
  const holdBarHeight = GetScreenHeight() * 0.08;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      if (!isHoldingRef.current) {
        isHoldingRef.current = true;
        setIsHolding(true);
      }
    },
    onPanResponderRelease: () => {
      if (isHoldingRef.current) {
        isHoldingRef.current = false;
        setIsHolding(false);
      }
    },
    onPanResponderTerminate: () => {
      if (isHoldingRef.current) {
        isHoldingRef.current = false;
        setIsHolding(false);
      }
    },
  });

  return (
    <View style={[styles.container, { width: holdBarWidth, height: holdBarHeight }]}>
      <Text style={styles.holdBarUnitRate}>
        {values.core_generator.rate * values.core_generator.amount} / s
      </Text>
      <View
        {...panResponder.panHandlers}
        style={styles.holdBarTrack}
      >
        <View
          style={[styles.holdBarProgress, { width: `${(progress / values.hold_bar.capacity) * 100}%` }]}/>
        <Text style={styles.remainingTimeStatus}>
          {RemainingTimeFormatter(progress / values.hold_bar.dischargingSpeed + values.hold_bar.delayBeforeDischargeCurrentValue)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    display: 'flex',
    backgroundColor: 'transparent',
  },
  holdBarTrack: {
    position: 'relative',
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
  },
  holdBarUnitRate: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  holdBarProgress: {
    backgroundColor: 'white',
    height: '100%',
  },
  remainingTimeStatus: {
    position: 'absolute',
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
    textShadowColor: 'white',
  },
});

export default HoldBar;