// src\contexts\GlobalValuesContext.tsx
import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IGlobalValues {
  app: {
    lastActiveTime: number;
  };
  lvl_experience: number;
  game_difficult_coef: number;
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
}

interface GlobalValuesProviderProps {
  children: ReactNode;
}

export interface GlobalValuesContextProps {
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
};

const STORAGE_KEY = 'globalValues';

export const GlobalValuesProvider: React.FC<GlobalValuesProviderProps> = ({ children }) => {
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
          setValues((prevValues) => ({
            ...prevValues,
            ...parsedValues,
          }));
        }
      } catch (e) {
        console.error('Failed to load values from storage', e);
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
    setValues(initialValues);
    valuesRef.current = initialValues;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialValues)).catch((e) =>
      console.error('Failed to reset values to storage', e)
    );
    resetProblemRef.current?.();
  }, []);

  return (
    <GlobalValuesContext.Provider
      value={{
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
      }}
    >
      {children}
    </GlobalValuesContext.Provider>
  );
};