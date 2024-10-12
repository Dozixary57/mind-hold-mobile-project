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

  // const nextLevel = currentLevel + 1;
  // if (!(nextLevel in LevelTable))
  //   return -1;

  // const sumPreviousLevels = Object.entries(LevelTable)
  //   .filter(([lvl]) => Number(lvl) <= currentLevel)
  //   .reduce((acc, [, exp]) => acc + Number(exp), 0);

  // const sumCurrentAndPreviousLevels = Object.entries(LevelTable)
  //   .filter(([lvl]) => Number(lvl) <= currentLevel + 1)
  //   .reduce((acc, [, exp]) => acc + Number(exp), 0);

  // return sumCurrentAndPreviousLevels - sumPreviousLevels;
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


// const RequiredExperienceCalculate = (experience: number) => {
//   const level = LevelCalculate(experience);

//   const requiredExperience = Object.values(LevelTable).reduce((acc, curr) => {
//     if (typeof(level) === 'number' && level  > 1) {
//       acc += curr;
//     } else {
//       acc += curr;
//     }
//     return acc;
//   }, 0);

//   return requiredExperience;    
// }

export {
  LevelCalculate,
  CurrentExperienceLevelCalculate,
  RequiredExperienceLevelCalculate,
};