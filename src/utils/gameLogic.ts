// src/utils/gameLogic.ts
import { useEffect } from 'react';
import { useGlobalValues } from '../contexts/GlobalValuesContext';

export const useGameLoop = () => {
  const { valuesRef, updateValues, isHoldingRef } = useGlobalValues();

  useEffect(() => {
    let lastTimestamp = 0;

    const gameLoop = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const newValues = { ...valuesRef.current };
      let newProgress = newValues.holdBar.progress;

      if (isHoldingRef.current) {
        newProgress += newValues.holdBar.chargingSpeed * deltaTime;
      } else {
        newProgress -= newValues.holdBar.dischargingSpeed * deltaTime;
      }

      newValues.holdBar.progress = Math.max(0, Math.min(newValues.holdBar.capacity, newProgress));

      updateValues(newValues);

      requestAnimationFrame(gameLoop);
    };

    const animationFrameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [updateValues, valuesRef, isHoldingRef]);
};