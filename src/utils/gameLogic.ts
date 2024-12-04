// src/utils/gameLogic.ts
import { useEffect } from 'react';
import { useGlobalValues } from '../contexts/GlobalValuesContext';

export const useGameLoop = () => {
  const {
    valuesRef,
    updateValues,
    isHoldingRef,
    progressRef,
    updateProgress,
    // setIsActive
  } = useGlobalValues();

  // useEffect(() => {
  //   valuesRef.current.hold_bar.capacity = 10;
  // }, []);

  useEffect(() => {
    let lastTimestamp = 0;
    let frameCount = 0;

    const gameLoop = (timestamp: number) => {
      if (valuesRef.current.hold_bar.isFreezed) return;

      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      frameCount++;

      const newValues = {
        progress: progressRef.current,
        chargingSpeed: valuesRef.current.hold_bar.chargingSpeed,
        dischargingSpeed: valuesRef.current.hold_bar.dischargingSpeed,
        delayBeforeDischargeCurrentValue: valuesRef.current.hold_bar.delayBeforeDischargeCurrentValue,
        delayBeforeDischargeMaxValue: valuesRef.current.hold_bar.delayBeforeDischargeMaxValue,
        capacity: valuesRef.current.hold_bar.capacity,
      };


      if (isHoldingRef.current) {
        newValues.progress += newValues.chargingSpeed * deltaTime;
        newValues.delayBeforeDischargeCurrentValue = newValues.delayBeforeDischargeMaxValue;
      } else {
        if (newValues.delayBeforeDischargeCurrentValue > 0) {
          newValues.delayBeforeDischargeCurrentValue -= deltaTime;
        } else {
          newValues.delayBeforeDischargeCurrentValue = 0;
          newValues.progress -= newValues.dischargingSpeed * deltaTime;
          if (newValues.progress < 0) newValues.progress = 0;
        }
      }

      updateProgress(Math.max(0, Math.min(newValues.capacity, newValues.progress)));

      if (frameCount % 30 === 0) {
        updateValues({
          ...valuesRef.current,
          hold_bar: {
            ...valuesRef.current.hold_bar,
            progress: newValues.progress,
            delayBeforeDischargeCurrentValue: newValues.delayBeforeDischargeCurrentValue,
          },
        });
      }

      // if (frameCount % 5 === 0) {
      //   setIsActive(newValues.progress > 0);
      // }

      if (frameCount > 60) frameCount = 0;

      requestAnimationFrame(gameLoop);
    };

    const animationFrameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [updateValues, valuesRef, isHoldingRef]);
};