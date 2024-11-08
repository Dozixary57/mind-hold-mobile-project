// // src\utils\ProblemGenerator.tsx
// import { View, StyleSheet, Button, Text } from "react-native";
// import { useGlobalValues } from "../contexts/GlobalValuesContext";
// import { useState } from "react";

// const ProblemList = {
//   // creativity
//   location: [
//     "В древней крепости Терранос,",
//     "На далёкой планете Мирра,",
//     "На берегу озера Вечности,",
//     "На пустынной равнине Синиль,",
//     "На вершине горы Этерниа,",
//     "В подземелье Забвения,"
//   ],
//   // ideation
//   descriptor: [
//     "окутанной магическими барьерами,",
//     "где время остановилось,",
//   "покрытой ледяной коркой,",
//   "в сердце раскалённых песков,",
//   "где обитают тени прошлого,",
//   "полной загадок и опасностей,"
// ],
// // analysis
// event: [
//   "случился выброс энергии.",
//   "произошло странное свечение.",
//   "раздался таинственный шум.",
//   "появился мистический знак.",
//   "упал метеорит из далёкой галактики.",
//   "вспыхнуло пламя неизвестного происхождения."
// ],
// // intuition
// character: [
//   "Одинокий странник,",
//   "Могущественный маг,",
//   "Исследователь временных пространств,",
//   "Посланник древних цивилизаций,",
//   "Спаситель из будущего,",
//   "Призрак прошлого,"
// ],
// // logic
// emotion: [
//   "исполненный решимости,",
//   "поглощённый страхом,",
//   "пылающий от любопытства,",
//   "переполненный печалью,",
//   "охваченный энтузиазмом,",
//   "в поисках надежды,"
// ],
// // analysis
// subject: [
//   "ищет источник силы,",
//   "пытается разгадать древнюю тайну,",
//   "открывает путь в неизведанное,",
//   "ищет способ спасти мир,",
//   "готовится к финальному бою,",
//   "стремится разгадать загадку,"
// ],
// // creativity
// extra: [
//   "которая изменит судьбу всех,",
//   "связанную с его прошлым.",
//   "ведущую к запретному знанию.",
//   "оставшуюся неразгаданной веками.",
//   "которая принадлежала его предкам.",
//   "запечатанную в древних манускриптах."
// ],
// // logic
// action: [
//   "Нужно собрать артефакты и",
//   "Следует отправиться в поход и",
//   "Важно подготовиться к опасностям и",
//   "Необходимо найти союзников и",
//   "Пора снарядить экспедицию и",
//   "Следует разыскать старинные записи и"
// ],
// // ideation
// objective: [
//   "добраться до истины.",
//   "получить ответы.",
//   "восстановить равновесие.",
//   "вернуть утраченное время.",
//   "переписать ход истории.",
//   "найти способ спасения."
// ],
// // intuition
// outcome: [
//   "Это событие изменит мир навсегда.",
//   "Так начнётся новая эра.",
//   "Это станет началом великой легенды.",
//   "Мир уже никогда не будет прежним.",
//   "Это приведёт к невообразимым последствиям.",
//   "Судьба вселенной висит на волоске."
// ],
// };

// interface IProblem {
//   title: string;
//   description: string;
//   parameters: {
//     analysis: number;
//     logic: number;
//     intuition: number;
//     creativity: number;
//     ideation: number;
//   }
//   weight: number;
//   reward: {
//     expirience: number;
//     neurobits: number;
//   }
// }

// const generateProblem = (): string => {
//   const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
//   return Object.values(ProblemList).map(getRandomElement).join(' ');
// };

// const generateProblemNumber = (): number => Math.floor(1 + Math.random() * 99999);

// const ProblemGenerator = () => {
//   const [problem, setProblem] = useState<string>(generateProblem());
//   const [problemNumber, setProblemNumber] = useState<number>(generateProblemNumber());

//   const handleGenerateNewProblem = () => {
//     setProblem(generateProblem());
//     setProblemNumber(generateProblemNumber());
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.problemTitle}>Проблема #{problemNumber}</Text>
//       <View style={styles.problemTextContainer}>
//         <Text style={styles.problemText}>{problem}</Text>
//       </View>
//       <Button title="Сгенерировать новую проблему" onPress={handleGenerateNewProblem} />
//     </View>
//   );
// };

