// src\contexts\GlobalValuesContext.tsx
import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect, useRef } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IProblem } from '../utils/ProblemGenerator';
import CryptoJS from 'react-native-crypto-js';
import Toast from 'react-native-toast-message';

export interface IGlobalValues {
  app: {
    lastActiveTime: number;
  };
  lvl_experience: number;
  game_difficult_coef: number;
  problem: {
    problemData: IProblem;
    problemCurrentWeight: number;
  }
  hold_bar: {
    progress: number;
    capacity: number;
    chargingSpeed: number;
    dischargingSpeed: number;
    delayBeforeDischargeCurrentValue: number;
    delayBeforeDischargeMaxValue: number;
    isFreezed: boolean;
  };
  core_generator: {
    rate: number;
    amount: number;
    isFreezed: boolean;
  };
  core_storage: {
    capacity: number;
    units: number;
  };
  core_parameters: {
    analysis: number;
    logic: number;
    intuition: number;
    creativity: number;
    ideation: number;
  };
  statistics: {
    totalInGameTime: number;
    totalSolvedProblems: number;
    totalGainedNeurobits: number;
    maxProblemAnalysisParameter: number;
    maxProblemLogicParameter: number;
    maxProblemIntuitionParameter: number;
    maxProblemCreativityParameter: number;
    maxProblemIdeationParameter: number;
    maxProblemWeight: number;
  };
  characteristic_coefficients: {
    problemParameterCoef: number;
    problemWeightCoef: number;
    problemGainedExperienceCoef: number;
    problemGainedNeurobitsCoef: number;
  };
  upgrade_values: {
    additionalNeurobits: number;
    additionalExperience: number;
  }
}

interface GlobalValuesProviderProps {
  children: ReactNode;
}

export interface GlobalValuesContextProps {
  isInitialized: boolean;

  values: IGlobalValues;
  valuesRef: React.MutableRefObject<IGlobalValues>;
  updateValues: (newValues: Partial<IGlobalValues>) => void;
  progress: number;
  updateProgress: (newValues: number) => void;
  progressRef: React.MutableRefObject<number>;
  saveAppData: () => void;
  resetAppData: () => void;
  isHolding: boolean;
  setIsHolding: React.Dispatch<React.SetStateAction<boolean>>;
  isHoldingRef: React.MutableRefObject<boolean>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  resetProblemRef: React.MutableRefObject<(() => void) | null>;

  importAppData: () => void;
  exportAppData: () => void;
}

const GlobalValuesContext = createContext<GlobalValuesContextProps | undefined>(undefined);

export const useGlobalValues = () => {
  const context = useContext(GlobalValuesContext);
  if (!context) {
    throw new Error('useGlobalValues must be used within a GlobalValuesProvider');
  }
  return context;
};

const initialValues: IGlobalValues = {
  app: { lastActiveTime: 0 },
  lvl_experience: 0,
  game_difficult_coef: 1,
  problem: {
    problemData: {
      title: "Your first problem",
      description: "Try to solve it",
      parameters: {
        analysis: 1,
        logic: 1,
        intuition: 1,
        creativity: 1,
        ideation: 1,
      },
      weight: 10,
      reward: {
        expirience: 1,
        neurobits: 1,
      },
    },
    problemCurrentWeight: 10,
  },
  hold_bar: {
    progress: 0,
    capacity: 1,
    chargingSpeed: 1,
    dischargingSpeed: 1,
    delayBeforeDischargeCurrentValue: 0,
    delayBeforeDischargeMaxValue: 0,
    isFreezed: false,
  },
  core_generator: { rate: 1, amount: 1, isFreezed: false },
  core_storage: { capacity: 1, units: 0 },
  core_parameters: {
    analysis: 1,
    logic: 1,
    intuition: 1,
    creativity: 1,
    ideation: 1,
  },
  statistics: {
    totalInGameTime: 0,
    totalSolvedProblems: 0,
    totalGainedNeurobits: 0,
    maxProblemAnalysisParameter: 1,
    maxProblemLogicParameter: 1,
    maxProblemIntuitionParameter: 1,
    maxProblemCreativityParameter: 1,
    maxProblemIdeationParameter: 1,
    maxProblemWeight: 0,
  },
  characteristic_coefficients: {
    problemParameterCoef: 1,
    problemWeightCoef: 1,
    problemGainedExperienceCoef: 1,
    problemGainedNeurobitsCoef: 1,
  },
  upgrade_values: {
    additionalNeurobits: 0,
    additionalExperience: 0,
  },
};

const STORAGE_KEY = 'globalValues';

