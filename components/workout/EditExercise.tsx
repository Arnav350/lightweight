import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { WorkoutContext } from "../../hooks/useWorkout";
import ExerciseDropdown from "./ExerciseDropdown";
import { COLORS } from "../../constants/theme";

interface IProps {
  equipments: string[];
  muscles: string[];
  setShowEdit: Dispatch<SetStateAction<boolean>>;
}

function EditExercise({ equipments, muscles, setShowEdit }: IProps) {
  const { exercises, setExercises } = useContext(WorkoutContext);

  const [exerciseName, setExerciseName] = useState("");
  const [currentEquipment, setCurrentEquipment] = useState("");
  const [currentMuscle, setCurrentMuscle] = useState("");

  function handleSavePress() {}
  function handleAddPress() {}
  function handleDeletePress() {}

  return (
    <View style={styles.container}>
      <View style={styles.editContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity activeOpacity={0.3} onPress={() => setShowEdit(false)}>
            <Icon name="close" size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <TextInput
            value={exerciseName}
            placeholder="Exercise Name"
            placeholderTextColor={COLORS.gray}
            style={styles.header}
            onChangeText={setExerciseName}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={handleSavePress}>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 192, width: 256, backgroundColor: COLORS.gray, alignSelf: "center" }}>
          <Text>Graph</Text>
        </View>
        <View style={styles.dropdownsContainer}>
          <View style={styles.dropdownContainer}>
            <Text style={styles.subheader}>Equipment:</Text>
            <ExerciseDropdown data={equipments} current={currentEquipment} setCurrent={setCurrentEquipment} />
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.subheader}>Muscle:</Text>
            <ExerciseDropdown data={muscles} current={currentMuscle} setCurrent={setCurrentMuscle} />
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonContainer} onPress={handleAddPress}>
          <Text style={styles.button}>Add Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonContainer} onPress={handleDeletePress}>
          <Text style={styles.button}>Delete Exercise</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000bb",
  },
  editContainer: {
    padding: 12,
    backgroundColor: COLORS.black,
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  header: {
    marginHorizontal: 24,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
  save: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "500",
  },
  dropdownsContainer: {
    marginTop: 8,
    marginHorizontal: 4,
    flexDirection: "row",
  },
  dropdownContainer: {
    flex: 1,
    height: 80,
  },
  subheader: {
    marginBottom: 8,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 4,
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  button: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default EditExercise;
