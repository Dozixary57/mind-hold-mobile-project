import { RoundToTwoDecimals } from "./NumbersFormater";

const LevelTable = {
  1: 10, // 10
  2: 15, // 25
  3: 25, // 50
  4: 50, // 100
  5: 100, // 200
  6: 150, // 350 
  7: 200, // 550
  8: 250, // 800
  9: 300, // 1100
  10: 400, // 1500
};

const LevelCalculate = (experience: number) => {
  const totalLevels = Object.entries(LevelTable).reduce(
    (acc, [lvl, requiredExp]) => {
      acc.totalExp += Number(requiredExp);
      if (experience >= acc.totalExp) {
        acc.level = Number(lvl) + 1;
      }
      return acc;
    },
    { totalExp: 0, level: 1 }
  );

  return totalLevels.level > Object.keys(LevelTable).length ? -1 : totalLevels.level;
};

const RequiredExperienceLevelCalculate = (experience: number) => {
  const currentLevel = LevelCalculate(experience);

  if (currentLevel === -1)
    return -1;


  const levelUpRequiredExperience = Object.entries(LevelTable).find(([lvl]) => Number(lvl) === currentLevel);

  return levelUpRequiredExperience ? Number(levelUpRequiredExperience[1]) : -1;
};

const CurrentExperienceLevelCalculate = (experience: number) => {
  const currentLevel = LevelCalculate(experience);

  if (currentLevel === -1)
    return -1;

  const sumPreviousLevels = Object.entries(LevelTable)
    .filter(([lvl]) => Number(lvl) < currentLevel)
    .reduce((acc, [, exp]) => acc + Number(exp), 0);

  return experience - sumPreviousLevels;
}

const MaxExperienceForMaxLevel = () => {
  const totalRequiredExperience = Object.values(LevelTable).reduce(
    (acc, requiredExp) => acc + requiredExp,
    0
  );

  return totalRequiredExperience;
};

const GameDifficultCoefCalculate = (level_experience: number): number => {
  const maxExperience = MaxExperienceForMaxLevel();
  const normalizedExperience = level_experience / maxExperience; // Normalize the experience value to the range [0, 1]
  const growthFactor = 50; // Adjust for a balanced exponential growth

  // Combine linear and exponential components for a more gradual increase
  const difficultyCoefficient = 1 + (normalizedExperience * growthFactor) + (Math.exp(growthFactor * normalizedExperience) - 1) * 0.25;

  return RoundToTwoDecimals(difficultyCoefficient);
};

export {
  LevelCalculate,
  CurrentExperienceLevelCalculate,
  RequiredExperienceLevelCalculate,
  GameDifficultCoefCalculate,
};