// export default ProblemGenerator;

// const styles = StyleSheet.create({
//   container: {
//     width: '80%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: 'white',
//     backgroundColor: 'black'
//   },
//   problemTitle: {
//     alignSelf: 'flex-start',
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//     paddingVertical: 5,
//     paddingLeft: 7,
//   },
//   problemTextContainer: {
//     width: '100%',
//     borderTopWidth: 2,
//     borderTopColor: 'white',
//     borderBottomWidth: 2,
//     borderBottomColor: 'white',
//   },
//   problemText: {
//     textAlign: 'justify',
//     fontSize: 14,
//     color: 'white',
//     padding: 8,
//   }
// });

import { View, StyleSheet, Button, Text, Image } from "react-native";
import { IGlobalValues, useGlobalValues } from "../contexts/GlobalValuesContext";
import { useEffect, useRef, useState } from "react";
import { GetScreenHeight, GetScreenWidth } from "../tools/ScreenWidth";

const ProblemList = {
  location: [
    { text: "В древней крепости Терранос,", weight: 5 },
    { text: "На далёкой планете Мирра,", weight: 2 },
    { text: "На берегу озера Вечности,", weight: 1 },
    { text: "На пустынной равнине Синиль,", weight: 5 },
    { text: "На вершине горы Этерниа,", weight: 4 },
    { text: "В подземелье Забвения,", weight: 3 }
  ],
  descriptor: [
    { text: "окутанной магическими барьерами,", weight: 4 },
    { text: "где время остановилось,", weight: 3 },
    { text: "покрытой ледяной коркой,", weight: 2 },
    { text: "в сердце раскалённых песков,", weight: 5 },
    { text: "где обитают тени прошлого,", weight: 4 },
    { text: "полной загадок и опасностей,", weight: 3 }
  ],
  event: [
    { text: "случился выброс энергии.", weight: 3 },
    { text: "произошло странное свечение.", weight: 1 },
    { text: "раздался таинственный шум.", weight: 2 },
    { text: "появился мистический знак.", weight: 4 },
    { text: "упал метеорит из далёкой галактики.", weight: 6 },
    { text: "вспыхнуло пламя неизвестного происхождения.", weight: 5 },
  ],
  character: [
    { text: "Одинокий странник,", weight: 1 },
    { text: "Могущественный маг,", weight: 4 },
    { text: "Исследователь временных пространств,", weight: 3 },
    { text: "Посланник древних цивилизаций,", weight: 2 },
    { text: "Спаситель из будущего,", weight: 5 },
    { text: "Призрак прошлого,", weight: 4 },
  ],
  emotion: [
    { text: "исполненный решимости,", weight: 4 },
    { text: "поглощённый страхом,", weight: 3 },
    { text: "пылающий от любопытства,", weight: 5 },
    { text: "переполненный печалью,", weight: 2 },
    { text: "охваченный энтузиазмом,", weight: 4 },
    { text: "в поисках надежды,", weight: 3 }
  ],
  subject: [
    { text: "ищет источник силы,", weight: 3 },
    { text: "пытается разгадать древнюю тайну,", weight: 5 },
    { text: "открывает путь в неизведанное,", weight: 4 },
    { text: "ищет способ спасти мир,", weight: 5 },
    { text: "готовится к финальному бою,", weight: 3 },
    { text: "стремится разгадать загадку,", weight: 4 }
  ],
  extra: [
    { text: "которая изменит судьбу всех,", weight: 5 },
    { text: "связанную с его прошлым.", weight: 3 },
    { text: "ведущую к запретному знанию.", weight: 4 },
    { text: "оставшуюся неразгаданной веками.", weight: 5 },
    { text: "которая принадлежала его предкам.", weight: 3 },
    { text: "запечатанную в древних манускриптах.", weight: 4 }
  ],
  action: [
    { text: "Нужно собрать артефакты и", weight: 3 },
    { text: "Следует отправиться в поход и", weight: 5 },
    { text: "Важно подготовиться к опасностям и", weight: 4 },
    { text: "Необходимо найти союзников и", weight: 3 },
    { text: "Пора снарядить экспедицию и", weight: 5 },
    { text: "Следует разыскать старинные записи и", weight: 4 }
  ],
  objective: [
    { text: "добраться до истины.", weight: 4 },
    { text: "получить ответы.", weight: 3 },
    { text: "восстановить равновесие.", weight: 5 },
    { text: "вернуть утраченное время.", weight: 3 },
    { text: "переписать ход истории.", weight: 4 },
    { text: "найти способ спасения.", weight: 5 }
  ],
  outcome: [
    { text: "Это событие изменит мир навсегда.", weight: 5 },
    { text: "Так начнётся новая эра.", weight: 4 },
    { text: "Это станет началом великой легенды.", weight: 3 },
    { text: "Мир уже никогда не будет прежним.", weight: 4 },
    { text: "Это приведёт к невообразимым последствиям.", weight: 5 },
    { text: "Судьба вселенной висит на волоске.", weight: 3 }
  ],
};

