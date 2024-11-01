// src\components\LevelBar.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useGlobalValues } from '../contexts/GlobalValuesContext';
import { CurrentExperienceLevelCalculate, LevelCalculate, RequiredExperienceLevelCalculate } from '../tools/LevelAndExperienceCalculating';

const LevelAndStorageBar = () => {
  const { values, updateValues, valuesRef } = useGlobalValues();

  useEffect(() => {
    valuesRef.current.core_storage.units = 3;
    valuesRef.current.lvl_experience = 9;
  }, []);

  return (
    <View style={styles.Component}>
      <View style={styles.BarsAndButton}>
        <View style={styles.LevelAndStorageBarsWithButton}>
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
              <View style={styles.LevelTextWithIcon}>
                <Image source={require('../assets/images/ExperienceIcon.png')} style={styles.LevelIcon} />
                <Text style={[styles.TextOfBar, styles.LevelTextSize]}>
                  Experience
                </Text>
              </View>
              {(CurrentExperienceLevelCalculate(values.lvl_experience) < 0
                ||
                RequiredExperienceLevelCalculate(values.lvl_experience) < 0) ?
                <Text style={[styles.TextOfBar, styles.LevelTextSize]}>
                  ∞
                </Text>
                :
                <Text style={[styles.TextOfBar, styles.LevelTextSize]}>
                  {CurrentExperienceLevelCalculate(values.lvl_experience)} / {RequiredExperienceLevelCalculate(values.lvl_experience)}
                </Text>
              }
            </View>
          </View>

          <View style={styles.StorageTrack}>
            <View style={[styles.Progress, { width: `${values.core_storage.units / values.core_storage.capacity * 100}%` }]} />
            <View style={styles.StorageTextWithIcon}>
              <Image source={require('../assets/images/NeurobitsIcon.png')} style={styles.StorageIcon} />
              <Text style={[styles.TextOfBar, styles.StorageTextSize]}>
                Neurobits
              </Text>
            </View>
            <Text style={[styles.TextOfBar, styles.StorageTextSize]}>
              {values.core_storage.units} / {values.core_storage.capacity}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.AppSettings}
        // onPress={() => navigation.navigate('InventoryScreen')}
        >
          <Image
            source={require('../assets/images/SettingsIcon.png')}
            style={styles.AppSettingsIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.CoreParameterIndicators}>
        <View style={styles.CoreParameter}>
          <Text style={styles.CoreParameterText}>
            {values.core_parameters.analysis}
          </Text>
          <Image
            source={require('../assets/images/AnalysisIcon.png')}
            style={styles.CoreParameterIcon}
          />
        </View>
        <View style={styles.CoreParameter}>
          <Text style={styles.CoreParameterText}>
            {values.core_parameters.logic}
          </Text>
          <Image
            source={require('../assets/images/LogicIcon.png')}
            style={styles.CoreParameterIcon}
          />
        </View>
        <View style={styles.CoreParameter}>
          <Text style={styles.CoreParameterText}>
            {values.core_parameters.intuition}
          </Text>
          <Image
            source={require('../assets/images/IntuitionIcon.png')}
            style={styles.CoreParameterIcon}
          />
        </View>
        <View style={styles.CoreParameter}>
          <Text style={styles.CoreParameterText}>
            {values.core_parameters.creativity}
          </Text>
          <Image
            source={require('../assets/images/CreativityIcon.png')}
            style={styles.CoreParameterIcon}
          />
        </View>
        <View style={styles.CoreParameter}>
          <Text style={styles.CoreParameterText}>
            {values.core_parameters.ideation}
          </Text>
          <Image
            source={require('../assets/images/IdeationIcon.png')}
            style={styles.CoreParameterIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default LevelAndStorageBar;

const styles = StyleSheet.create({
  Component: {
    width: '90%',
    flexDirection: 'column',
  },

  BarsAndButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  LevelAndStorageBarsWithButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  TextOfBar: {
    color: 'black',
    fontWeight: 'bold',
    paddingRight: 6,
  },

  Progress: {
    position: 'absolute',
    left: 0,
    height: '100%',
    backgroundColor: 'white',
  },

  LevelBar: {
    width: '100%',
    height: 20,
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
    transform: [{ scale: 1.4 }, { translateY: -0.1 }]
  },
  // LevelTextPadding: {
  // },
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
  LevelTextWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  LevelIcon: {
    width: 16,
    height: 16,
    tintColor: 'black',
    marginRight: 12,
  },

  StorageTextSize: {
    fontSize: 12,
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
  StorageTextWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  StorageIcon: {
    width: 20,
    height: 20,
    tintColor: 'black',
    marginRight: 5,
  },

  AppSettings: {
    right: 0,
    top: 0,
    width: 44,
    height: 44,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  AppSettingsIcon: {
    width: 35,
    height: 35,
    tintColor: 'white',
  },

  CoreParameterIndicators: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CoreParameter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CoreParameterText: {
    color: 'white',
    fontWeight: 'bold',
    paddingRight: 4,
  },
  CoreParameterIcon: {
    width: 27,
    height: 27,
    tintColor: 'white',
  },
});