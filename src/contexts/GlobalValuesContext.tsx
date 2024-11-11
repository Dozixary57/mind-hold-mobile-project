// src\contexts\GlobalValuesContext.tsx
import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IGlobalValues {
  app: {
    lastActiveTime: number;
  };
  lvl_experience: number;
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
  }
}

interface GlobalValuesProviderProps {
  children: ReactNode;
}

export interface GlobalValuesContextProps {
  values: IGlobalValues;
  valuesRef: React.MutableRefObject<IGlobalValues>;
  updateValues: (newValues: Partial<IGlobalValues>) => void;
  saveAppData: () => void;
  resetAppData: () => void;
  isHolding: boolean;
  setIsHolding: React.Dispatch<React.SetStateAction<boolean>>;
  isHoldingRef: React.MutableRefObject<boolean>;
  isActive: boolean;
  isActiveRef: React.MutableRefObject<boolean>;
  resetProblemRef: React.MutableRefObject<(() => void) | null>;
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
  app: {
    lastActiveTime: 0,
  },
  lvl_experience: 0,
  hold_bar: {
    progress: 0,
    capacity: 1,
    chargingSpeed: 1,
    dischargingSpeed: 1,
    delayBeforeDischargeCurrentValue: 0,
    delayBeforeDischargeMaxValue: 0,
    isFreezed: false,
  },
  core_generator: {
    rate: 1,
    amount: 1,
    isFreezed: false,
  },
  core_storage: {
    capacity: 1,
    units: 0,
  },
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
};

const STORAGE_KEY = 'globalValues';

export const GlobalValuesProvider: React.FC<GlobalValuesProviderProps> = ({ children }) => {
  const [values, setValues] = useState<IGlobalValues>(initialValues);
  const valuesRef = useRef(values);
  const [isHolding, setIsHolding] = useState(false);
  const isHoldingRef = useRef(isHolding);

  const isActive = values.hold_bar.progress > 0;
  const isActiveRef = useRef(isActive);

  const resetProblemRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const loadValues = async () => {
      try {
        const storedValues = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedValues) {
          const parsedValues = JSON.parse(storedValues);
          setValues(parsedValues);
          valuesRef.current = parsedValues;
        }
      } catch (e) {
        console.error('Failed to load values from storage', e);
      }
    };

    loadValues();
  }, []);

  const updateValues = useCallback((newValues: Partial<IGlobalValues>) => {
    setValues((prevValues) => {
      const updatedValues = { ...prevValues, ...newValues };

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedValues)).catch((e) => {
        console.error('Failed to save values to storage', e);
      });

      valuesRef.current = updatedValues;
      return updatedValues;
    });
  }, []);

  const saveAppData = useCallback(() => {
    const updatedValues = { ...values, app: { ...values.app, lastActiveTime: Date.now() } };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedValues)).catch((e) => {
      console.error('Failed to save values to storage', e);
    });
    setValues(updatedValues);
    valuesRef.current = updatedValues;
  }, [values]);

  const resetAppData = useCallback(() => {
    setValues(initialValues);
    valuesRef.current = initialValues;
  
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialValues)).catch((e) => {
      console.error('Failed to reset values to storage', e);
    });

    if (resetProblemRef.current) {
      resetProblemRef.current();
    }
  }, []);
  
  return (
    <GlobalValuesContext.Provider value={{
      values,
      valuesRef,
      updateValues,
      saveAppData,
      resetAppData,
      isHolding,
      setIsHolding,
      isHoldingRef,
      isActive,
      isActiveRef,
      resetProblemRef,
    }}>
      {children}
    </GlobalValuesContext.Provider>
  );
};