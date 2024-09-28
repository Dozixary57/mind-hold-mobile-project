// src\tools\DebugPanel.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useGlobalValues } from '../contexts/GlobalValuesContext';

const DebugPanel = () => {
  const { values, valuesRef, isHolding, isHoldingRef, setIsHolding } = useGlobalValues();

  return (
    <View style={styles.container}>
      <Text style={[styles.statuses, styles.textCenter]}>
        Debug Panel
      </Text>
      <Text style={styles.statuses}>
        IsHolding - {isHolding.toString()}
      </Text>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => {
            setIsHolding(true);
          }}
        >
          <Text>True</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsHolding(false);
          }}
        >
          <Text>False</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.statuses}>
        Progress - {values.holdBar.progress.toFixed(2)}
      </Text>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => {
            valuesRef.current.holdBar.progress = 0;
          }}
        >
          <Text>Set 0%</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            valuesRef.current.holdBar.progress = valuesRef.current.holdBar.capacity;
          }}
        >
          <Text>Set 100%</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.statuses}>
        Capacity - {values.holdBar.capacity.toFixed(2)}
      </Text>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => {
            valuesRef.current.holdBar.capacity -= 10;
          }}
        >
          <Text>- 10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            valuesRef.current.holdBar.capacity += 10;
          }}
        >
          <Text>+ 10</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    right: 0,
    flex: 1,
    width: 150,
    height: 'auto',
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 0, 0, 0.75)',
  },
  textCenter: {
    alignSelf: 'center',
  },
  statuses: {
    position: 'relative',
    alignSelf: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 0,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  controls: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 0,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default DebugPanel;