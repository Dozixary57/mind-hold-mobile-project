import React from 'react';
import { View, Text, StyleSheet, PanResponder, Dimensions } from 'react-native';
import { useProgressBar } from '../hooks/useProgressBar';
import { useGlobalValues } from '../contexts/GlobalValuesContext';

const HoldProgressBar = () => {
  const { progress, startHolding, stopHolding } = useProgressBar();
  const { values, updateValues } = useGlobalValues();

  const screenWidth = Dimensions.get('window').width;
  const vw = screenWidth / 100;
  const screenHeight = Dimensions.get('window').height;
  const vh = screenHeight / 100;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => startHolding(),
    onPanResponderRelease: () => stopHolding(),
    onPanResponderTerminate: () => stopHolding(),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>
        {values.unitGenerator_unitPerSecond}
      </Text>
      <View
        {...panResponder.panHandlers}
        style={[styles.progressBar, { width: 70 * vw, height: 10 * vh }]}
      >
        <View
          style={[styles.progressFill, { width: `${(progress / 10) * 100}%` }]}
        />
      </View>
      <Text style={styles.progressText}>
        Thinking...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '100%',
  },
  progressBar: {
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    position: 'relative',
  },
  progressFill: {
    backgroundColor: 'white',
    height: '100%',
  },
  progressText: {
    color: 'white',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HoldProgressBar;