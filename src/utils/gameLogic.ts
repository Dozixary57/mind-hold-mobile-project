// src/utils/gameLogic.ts
import { useEffect } from 'react';
import { useGlobalValues } from '../contexts/GlobalValuesContext';

export const useGameLoop = () => {
  const { valuesRef, updateValues, isHoldingRef, isHolding } = useGlobalValues();

  //
  // useEffect(() => {
  //   valuesRef.current.core_generator.amount = 25;
  //   valuesRef.current.core_generator.rate = 2;
  // }, [])
  //

  useEffect(() => {
    isHoldingRef.current = isHolding;
  }, [isHolding]);

  useEffect(() => {
    let lastTimestamp = 0;

    const gameLoop = (timestamp: number) => {
      if (valuesRef.current.hold_bar.isFreezed) return;

      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const newValues = { ...valuesRef.current };
      let newProgress = newValues.hold_bar.progress;

      if (isHoldingRef.current) {
        newProgress += newValues.hold_bar.chargingSpeed * deltaTime;
        newValues.hold_bar.delayBeforeDischargeCurrentValue = newValues.hold_bar.delayBeforeDischargeMaxValue;
      } else {
        if (newValues.hold_bar.delayBeforeDischargeCurrentValue > 0) {
          newValues.hold_bar.delayBeforeDischargeCurrentValue -= newValues.hold_bar.dischargingSpeed * deltaTime;
        } else {
          newValues.hold_bar.delayBeforeDischargeCurrentValue = 0;
          newProgress -= newValues.hold_bar.dischargingSpeed * deltaTime;
          if (newProgress < 0) newProgress = 0;
        }
      }

      newValues.hold_bar.progress = Math.max(0, Math.min(newValues.hold_bar.capacity, newProgress));

      updateValues(newValues);

      requestAnimationFrame(gameLoop);
    };

    const animationFrameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [updateValues, valuesRef, isHoldingRef]);
};
