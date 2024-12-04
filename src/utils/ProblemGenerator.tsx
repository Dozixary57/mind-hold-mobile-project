// src\utils\ProblemGenerator.tsx
import { View, StyleSheet, Text, Image } from "react-native";
import { IGlobalValues, useGlobalValues } from "../contexts/GlobalValuesContext";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { GetScreenHeight } from "../tools/ScreenWidth";
import { RoundToInteger, RoundToTwoDecimals, RoundUpToInteger } from "../tools/NumbersFormater";

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

  if (calculatedWeight < (problemValue.weight / 100 * 10)) {
    return Math.round(problemValue.weight / 100 * 10);
  }

  return Math.round(calculatedWeight);
};

const generateProblem = (valuesRef: IGlobalValues): IProblem => {
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

  let problemParameters = {
    analysis: 1,
    logic: 1,
    intuition: 1,
    creativity: 1,
    ideation: 1,
  };

  if (valuesRef.characteristic_coefficients && valuesRef.game_difficult_coef) {
    problemParameters = {
      analysis: RoundUpToInteger(((event.weight + subject.weight) / 10) * valuesRef.game_difficult_coef / valuesRef.characteristic_coefficients.problemParameterCoef),
      logic: RoundUpToInteger(((emotion.weight + action.weight) / 10) * valuesRef.game_difficult_coef / valuesRef.characteristic_coefficients.problemParameterCoef),
      intuition: RoundUpToInteger(((character.weight + outcome.weight) / 10) * valuesRef.game_difficult_coef / valuesRef.characteristic_coefficients.problemParameterCoef),
      creativity: RoundUpToInteger(((location.weight + extra.weight) / 10) * valuesRef.game_difficult_coef / valuesRef.characteristic_coefficients.problemParameterCoef),
      ideation: RoundUpToInteger(((descriptor.weight + objective.weight) / 10) * valuesRef.game_difficult_coef / valuesRef.characteristic_coefficients.problemParameterCoef),
    };
  }

  return {
    title: `Проблема #${generateProblemNumber()}`,
    description: `${location.text} ${descriptor.text} ${event.text} ${character.text} ${emotion.text} ${subject.text} ${extra.text} ${action.text} ${objective.text} ${outcome.text}`,
    parameters: problemParameters,
    weight: valuesRef.characteristic_coefficients.problemWeightCoef ? RoundToInteger(10 * valuesRef.characteristic_coefficients.problemWeightCoef) : 1,
    reward: {
      expirience: 1,
      neurobits: 1,
    }
  };
};

const generateProblemNumber = (): string => String(Math.floor(1 + Math.random() * 99999)).padStart(5, '0');

const ProblemGenerator = forwardRef((props, ref) => {
  const holdBarHeight = GetScreenHeight() * 0.05;
  const { updateValues, valuesRef, isActive, resetProblemRef } = useGlobalValues();
  const [problem, setProblem] = useState(generateProblem(valuesRef.current));
  const [problemWeight, setProblemWeight] = useState(() => calculateProblemWeightOnParameters(problem, valuesRef.current));
  const [newWeight, setNewWeight] = useState(problemWeight);
  const [shouldUpdateValues, setShouldUpdateValues] = useState(false);

  const resetProblem = () => {
    const newProblem = generateProblem(valuesRef.current);
    setProblem(newProblem);
    const newProblemWeight = calculateProblemWeightOnParameters(newProblem, valuesRef.current);
    setNewWeight(newProblemWeight);
    setProblemWeight(newProblemWeight);
  };

  useImperativeHandle(ref, () => ({
    resetProblem
  }));

  useEffect(() => {
    resetProblemRef.current = resetProblem;

    return () => {
      resetProblemRef.current = null;
    };
  }, []);

  useEffect(() => {
    const calculateCurrentWeight = () => {
      setNewWeight((prevWeight) => {
        const updatedWeight = RoundToTwoDecimals(prevWeight - valuesRef.current.core_generator.rate * valuesRef.current.core_generator.amount);

        if (updatedWeight <= 0) {
          const newProblem = generateProblem(valuesRef.current);
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
        statistics: {
          ...valuesRef.current.statistics,
          totalSolvedProblems: valuesRef.current.statistics.totalSolvedProblems + 1,
          totalGainedNeurobits:
            valuesRef.current.statistics.totalGainedNeurobits +
            ((valuesRef.current.core_storage.units + problem.reward.neurobits) >
              (valuesRef.current.core_storage.capacity - valuesRef.current.core_storage.units) ?
              (valuesRef.current.core_storage.capacity - valuesRef.current.core_storage.units)
              :
              problem.reward.neurobits),
          maxProblemAnalysisParameter: Math.max(valuesRef.current.statistics.maxProblemAnalysisParameter, problem.parameters.analysis),
          maxProblemLogicParameter: Math.max(valuesRef.current.statistics.maxProblemLogicParameter, problem.parameters.logic),
          maxProblemIntuitionParameter: Math.max(valuesRef.current.statistics.maxProblemIntuitionParameter, problem.parameters.intuition),
          maxProblemCreativityParameter: Math.max(valuesRef.current.statistics.maxProblemCreativityParameter, problem.parameters.creativity),
          maxProblemIdeationParameter: Math.max(valuesRef.current.statistics.maxProblemIdeationParameter, problem.parameters.ideation),
          maxProblemWeight: Math.max(valuesRef.current.statistics.maxProblemWeight, problemWeight),
        },
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
      <View style={[styles.problemBarTrack, { height: holdBarHeight }]}>
        <View style={[styles.problemBarProgress, { width: `${(1 - newWeight / problemWeight) * 100}%` }]} />
        <Text style={[styles.problemBarStatus, styles.problemBarStatus_left]}>{RoundToTwoDecimals(problemWeight - newWeight)}</Text>
        <Text style={[styles.problemBarStatus, styles.problemBarStatus_middle]}>{`${Math.round((1 - newWeight / problemWeight) * 100)}%`}</Text>
        <Text style={[styles.problemBarStatus, styles.problemBarStatus_right]}>{problemWeight}</Text>
      </View>
    </View>
  );
});

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

  problemBarTrack: {
    position: 'relative',
    width: '94%',
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    marginVertical: 14,
  },
  problemBarProgress: {
    backgroundColor: 'white',
    height: '100%',
  },
  problemBarStatus: {
    position: 'absolute',
    color: 'black',

    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
    textShadowColor: 'white',
  },
  problemBarStatus_left: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    fontSize: 14,
  },
  problemBarStatus_middle: {
    alignSelf: 'center',
    fontSize: 18,
  },
  problemBarStatus_right: {
    alignSelf: 'flex-end',
    paddingRight: 10,
    fontSize: 14,
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