export const GlobalValuesProvider: React.FC<GlobalValuesProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const [values, setValues] = useState<IGlobalValues>(initialValues);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(progress);
  const valuesRef = useRef(initialValues);
  const [isHolding, setIsHolding] = useState(false);
  const isHoldingRef = useRef(isHolding);
  const [isActive, setIsActive] = useState<boolean>(values.hold_bar.progress > 0);
  const resetProblemRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const updateProgress = useCallback((newValues: number) => {
    setProgress(() => {
      progressRef.current = newValues;
      return newValues;
    });
  }, []);

  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  useEffect(() => {
    isHoldingRef.current = isHolding;
  }, [isHolding]);

  useEffect(() => {
    const delay = setInterval(() => {
      setIsActive(progress > 0);
    }, 10);

    return () => {
      clearInterval(delay);
    };
  }, [progress]);

  useEffect(() => {
    const loadValues = async () => {
      try {
        const storedValues = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedValues) {
          const parsedValues = JSON.parse(storedValues);

          updateValues(parsedValues);
        }
      } catch (e) {
        console.error('Failed to load values from storage', e);
      } finally {
        setIsInitialized(true);
      }
    };

    loadValues();
  }, []);

  const updateValues = useCallback((newValues: Partial<IGlobalValues>) => {
    setValues((prevValues: IGlobalValues) => {
      const updatedValues = { ...prevValues, ...newValues };
      valuesRef.current = updatedValues;

      return updatedValues;
    });
  }, []);

  const saveAppData = useCallback(() => {
    const updatedValues = {
      ...valuesRef.current,
      app: {
        ...valuesRef.current.app,
        lastActiveTime: Date.now()
      },
    };

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedValues)).catch((e) =>
      console.error('Failed to save values to storage', e)
    ).finally(() => {
      valuesRef.current = updatedValues;
    });
  }, []);

  const resetAppData = useCallback(() => {
    updateValues(initialValues);
    valuesRef.current = initialValues;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialValues)).catch((e) =>
      console.error('Failed to reset values to storage', e)
    );
    resetProblemRef.current?.();

    Toast.show({
      type: 'custom',
      text1: 'Reset successful',
      position: 'bottom',
      visibilityTime: 2000,
    });
  }, []);

  // const exportAppData = async () => {
  //   try {
  //     const fileContent = JSON.stringify(values);

  //     const fileUri = `${FileSystem.documentDirectory}MindHoldSave.json`;

  //     await FileSystem.writeAsStringAsync(fileUri, fileContent, {
  //       encoding: FileSystem.EncodingType.UTF8,
  //     });

  //     if (await Sharing.isAvailableAsync()) {
  //       await Sharing.shareAsync(fileUri, { dialogTitle: 'Save Game Data' });
  //     } else {
  //       console.log('Sharing is not available');
  //     }
  //   } catch (e) {
  //     console.error('Export failed:', e);
  //   }
  // };

  // const importAppData = async () => {
  //   try {
  //     setIsInitialized(false);
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: 'application/json',
  //     });

  //     if (result.canceled) {
  //       console.log('Import canceled by user.');
  //       return;
  //     }

  //     const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri, {
  //       encoding: FileSystem.EncodingType.UTF8,
  //     });

  //     const importedData = JSON.parse(fileContent);

  //     updateValues(importedData);
  //     console.log('Import successful:', importedData);
  //   } catch (e) {
  //     console.error('Import failed:', e);
  //   } finally {
  //     setIsInitialized(true);
  //   }
  // };

  const ENCRYPTION_KEY = 'MindHoldEncryptionKeyMindHoldEncryp';

  const exportAppData = async () => {
    try {
      const fileContent = JSON.stringify(values);

      const encryptedContent = CryptoJS.AES.encrypt(fileContent, ENCRYPTION_KEY).toString();

      const fileUri = `${FileSystem.documentDirectory}MindHoldSave.json`;

      await FileSystem.writeAsStringAsync(fileUri, encryptedContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, { dialogTitle: 'Save Game Data' });
      } else {
        console.log('Sharing is not available');
      }

      Toast.show({
        type: 'custom',
        text1: 'Export successful',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } catch (e) {
      console.error('Export failed:', e);
    }
  };

  const importAppData = async () => {
    try {
      setIsInitialized(false);
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
      });

      if (result.canceled) {
        Toast.show({
          type: 'custom',
          text1: 'Import canceled',
          position: 'bottom',
          visibilityTime: 2000,
        });

        return;
      }

      const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const decryptedBytes = CryptoJS.AES.decrypt(fileContent, ENCRYPTION_KEY);
      const decryptedContent = decryptedBytes.toString(CryptoJS.enc.Utf8);

      const importedData = JSON.parse(decryptedContent);

      updateValues(importedData);

      Toast.show({
        type: 'custom',
        text1: 'Import successful',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } catch (e) {
      console.error('Import failed:', e);
    } finally {
      setIsInitialized(true);
    }
  };

  return (
    <GlobalValuesContext.Provider
      value={{
        isInitialized,

        values,
        valuesRef,
        updateValues,
        progress,
        updateProgress,
        progressRef,
        saveAppData,
        resetAppData,
        isHolding,
        setIsHolding,
        isHoldingRef,
        isActive,
        setIsActive,
        resetProblemRef,

        exportAppData,
        importAppData
      }}
    >
      {children}
    </GlobalValuesContext.Provider>
  );
};