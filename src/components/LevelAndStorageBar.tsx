// src\components\LevelBar.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useGlobalValues } from '../contexts/GlobalValuesContext';
import { CurrentExperienceLevelCalculate, LevelCalculate, RequiredExperienceLevelCalculate } from '../tools/LevelAndExperienceCalculating';
import { useNavigation } from '@react-navigation/native';

const LevelAndStorageBar = () => {
  const { values, updateValues } = useGlobalValues();

  // const navigation = useNavigation();

  //
  // useEffect(() => {
  //   updateValues({ lvl_experience: 50, unitStorage: { capacity: 5, units: 5 } });
  // }, []);
  //

  return (
    <View style={styles.Component}>
      <View style={styles.LevelAndStorageBars}>
        <View style={styles.LevelBar}>
          <Text style={styles.Header}>
            lvl  {LevelCalculate(values.lvl_experience) < 0 ? '∞' : LevelCalculate(values.lvl_experience)}
          </Text>
          <View style={styles.LevelTrack}>
            {(CurrentExperienceLevelCalculate(values.lvl_experience) < 0
              ||
              RequiredExperienceLevelCalculate(values.lvl_experience) < 0) ?
              <View style={[styles.Progress, { width: '100%' }]} />
              :
              <View style={[styles.Progress, { width: `${CurrentExperienceLevelCalculate(values.lvl_experience) / RequiredExperienceLevelCalculate(values.lvl_experience) * 100}%` }]} />
            }
            <Text style={[styles.Text, styles.LevelTextSize]}>
              Experience
            </Text>
            {(CurrentExperienceLevelCalculate(values.lvl_experience) < 0
              ||
              RequiredExperienceLevelCalculate(values.lvl_experience) < 0) ?
              <Text style={[styles.Text, styles.LevelTextSize]}>
                ∞
              </Text>
              :
              <Text style={[styles.Text, styles.LevelTextSize]}>
                {CurrentExperienceLevelCalculate(values.lvl_experience)} / {RequiredExperienceLevelCalculate(values.lvl_experience)}
              </Text>
            }
          </View>
        </View>

        <View style={styles.StorageTrack}>
          <View style={[styles.Progress, { width: `${values.unitStorage.units / values.unitStorage.capacity * 100}%` }]} />
          <Text style={[styles.Text, styles.StorageTextSize]}>
            Neurobits
          </Text>
          <Text style={[styles.Text, styles.StorageTextSize]}>
            {values.unitStorage.units} / {values.unitStorage.capacity}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.AppSettings}
      // onPress={() => navigation.navigate('InventoryScreen')}
      >
        <Image
          source={require('../images/SettingsIcon.png')}
          style={styles.AppSettingsIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LevelAndStorageBar;

const styles = StyleSheet.create({
  Component: {
    width: '90%',
    // flex: 1,
    flexDirection: 'row',
  },

  LevelAndStorageBars: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  Text: {
    color: 'black',
    fontWeight: 'bold',
  },
  Progress: {
    position: 'absolute',
    left: 0,
    height: '100%',
    backgroundColor: 'white',
  },

  LevelBar: {
    width: '100%',
    height: 18,
    flexDirection: 'row',
    justifyContent: 'center',
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
  LevelTextSize: {
    fontSize: 10,
    paddingHorizontal: '4%',
    transform: [{ scale: 1.4 }, { translateY: -0.1 }]
  },
  LevelTrack: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    color: 'white',
    marginLeft: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },

  StorageTextSize: {
    fontSize: 12,
    paddingHorizontal: '2%',
    transform: [{ scale: 1.2 }, { translateY: -1 }]
  },
  StorageTrack: {
    position: 'relative',
    width: '100%',
    height: 20,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },

  AppSettings: {
    right: 0,
    top: 0,
    width: 42,
    height: 42,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  AppSettingsIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
});
