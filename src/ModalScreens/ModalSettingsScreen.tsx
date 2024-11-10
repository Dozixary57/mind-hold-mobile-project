import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import gStyles from '../styles/styles';

const ModalSettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={gStyles.modalHeaderBar} onPress={() => navigation.goBack()}>
        <Text style={gStyles.modalHeaderBar_text}>❮</Text>
        <Text style={gStyles.modalHeaderBar_text}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.button}
      // @ts-expect-error
      onPress={() => navigation.navigate('ModalDocumentationScreen')}
      >
        <Text style={styles.text}>Open documentation</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  text: {
    color: 'white',
    fontSize: 20,
    
  },

  button: {
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
});

export default ModalSettingsScreen;