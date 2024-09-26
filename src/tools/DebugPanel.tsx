// src\tools\DebugPanel.tsx
import { View, Text, StyleSheet } from 'react-native';
import { useGlobalValues } from '../contexts/GlobalValuesContext';

const DebugPanel = () => {
  const { values, isHolding } = useGlobalValues();

  return (
    <View style={styles.container}>
      <Text style={[styles.statuses, styles.textCenter]}>
        Debug Panel
      </Text>
      <Text style={styles.statuses}>
        IsHolding - {isHolding.toString()}
      </Text>
      <Text style={styles.statuses}>
        Progress - {values.holdBar.progress.toFixed(2)}  
      </Text>
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
  textCenter: {
    alignSelf: 'center',
  }
});

export default DebugPanel;