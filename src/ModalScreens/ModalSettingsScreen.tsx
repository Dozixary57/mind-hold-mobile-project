import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import gStyles from '../styles/styles';
import { useGlobalValues } from '../contexts/GlobalValuesContext';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/commonjs/src/types';
import { IStackParamList } from '../interfaces/INavigationParamList';

const ModalSettingsScreen = () => {
  const { resetAppData, importAppData, exportAppData } = useGlobalValues();
  const navigation = useNavigation<StackNavigationProp<IStackParamList>>();

  const confirmReset = () => {
    Alert.alert(
      'Confirm Reset',
      'Are you sure you want to reset your game progress? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: () => {resetAppData(); navigation.goBack()},
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={gStyles.modalHeaderBar} onPress={() => navigation.goBack()}>
        <Text style={gStyles.modalHeaderBar_text}>❮</Text>
        <Text style={gStyles.modalHeaderBar_text}>Settings</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Documentation')}
        >
          <Text style={styles.text}>Open documentation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            importAppData();
            navigation.goBack()
          }}
        >
          <Text style={styles.text}>Import data</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            exportAppData();
            navigation.goBack()
          }}
        >
          <Text style={styles.text}>Export data</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={confirmReset}
        >
          <Text style={styles.text}>Reset progress</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
  },

  scrollView: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },

  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },

  button: {
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default ModalSettingsScreen;