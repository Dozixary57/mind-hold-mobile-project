// src\utils\ProblemGenerator.tsx
import { View, StyleSheet, Button, Text } from "react-native";
import { useGlobalValues } from "../contexts/GlobalValuesContext";
import { useState } from "react";

const ProblemList = {
  location: [
    "В древней крепости Терранос,",
    "На далёкой планете Мирра,",
    "На берегу озера Вечности,",
    "На пустынной равнине Синиль,",
    "На вершине горы Этерниа,",
    "В подземелье Забвения,"
  ],
  descriptor: [
    "окутанной магическими барьерами,",
    "где время остановилось,",
    "покрытой ледяной коркой,",
    "в сердце раскалённых песков,",
    "где обитают тени прошлого,",
    "полной загадок и опасностей,"
  ],
  event: [
    "случился выброс энергии.",
    "произошло странное свечение.",
    "раздался таинственный шум.",
    "появился мистический знак.",
    "упал метеорит из далёкой галактики.",
    "вспыхнуло пламя неизвестного происхождения."
  ],
  character: [
    "Одинокий странник,",
    "Могущественный маг,",
    "Исследователь временных пространств,",
    "Посланник древних цивилизаций,",
    "Спаситель из будущего,",
    "Призрак прошлого,"
  ],
  emotion: [
    "исполненный решимости,",
    "поглощённый страхом,",
    "пылающий от любопытства,",
    "переполненный печалью,",
    "охваченный энтузиазмом,",
    "в поисках надежды,"
  ],
  subject: [
    "ищет источник силы,",
    "пытается разгадать древнюю тайну,",
    "открывает путь в неизведанное,",
    "ищет способ спасти мир,",
    "готовится к финальному бою,",
    "стремится разгадать загадку,"
  ],
  extra: [
    "которая изменит судьбу всех,",
    "связанную с его прошлым.",
    "ведущую к запретному знанию.",
    "оставшуюся неразгаданной веками.",
    "которая принадлежала его предкам.",
    "запечатанную в древних манускриптах."
  ],
  action: [
    "Нужно собрать артефакты и",
    "Следует отправиться в поход и",
    "Важно подготовиться к опасностям и",
    "Необходимо найти союзников и",
    "Пора снарядить экспедицию и",
    "Следует разыскать старинные записи и"
  ],
  objective: [
    "добраться до истины.",
    "получить ответы.",
    "восстановить равновесие.",
    "вернуть утраченное время.",
    "переписать ход истории.",
    "найти способ спасения."
  ],
  outcome: [
    "Это событие изменит мир навсегда.",
    "Так начнётся новая эра.",
    "Это станет началом великой легенды.",
    "Мир уже никогда не будет прежним.",
    "Это приведёт к невообразимым последствиям.",
    "Судьба вселенной висит на волоске."
  ],
};


const generateProblem = (): string => {
  const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  return Object.values(ProblemList).map(getRandomElement).join(' ');
};

const generateProblemNumber = (): number => Math.floor(1 + Math.random() * 99999);

const ProblemGenerator = () => {
  const [problem, setProblem] = useState<string>(generateProblem());
  const [problemNumber, setProblemNumber] = useState<number>(generateProblemNumber());

  const handleGenerateNewProblem = () => {
    setProblem(generateProblem());
    setProblemNumber(generateProblemNumber());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.problemTitle}>Проблема #{problemNumber}</Text>
      <View style={styles.problemTextContainer}>
        <Text style={styles.problemText}>{problem}</Text>
      </View>
      <Button title="Сгенерировать новую проблему" onPress={handleGenerateNewProblem} />
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
    backgroundColor: 'black'
  },
  problemTitle: {
    alignSelf: 'flex-start',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingLeft: 7,
  },
  problemTextContainer: {
    width: '100%',
    borderTopWidth: 2,
    borderTopColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  problemText: {
    textAlign: 'justify',
    fontSize: 14,
    color: 'white',
    padding: 8,
  }
});