interface IProblem {
  title: string;
  description: string;
  weight: number;
  parameters: {
    [key: string]: number;
  };
  reward: {
    expirience: number;
    neurobits: number;
  };
}

const calculateProblemWeightOnParameters = (problemValue: IProblem, userValue: IGlobalValues) => {
  let calculatedWeight = problemValue.weight;

  function calculateWeightDifference(userValue: number, problemValue: number) {
    const difference = userValue - problemValue;
    if (difference > 0) {
      return -10 + Math.abs(difference) * -3;
    } else if (difference < 0) {
      return 10 + Math.abs(difference) * 5;
    }
    return 0;
  }

  const parameterKeys: (keyof typeof userValue.core_parameters)[] = [
    "analysis",
    "logic",
    "intuition",
    "creativity",
    "ideation"
  ];

  parameterKeys.forEach((key) => {
    const userParamWeight = userValue.core_parameters[key];
    const problemParamWeight = problemValue.parameters[key];
    calculatedWeight += (calculatedWeight * calculateWeightDifference(userParamWeight, problemParamWeight)) / 100;
  });

  return Math.round(calculatedWeight);
};

const generateProblem = (): IProblem => {
  const getRandomElement = (arr: { text: string; weight: number }[]) => arr[Math.floor(Math.random() * arr.length)];
  const location = getRandomElement(ProblemList.location);
  const descriptor = getRandomElement(ProblemList.descriptor);
  const event = getRandomElement(ProblemList.event);
  const character = getRandomElement(ProblemList.character);
  const emotion = getRandomElement(ProblemList.emotion);
  const subject = getRandomElement(ProblemList.subject);
  const extra = getRandomElement(ProblemList.extra);
  const action = getRandomElement(ProblemList.action);
  const objective = getRandomElement(ProblemList.objective);
  const outcome = getRandomElement(ProblemList.outcome);

  const problemParameters = {
    analysis: event.weight + subject.weight,
    logic: emotion.weight + action.weight,
    intuition: character.weight + outcome.weight,
    creativity: location.weight + extra.weight,
    ideation: descriptor.weight + objective.weight,
  };
  return {
    title: `Проблема #${generateProblemNumber()}`,
    description: `${location.text} ${descriptor.text} ${event.text} ${character.text} ${emotion.text} ${subject.text} ${extra.text} ${action.text} ${objective.text} ${outcome.text}`,
    parameters: problemParameters,
    weight: 100,
    reward: {
      expirience: Math.floor(1 + Math.random() * 10),
      neurobits: 1,
    }
  };
};

const generateProblemNumber = (): string => String(Math.floor(1 + Math.random() * 99999)).padStart(5, '0');

