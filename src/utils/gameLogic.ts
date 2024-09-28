// src/utils/gameLogic.ts
import { useEffect } from 'react';
import { useGlobalValues } from '../contexts/GlobalValuesContext';

export const useGameLoop = () => {
  const { valuesRef, updateValues, isHoldingRef, isHolding, setIsHolding } = useGlobalValues();

  useEffect(() => {
    isHoldingRef.current = isHolding;
  }, [isHolding]);

  useEffect(() => {
    let lastTimestamp = 0;

    const gameLoop = (timestamp: number) => {
      if (valuesRef.current.holdBar.isFreezed) return;

      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const newValues = { ...valuesRef.current };
      let newProgress = newValues.holdBar.progress;

      //
      // newValues.testValue1 = timestamp;
      // newValues.testValue2 = lastTimestamp;
      // newValues.testValue3 = deltaTime;
      //

      if (isHoldingRef.current) {
        newProgress += newValues.holdBar.chargingSpeed * deltaTime;
        newValues.holdBar.delayBeforeDischargeCurrentValue = newValues.holdBar.delayBeforeDischargeMaxValue;
      } else {
        if (newValues.holdBar.delayBeforeDischargeCurrentValue > 0) {
          newValues.holdBar.delayBeforeDischargeCurrentValue -= newValues.holdBar.dischargingSpeed * deltaTime;
        } else {
          newValues.holdBar.delayBeforeDischargeCurrentValue = 0;
          newProgress -= newValues.holdBar.dischargingSpeed * deltaTime;
          if (newProgress < 0) newProgress = 0;
        }
      }

      newValues.holdBar.progress = Math.max(0, Math.min(newValues.holdBar.capacity, newProgress));

      updateValues(newValues);

      requestAnimationFrame(gameLoop);
    };

    const animationFrameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [updateValues, valuesRef, isHoldingRef]);
};
