import { useContext, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TRootStackParamList } from "../../App";
import { WorkoutContext } from "../../hooks/useWorkout";
import { IExercise } from "../workout/Workout";
import ExerciseDropdown from "../../components/shared/ExerciseDropdown";
import AddExercise from "../../components/shared/AddExercise";
import EditExercise from "../../components/shared/EditExercise";
import NewExercise from "../../components/shared/NewExercise";
import { equipmentsList, musclesList } from "../../constants/init";
import { COLORS } from "../../constants/theme";

type TProps = StackScreenProps<TRootStackParamList, "Exercises">;

function Exercises(props: TProps) {
  const {
    navigation,
    route: { params },
  } = props;

  const { currentWorkout, exercises } = useContext(WorkoutContext);

  const [exerciseName, setExerciseName] = useState<string>("");

  const [currentEquipment, setCurrentEquipment] = useState<string>("Any Equipment");
  const [currentMuscle, setCurrentMuscle] = useState<string>("Any Muscle");

  const [showNew, setShowNew] = useState<boolean>(false);

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [editExercise, setEditExercise] = useState<IExercise | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Add Exercise</Text>
        <TouchableOpacity activeOpacity={0.3} onPress={() => setShowNew(true)}>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.inputContainer}>
          <Icon name="magnify" size={24} color={COLORS.gray} />
          <TextInput
            value={exerciseName}
            placeholder="Search exercise"
            placeholderTextColor={COLORS.gray}
            keyboardAppearance="dark"
            style={styles.input}
            onChangeText={setExerciseName}
          />
        </View>
        <View style={styles.dropdownsContainer}>
          <ExerciseDropdown
            data={["Any Equipment", ...equipmentsList]}
            current={currentEquipment}
            setCurrent={setCurrentEquipment}
          />
          <ExerciseDropdown
            data={["Any Muscle", ...musclesList]}
            current={currentMuscle}
            setCurrent={setCurrentMuscle}
          />
        </View>
      </View>
      <ScrollView style={styles.exercisesContainer}>
        <View>{!exerciseName && <Text style={styles.subheader}>Recent</Text>}</View>
        <View>
          {!exerciseName && <Text style={styles.subheader}>All Exercises</Text>}
          {exercises
            .filter(
              (exercise: IExercise) =>
                exercise.name.toLowerCase().includes(exerciseName.toLowerCase()) &&
                (currentEquipment === exercise.equipment || currentEquipment === "Any Equipment") &&
                (currentMuscle === exercise.muscle || currentMuscle === "Any Muscle")
            )
            .map((exercise: IExercise, i: number) => (
              <AddExercise
                key={exercise.name}
                i={params.i}
                navigate={props}
                exercise={exercise}
                setShowEdit={setShowEdit}
                setEditExercise={setEditExercise}
              />
            ))}
          {params.i === currentWorkout.exercises.length && (
            <>
              <Text style={styles.dont}>Don't see the exercise you want?</Text>
              <TouchableOpacity activeOpacity={0.5} style={styles.newContainer} onPress={() => setShowNew(true)}>
                <Text style={styles.new}>Create New Exercise</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={showEdit}>
        <EditExercise navigate={props} setShowEdit={setShowEdit} editExercise={editExercise} />
      </Modal>
      <Modal animationType="fade" transparent={true} visible={showNew}>
        <NewExercise setShowNew={setShowNew} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blackTwo,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackTwo,
  },
  header: {
    paddingVertical: 8,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
  optionsContainer: {
    position: "relative",
    zIndex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: COLORS.black,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    paddingHorizontal: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    paddingLeft: 16,
    color: COLORS.white,
    fontSize: 16,
  },
  dropdownsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  exercisesContainer: {
    padding: 16,
    backgroundColor: COLORS.black,
  },
  subheader: {
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  dont: {
    marginVertical: 16,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  newContainer: {
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  new: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default Exercises;
