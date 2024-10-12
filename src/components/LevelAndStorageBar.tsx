// src\components\LevelBar.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGlobalValues } from '../contexts/GlobalValuesContext';
import { CurrentExperienceLevelCalculate, LevelCalculate, RequiredExperienceLevelCalculate } from '../tools/LevelAndExperienceCalculating';

const LevelAndStorageBar = () => {
  const { values, updateValues } = useGlobalValues();

  //
  useEffect(() => {
    updateValues({ lvl_experience: 50, unitStorage: { capacity: 5, units: 5 } });
  }, []);
  //

  return (
    <View style={styles.Component}>
      <Text style={styles.Header}>
        {CurrentExperienceLevelCalculate(values.lvl_experience)} / {RequiredExperienceLevelCalculate(values.lvl_experience)}
      </Text>
      <Text style={styles.Header}>
        lvl  {LevelCalculate(values.lvl_experience) < 0 ? 1 : LevelCalculate(values.lvl_experience)}
      </Text>
      <View style={styles.Tracks}>
        <View style={styles.StorageTrack}>
          <View style={[styles.Progress, { width: `${values.unitStorage.units / values.unitStorage.capacity * 100}%` }]} />
          <Text style={[styles.Text, styles.StorageTextSize]}>
            Memory
          </Text>
          <Text style={[styles.Text, styles.StorageTextSize]}>
            {values.unitStorage.units} / {values.unitStorage.capacity}
          </Text>
        </View>
        <View style={styles.LevelTrack}>
          {(CurrentExperienceLevelCalculate(values.lvl_experience) < 0
            ||
            RequiredExperienceLevelCalculate(values.lvl_experience) < 0) ?
            <View style={[styles.Progress, { width: '100%' }]} />
            :
            <View style={[styles.Progress, { width: `${CurrentExperienceLevelCalculate(values.lvl_experience) / RequiredExperienceLevelCalculate(values.lvl_experience) * 100}%` }]} />
          }
          {/* <Text style={[styles.Text, styles.LevelTextSize]}>
            Experience
          </Text> */}
          {/* <Text style={[styles.Text, styles.LevelTextSize]}>
            {CurrentExperienceLevelCalculate(values.lvl_experience)} / {RequiredExperienceLevelCalculate(values.lvl_experience)}
          </Text> */}
        </View>
      </View>
    </View>
  );
};

export default LevelAndStorageBar;

const styles = StyleSheet.create({
  Component: {
    width: '90%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Header: {
    width: 55,
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: 'white',
  },
  Tracks: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  StorageTrack: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '65%',
    color: 'white',
    marginLeft: '2%',
    paddingHorizontal: '2%',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  Progress: {
    position: 'absolute',
    left: 0,
    height: '100%',
    backgroundColor: 'white',
  },
  LevelTrack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    color: 'white',
    marginLeft: '2%',
    paddingHorizontal: '3%',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },


  Text: {
    color: 'black',
  },

  StorageTextSize: {
    fontSize: 12,
    transform: [{ scale: 1.2 }, { translateY: -1 }]
  },
  LevelTextSize: {
    fontSize: 4,
    transform: [{ scale: 1.8 }, { translateY: -0.1 }]
  },
});
