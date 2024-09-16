import { useState, useEffect, useRef } from 'react';
import { useGlobalValues } from '../contexts/GlobalValuesContext';

export const useStorageBar = () => {
  const { values, updateValues } = useGlobalValues();
  const [progress, setProgress] = useState<number>(0);
  const isHolding = useRef<boolean>(false);
  const decayTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastTimestamp = useRef<number>(0);

  const startDecay = () => {
    isHolding.current = false;
    decayTimeout.current = setTimeout(() => {
      isHolding.current = false; // Теперь бар начнет разряжаться после задержки
    }, values.holdBar_delayBeforeDischarge * 1000);
  };

  const cancelDecay = () => {
    if (decayTimeout.current) {
      clearTimeout(decayTimeout.current);
      decayTimeout.current = null;
    }
  };

  const gameLoop = (timestamp: number) => {
    if (!lastTimestamp.current) lastTimestamp.current = timestamp;
    const deltaTime = (timestamp - lastTimestamp.current) / 1000;
    lastTimestamp.current = timestamp;

    setProgress((prev) => {
      let newProgress = prev;

      if (isHolding.current) {
        // Если удерживаем - заполняем бар
        newProgress += values.holdBar_chargingSpeed * deltaTime;
      } else {
        // Если не удерживаем - бар разряжается
        newProgress -= values.holdBar_dischargingSpeed * deltaTime;
      }

      // Ограничиваем прогресс от 0 до 10
      if (newProgress > 10) newProgress = 10;
      if (newProgress < 0) newProgress = 0;

      return newProgress;
    });

    requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    // Запуск игрового цикла
    const animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Начало удержания
  const startHolding = () => {
    isHolding.current = true;
    cancelDecay(); // Отменяем разрядку, если держим
  };

  // Окончание удержания
  const stopHolding = () => {
    if (isHolding.current) {
      startDecay(); // Запускаем таймер задержки перед разрядкой
    }
  };

  return {
    progress,
    startHolding,
    stopHolding,
  };
};