import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import gStyles from "../styles/styles";
import { LevelAndStorageBar_Minimalized } from "../components/LevelAndStorageBar";

// Critical thinking like a multiple parameter of parameters

const UpgradeScreen = () => {
  return (
    <View style={gStyles.ScreenContainer_start}>
      <LevelAndStorageBar_Minimalized />

      <View style={styles.listContainer}>
        <View style={styles.upgradeListHeader}>
          <Text style={[styles.upgradeListTitle, styles.listFirstColumn]}>Upgrade</Text>
          <Text style={[styles.upgradeListTitle, styles.listSecondColumn]}>Value</Text>
          <Text style={[styles.upgradeListTitle, styles.listThirdColumn]}>Price</Text>
          <Text style={[styles.upgradeListTitle, styles.listFourthColumn]}></Text>
        </View>
        <ScrollView contentContainerStyle={styles.upgradeListBody}>
          <View style={[styles.subsectionTitleSeparator_container]}>
            <Text style={styles.subsectionTitleSeparator_text}>General</Text>
            <View style={styles.subsectionTitleSeparator_line} />
          </View>
          <View style={styles.upgradeListItem}>
            <Text style={[styles.upgradeListItem, styles.listFirstColumn]}>Upgrade</Text>
            <Text style={[styles.upgradeListItem, styles.listSecondColumn]}>Level</Text>
            <Text style={[styles.upgradeListItem, styles.listThirdColumn]}>Price</Text>
            <Text style={[styles.upgradeListItem, styles.listFourthColumn]}></Text>
          </View>

        </ScrollView>
      </View>
    </View>
  );
};

export default UpgradeScreen;

const styles = StyleSheet.create({
  listContainer: {
    width: '90%',
    marginTop: 10,
  },
  listFirstColumn: {
    width: '40%',
  },
  listSecondColumn: {
    width: '25%',
  },
  listThirdColumn: {
    width: '25%',
  },
  listFourthColumn: {
    width: '10%',
  },
  upgradeListHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 5,
  },
  upgradeListTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
    // paddingLeft: 10,
    textAlign: 'left',
  },
  upgradeListBody: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  upgradeListItem: {
    flexDirection: 'row',
    color: 'white',
    fontSize: 14,
    paddingVertical: 5,
    textAlign: 'left',
  },


  subsectionTitleSeparator_container:
  {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 6,
    // paddingLeft: 10,
    paddingBottom: 2,
    opacity: 0.5,
  },
  subsectionTitleSeparator_text:
  {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subsectionTitleSeparator_line:
  {
    width: '85%',
    borderBottomColor: 'white',
    borderBottomWidth: 3,
  },
});