const ProblemGenerator = () => {
  const holdBarHeight = GetScreenHeight() * 0.05;
  const { updateValues, valuesRef, isActive } = useGlobalValues();
  const [problem, setProblem] = useState(generateProblem());
  const [problemWeight, setProblemWeight] = useState(() => calculateProblemWeightOnParameters(problem, valuesRef.current));
  const [newWeight, setNewWeight] = useState(problemWeight);
  const [shouldUpdateValues, setShouldUpdateValues] = useState(false);

  useEffect(() => {
    const calculateCurrentWeight = () => {
      setNewWeight((prevWeight) => {
        const updatedWeight = prevWeight - valuesRef.current.core_generator.rate * valuesRef.current.core_generator.amount;

        if (updatedWeight <= 0) {
          // console.log("Problem solved. Generating new problem...");
          const newProblem = generateProblem();
          setProblem(newProblem);

          setShouldUpdateValues(true);

          const newProblemWeight = calculateProblemWeightOnParameters(newProblem, valuesRef.current);
          setProblemWeight(newProblemWeight);
          return newProblemWeight;
        }
        return updatedWeight;
      });
    };

    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(calculateCurrentWeight, 1000 / valuesRef.current.core_generator.rate);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, valuesRef, problemWeight]);

  useEffect(() => {
    if (shouldUpdateValues) {
      updateValues({
        core_storage: { 
          ...valuesRef.current.core_storage, 
          units: valuesRef.current.core_storage.units + problem.reward.neurobits > valuesRef.current.core_storage.capacity ? valuesRef.current.core_storage.capacity : valuesRef.current.core_storage.units + problem.reward.neurobits 
        },
        lvl_experience: valuesRef.current.lvl_experience + problem.reward.expirience,
      });
      setShouldUpdateValues(false);
    }
  }, [shouldUpdateValues, problem.reward.neurobits, problem.reward.expirience, updateValues]);

  return (
    <View style={styles.container}>
      <Text style={styles.problemTitle}>{problem.title}</Text>
      <Text style={styles.problemText}>{problem.description}</Text>
      <View style={styles.separator} />
      <View style={styles.parametersContainer}>
        <View style={styles.CoreParameter}>
          <Text style={styles.CoreParameterText}>
            {problem.parameters.analysis}
          </Text>
          <Image
            source={require('../assets/images/AnalysisIcon.png')}
            style={styles.CoreParameterIcon}
          />
        </View>
        <View style={styles.CoreParameter}>
          <Text style={styles.CoreParameterText}>
            {problem.parameters.logic}
          </Text>
          <Image
            source={require('../assets/images/LogicIcon.png')}
            style={styles.CoreParameterIcon}
          />
        </View>
        <View style={styles.CoreParameter}>
          <Text style={styles.CoreParameterText}>
            {problem.parameters.intuition}
          </Text>
          <Image
            source={require('../assets/images/IntuitionIcon.png')}
            style={styles.CoreParameterIcon}
          />
        </View>
        <View style={styles.CoreParameter}>
          <Text style={styles.CoreParameterText}>
            {problem.parameters.creativity}
          </Text>
          <Image
            source={require('../assets/images/CreativityIcon.png')}
            style={styles.CoreParameterIcon}
          />
        </View>
        <View style={styles.CoreParameter}>
          <Text style={styles.CoreParameterText}>
            {problem.parameters.ideation}
          </Text>
          <Image
            source={require('../assets/images/IdeationIcon.png')}
            style={styles.CoreParameterIcon}
          />
        </View>
      </View>
      <View style={styles.separator} />
      <View style={[styles.holdBarTrack, { height: holdBarHeight }]}>
        <View style={[styles.holdBarProgress, { width: `${(1 - newWeight / problemWeight) * 100}%` }]} />
      </View>
      {/* <Text style={styles.problemWeight}>Weight: {problemWeight}</Text>
      <Text style={styles.problemWeight}>Current value: {newWeight}</Text> */}
      {/* <Text style={styles.problemWeight}>{isActiveRef.current ? 'Active' : 'Inactive'}</Text> */}
    </View>
  );
};

export default ProblemGenerator;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'black',
  },
  problemTitle: {
    width: '100%',
    alignSelf: 'flex-start',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingLeft: 7,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  problemText: {
    textAlign: 'justify',
    fontSize: 14,
    color: 'white',
    padding: 8,
  },

  parametersContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  CoreParameter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CoreParameterText: {
    color: 'white',
    fontWeight: 'bold',
    paddingRight: 4,
  },
  CoreParameterIcon: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },

  holdBarTrack: {
    width: '94%',
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    marginVertical: 14,
  },
  holdBarProgress: {
    backgroundColor: 'white',
    height: '100%',
  },
  holdBarStatus: {
    position: 'absolute',
    top: '100%',
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  problemWeight: {
    fontSize: 16,
    color: 'red',
    paddingVertical: 8,
  },
  separator: {
    width: '85%',
    marginVertical: 2,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
});
