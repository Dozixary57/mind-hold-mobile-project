import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';

interface IGlobalValues {
  holdBar_capacity: number;
  holdBar_chargingSpeed: number;
  holdBar_dischargingSpeed: number;
  holdBar_delayBeforeDischarge: number;

  unitGenerator_rate: number;
  unitGenerator_amount: number;
  unitGenerator_unitPerSecond: number;

  unitStorage_capacity: number;
}

interface GlobalValuesProviderProps {
  children: ReactNode;
}

interface GlobalValuesContextProps {
  values: IGlobalValues;
  updateValues: (newValues: Partial<IGlobalValues>) => void;
}

const GlobalValuesContext = createContext<GlobalValuesContextProps | undefined>(undefined);

export const useGlobalValues = () => {
  const context = useContext(GlobalValuesContext);
  if (!context) {
    throw new Error('useGlobalValues must be used within a GlobalValuesProvider');
  }
  return context;
};

export const GlobalValuesProvider: React.FC<GlobalValuesProviderProps> = ({ children }) => {
  const [values, setValues] = useState<IGlobalValues>({
    holdBar_capacity: 10,
    holdBar_chargingSpeed: 1,
    holdBar_dischargingSpeed: 1,
    holdBar_delayBeforeDischarge: 3,

    unitGenerator_rate: 1,
    unitGenerator_amount: 1,
    unitGenerator_unitPerSecond: 1,

    unitStorage_capacity: 10,
  });

  const updateValues = useCallback((newValues: Partial<IGlobalValues>) => {
    setValues(prevValues => {
      const updatedValues = { ...prevValues, ...newValues };

      if ('unitGenerator_rate' in newValues || 'unitGenerator_amount' in newValues) {
        updatedValues.unitGenerator_unitPerSecond = updatedValues.unitGenerator_rate * updatedValues.unitGenerator_amount;
      }
      return updatedValues;
    });
  }, []);

  return (
    <GlobalValuesContext.Provider value={{ values, updateValues }}>
      {children}
    </GlobalValuesContext.Provider>
  );
};