import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LevelAndStorageBar_Minimalized } from "../components/LevelAndStorageBar";
import { IGlobalValues, useGlobalValues } from "../contexts/GlobalValuesContext";
import Toast from "react-native-toast-message";
import { RoundToTwoDecimals } from "../tools/NumbersFormater";

type UpgradeItem = {
  key: string;
  title: string;
  description: string;
  value: number;
  cost: number;
};

type Section = {
  title: string;
  items: UpgradeItem[];
};

type ExpandedSections = {
  [key: string]: boolean;
};

const UpgradeScreen: React.FC = () => {
  const { values, updateValues } = useGlobalValues();

  const sectionsData: Section[] = [
    {
      title: "Core parameters",
      items: [
        {
          key: "core_parameters.analysis",
          title: "Analysis",
          description: "Enhances the ability to analyze complex situations and think critically, improving your problem-solving strategies.",
          value: values.core_parameters.analysis,
          cost: values.core_parameters.analysis,
        },
        {
          key: "core_parameters.logic",
          title: "Logic",
          description: "Improves logical reasoning and the ability to form coherent, structured arguments, helping you make more informed decisions.",
          value: values.core_parameters.logic,
          cost: values.core_parameters.logic,
        },
        {
          key: "core_parameters.intuition",
          title: "Intuition",
          description: "Boosts your ability to make quick decisions based on gut feelings and an inherent understanding of complex scenarios.",
          value: values.core_parameters.intuition,
          cost: values.core_parameters.intuition,
        },
        {
          key: "core_parameters.creativity",
          title: "Creativity",
          description: "Stimulates innovative and out-of-the-box thinking, enabling you to come up with unique solutions to challenges.",
          value: values.core_parameters.creativity,
          cost: values.core_parameters.creativity,
        },
        {
          key: "core_parameters.ideation",
          title: "Ideation",
          description: "Improves your ability to generate ideas and think creatively, which is essential for finding new approaches to problems.",
          value: values.core_parameters.ideation,
          cost: values.core_parameters.ideation,
        },
      ],
    },
    {
      title: "Storage",
      items: [
        {
          key: "core_storage.capacity",
          title: "Storage capacity",
          description: "Increases the amount of data you can store, boosting your memory retention and your ability to handle large amounts of information.",
          value: values.core_storage.capacity,
          cost: values.core_storage.capacity,
        }
      ]
    },
    {
      title: "Additional benefits",
      items: [
        {
          key: "upgrade_values.additionalNeurobits",
          title: "Extra neurobits",
          description: "Increases the number of neurobits, which improves your overall capacity for storing and processing information.",
          value: values.upgrade_values.additionalNeurobits,
          cost: RoundToTwoDecimals((values.upgrade_values.additionalNeurobits + 1) * 2),
        },
        {
          key: "upgrade_values.additionalExperience",
          title: "Extra XP",
          description: "Boosts your experience points gain rate, allowing you to level up faster and gain access to new skills and abilities.",
          value: values.upgrade_values.additionalExperience,
          cost: RoundToTwoDecimals((values.upgrade_values.additionalExperience + 1) * 2),
        },
      ],
    },
  ];
  
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    {}
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<UpgradeItem | null>(null);

  useEffect(() => {
    const loadState = async () => {
      try {
        const storedState = await AsyncStorage.getItem("expandedSections");
        if (storedState) {
          setExpandedSections(JSON.parse(storedState) as ExpandedSections);
        }
      } catch (e) {
        console.error("Failed to load expanded sections state:", e);
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem(
          "expandedSections",
          JSON.stringify(expandedSections)
        );
      } catch (e) {
        console.error("Failed to save expanded sections state:", e);
      }
    };
    saveState();
  }, [expandedSections]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const openModal = (item: UpgradeItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderSection = ({ item }: { item: Section }) => {
    const isExpanded = expandedSections[item.title];

    return (
      <View style={styles.sectionContainer}>
        <TouchableOpacity onPress={() => toggleSection(item.title)}>
          <View style={styles.sectionTitle}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.title}>{isExpanded ? "▼" : "►"}</Text>
          </View>
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.itemsContainer}>
            {item.items.map((subItem, index) => (
              <View key={index} style={styles.itemRow}>
                <TouchableOpacity
                  style={[styles.columnTitle, styles.itemTitleContainer]}
                  onPress={() => openModal(subItem)}
                >
                  <Text style={styles.itemText}>{subItem.title}</Text>
                  <View style={[styles.itemButton, styles.itemButtonCircle]}>
                    <Text style={styles.itemButtonText}>?</Text>
                  </View>
                </TouchableOpacity>
                <Text style={[styles.columnValue, styles.itemText]}>{subItem.value} ❯ {subItem.value + 1}</Text>
                <View style={[styles.columnCost, styles.itemCostContainer]}>
                  <Text style={[styles.itemText]}>{subItem.cost}</Text>
                  <Image
                    source={require("../assets/images/NeurobitsIcon.png")}
                    style={styles.costIcon}
                  />
                </View>
                <View style={styles.columnButton}>
                  <TouchableOpacity
                    style={[styles.itemButton, styles.itemButtonSquare]}
                    onPress={() => {
                      const currentCost = subItem.cost;
                      const currentValue = subItem.value;
                      const keyPath = subItem.key.split('.') as [keyof IGlobalValues, string];

                      if (values.core_storage.units < currentCost) {
                        Toast.show({
                          type: "custom",
                          text1: "Not enough neurobits",
                          position: "bottom",
                          visibilityTime: 2000,
                        });
                      } else {
                        const updatedCoreStorage = {
                          ...values.core_storage,
                          units: values.core_storage.units - currentCost,
                        };

                        const updatedValues: Partial<IGlobalValues> = {
                          ...values,
                          core_storage: updatedCoreStorage,
                        };

                        const [firstKey, secondKey] = keyPath;
                        if (updatedValues[firstKey]) {
                          updatedValues[firstKey] = {
                            ...(updatedValues[firstKey] as any),
                            [secondKey]: currentValue + 1,
                          };
                        }

                        updateValues(updatedValues);
                      }
                    }}
                  >
                    <Text style={styles.itemButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LevelAndStorageBar_Minimalized />

      <View style={styles.header}>
        <Text style={[styles.columnTitle, styles.headerText]}>Title</Text>
        <Text style={[styles.columnValue, styles.headerText]}>Value</Text>
        <Text style={[styles.columnCost, styles.headerText]}>Cost</Text>
        <Text style={styles.columnButton}>+</Text>
      </View>

      <FlatList
        data={sectionsData}
        renderItem={renderSection}
        keyExtractor={(item) => item.title}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedItem.description}
                </Text>
                {/* <Text style={styles.modalDetails}>
                  Cost: {selectedItem.cost}
                </Text>
                <Text style={styles.modalDetails}>
                  Value: {selectedItem.value}
                </Text> */}
              </>
            )}
            {/* <TouchableOpacity
              style={styles.modalButton}
            /> */}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default UpgradeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 4,
    borderBottomWidth: 4,
    borderBottomColor: "white",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  container: {
    paddingHorizontal: 10,
  },
  sectionContainer: {
    marginVertical: 7,
    alignItems: "center",
  },

  columnTitle: {
    width: "44%",
    color: "white",
  },
  columnValue: {
    width: "25%",
    textAlign: "center",
    color: "white",
  },
  columnCost: {
    width: "16%",
    justifyContent: "center",
    color: "white",
  },
  columnButton: {
    width: "15%",
    alignItems: "flex-end",
    color: "transparent",
  },

  sectionTitle: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  itemsContainer: {
    width: "98%",
    marginTop: 2,
    borderWidth: 1,
    borderColor: "white",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    borderColor: "white",
    borderBottomWidth: 1,
  },
  itemTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemCostContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  costIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
    fontSize: 16,
    marginLeft: 2,
  },

  itemButton: {
    width: 30,
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 5,
  },
  itemButtonCircle: {
    borderColor: "white",
    borderRadius: "50%",
    transform: [{ scale: 0.55 }, { translateY: 2 }],
  },
  itemButtonSquare: {
    borderColor: "white",
    borderRadius: 0,
    transform: [{ scale: 1.1 }],
  },
  itemButtonText: {
    fontSize: 12,
    color: "white",
    transform: [{ scale: 1.8 }, { translateY: -1.4 }],
  },
  itemText: {
    fontSize: 14,
    color: "white",
    paddingVertical: 8,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "white",
    marginBottom: "10%",
  },
  modalTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    color: "white",
    textAlign: "justify",
    fontSize: 16,
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalButton: {
    borderWidth: 2,
    borderColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    marginVertical: 10,
  },
});
