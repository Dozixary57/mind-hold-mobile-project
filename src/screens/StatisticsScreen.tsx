import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import gStyles from "../styles/styles";
import { useGlobalValues } from "../contexts/GlobalValuesContext";
import { LevelCalculate } from "../tools/LevelAndExperienceCalculating";

// Critical thinking like a multiple parameter of parameters

const StatisticsScreen = () => {
  const { values } = useGlobalValues();

  return (
    <View style={gStyles.ScreenContainer_start}>
      <Text style={gStyles.bigHeader}>Statistics</Text>
      <View style={gStyles.separator} />
      <ScrollView style={styles.statsList}>
        {/* <Text style={gStyles.simpleHeader}>General Stats</Text> */}

        <View style={gStyles.subsectionTitleSeparator_container}>
          <Text style={gStyles.subsectionTitleSeparator_text}>Progress</Text>
          <View style={gStyles.subsectionTitleSeparator_line} />
        </View>
        {/* <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>In game total spent time</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Active spent time</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Inactive spent time</Text>
        </View> */}
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Total problems solved</Text>
          <Text style={styles.statsValue}>{values.statistics.totalSolvedProblems}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Reached level</Text>
          <Text style={styles.statsValue}>{LevelCalculate(values.lvl_experience)}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Total experience points</Text>
          <Text style={styles.statsValue}>{values.lvl_experience}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Total gained neurobits</Text>
          <Text style={styles.statsValue}>{values.statistics.totalGainedNeurobits}</Text>
        </View>

        <View style={gStyles.subsectionTitleSeparator_container}>
          <Text style={gStyles.subsectionTitleSeparator_text}>Parameters</Text>
          <View style={gStyles.subsectionTitleSeparator_line} />
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Analysis</Text>
          <Text style={styles.statsValue}>{values.core_parameters.analysis}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Logic</Text>
          <Text style={styles.statsValue}>{values.core_parameters.logic}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Intuition</Text>
          <Text style={styles.statsValue}>{values.core_parameters.intuition}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Creativity</Text>
          <Text style={styles.statsValue}>{values.core_parameters.creativity}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Ideation</Text>
          <Text style={styles.statsValue}>{values.core_parameters.ideation}</Text>
        </View>

        <View style={gStyles.subsectionTitleSeparator_container}>
          <Text style={gStyles.subsectionTitleSeparator_text}>Problem</Text>
          <View style={gStyles.subsectionTitleSeparator_line} />
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Max analysis parameter</Text>
          <Text style={styles.statsValue}>{values.statistics.maxProblemAnalysisParameter}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Max logic parameter</Text>
          <Text style={styles.statsValue}>{values.statistics.maxProblemLogicParameter}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Max intuition parameter</Text>
          <Text style={styles.statsValue}>{values.statistics.maxProblemIntuitionParameter}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Max creativity parameter</Text>
          <Text style={styles.statsValue}>{values.statistics.maxProblemCreativityParameter}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Max ideation parameter</Text>
          <Text style={styles.statsValue}>{values.statistics.maxProblemIdeationParameter}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsTitle}>Max weight</Text>
          <Text style={styles.statsValue}>{values.statistics.maxProblemWeight}</Text>
        </View>

      </ScrollView>
    </View >
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  // statsSection: {
  //   width: '85%',
  //   flexDirection: 'column',
  // },
  statsList: {
    flex: 1,
    width: '85%',
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
  statsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  statsTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'normal',
  }
  // statsSection: {
  //   flexDirection: 'row',
});