import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TRootStackParamList } from "../../App";
import { WorkoutContext } from "../../hooks/useWorkout";
import { IExercise } from "../../pages/workout/Workout";
import ExerciseDropdown from "./ExerciseDropdown";
import { equipmentsList, musclesList } from "../../constants/init";
import { COLORS } from "../../constants/theme";

interface IProps {
  navigate: StackScreenProps<TRootStackParamList, "Add">;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  editExercise: IExercise | null;
}

function EditExercise({ navigate: { navigation }, setShowEdit, editExercise }: IProps) {
  const { currentWorkout, setCurrentWorkout, exercises, setExercises } = useContext(WorkoutContext);

  const [exerciseName, setExerciseName] = useState<string>(editExercise?.name || "");
  const [currentEquipment, setCurrentEquipment] = useState<string>(editExercise?.equipment || "Any Equipment");
  const [currentMuscle, setCurrentMuscle] = useState(editExercise?.muscle || "Any Muscle");

  function handleSavePress() {
    setExercises(
      exercises.map((exercise) =>
        exercise.name === editExercise?.name
          ? { ...exercise, name: exerciseName, equipment: currentEquipment, muscle: currentMuscle }
          : exercise
      )
    );
    setShowEdit(false);
  }

  function handleAddPress() {
    if (editExercise) {
      setCurrentWorkout({ ...currentWorkout, exercises: [...currentWorkout.exercises, editExercise] });
      setShowEdit(false);
      navigation.goBack();
    }
  }

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
            <ExerciseDropdown data={equipmentsList} current={currentEquipment} setCurrent={setCurrentEquipment} />
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.subheader}>Muscle:</Text>
            <ExerciseDropdown data={musclesList} current={currentMuscle} setCurrent={setCurrentMuscle} />
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.5} style={styles.addContainer} onPress={handleAddPress}>
          <Text style={styles.add}>Add Exercise</Text>
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
    backgroundColor: "#111111ee",
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
    zIndex: 1,
    flexDirection: "row",
    marginTop: 8,
    marginHorizontal: 4,
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
  addContainer: {
    marginVertical: 4,
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  add: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default EditExercise;
