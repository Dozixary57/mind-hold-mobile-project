// src\contexts\GlobalValuesContext.tsx
import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IGlobalValues {
  app: {
    lastActiveTime: number;
  },
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
}

interface GlobalValuesProviderProps {
  children: ReactNode;
}

export interface GlobalValuesContextProps {
  values: IGlobalValues;
  valuesRef: React.MutableRefObject<IGlobalValues>;
  updateValues: (newValues: Partial<IGlobalValues>) => void;
  saveAppData: () => void;
  isHolding: boolean;
  setIsHolding: React.Dispatch<React.SetStateAction<boolean>>;
  isHoldingRef: React.MutableRefObject<boolean>;
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
    capacity: 10,
    chargingSpeed: 1,
    dischargingSpeed: 1,
    delayBeforeDischargeCurrentValue: 0,
    delayBeforeDischargeMaxValue: 3,
    isFreezed: false,
  },
  core_generator: {
    rate: 1,
    amount: 0.15,
    isFreezed: false,
  },
  core_storage: {
    capacity: 5,
    units: 0,
  },
  core_parameters: {
    analysis: 1,
    logic: 1,
    intuition: 1,
    creativity: 1,
    ideation: 1,
  },
};

const STORAGE_KEY = 'globalValues';

export const GlobalValuesProvider: React.FC<GlobalValuesProviderProps> = ({ children }) => {
  const [values, setValues] = useState<IGlobalValues>(initialValues);
  const valuesRef = useRef(values);
  const [isHolding, setIsHolding] = useState(false);
  const isHoldingRef = useRef(isHolding);

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

  // useEffect(() => {
  //   valuesRef.current = values;

  //   if (valuesRef.current.holdBar.capacity <= 0) {
  //     valuesRef.current.holdBar.capacity = 1;      
  //   }
  // }, [values]);

  const updateValues = useCallback((newValues: Partial<IGlobalValues>) => {
    setValues(prevValues => {
      const updatedValues = { ...prevValues, ...newValues };

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedValues)).catch(e => {
        console.error('Failed to save values to storage', e);
      });

      return updatedValues;
    });
  }, []);

  const saveAppData = useCallback(() => {
    const updatedValues = { ...values, app: { ...values.app, lastActiveTime: Date.now() } };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedValues)).catch(e => {
      console.error('Failed to save values to storage', e);
    });
    setValues(updatedValues);
  }, [values]);

  return (
    <GlobalValuesContext.Provider value={{ values, valuesRef, updateValues, saveAppData, isHolding, setIsHolding, isHoldingRef }}>
      {children}
    </GlobalValuesContext.Provider>
  );
};