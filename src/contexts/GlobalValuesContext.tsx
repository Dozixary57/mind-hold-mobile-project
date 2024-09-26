// src\contexts\GlobalValuesContext.tsx
import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IGlobalValues {
  app: {
    lastActiveTime: number;
  }
  holdBar: {
    progress: number;
    capacity: number;
    chargingSpeed: number;
    dischargingSpeed: number;
    delayBeforeDischarge: number;
    isFreezed: boolean;
  };
  unitGenerator: {
    rate: number;
    amount: number;
    isFreezed: boolean;
    // unitPerSecond: number;
  };
  unitStorage: {
    capacity: number;
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
  holdBar: {
    progress: 0,
    capacity: 10,
    chargingSpeed: 1,
    dischargingSpeed: 1,
    delayBeforeDischarge: 3,
    isFreezed: false,
  },
  unitGenerator: {
    rate: 1,
    amount: 0.15,
    isFreezed: false,
    // unitPerSecond: 1 * 0.15,
  },
  unitStorage: {
    capacity: 5,
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

  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  useEffect(() => {
    isHoldingRef.current = isHolding;
  }, [isHolding]);

  const updateValues = useCallback((newValues: Partial<IGlobalValues>) => {
    setValues(prevValues => {
      const updatedValues = { ...prevValues, ...newValues };

      // if ('unitGenerator' in newValues) {
      //   updatedValues.unitGenerator.unitPerSecond = updatedValues.unitGenerator.rate * updatedValues.unitGenerator.amount;
      // }

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