import { Dispatch, SetStateAction, useContext, useMemo, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { LineChart } from "react-native-chart-kit";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TRootStackParamList } from "../../App";
import { WorkoutContext } from "../../hooks/useWorkout";
import ExerciseDropdown from "./ExerciseDropdown";
import { equipmentsList, musclesList } from "../../constants/init";
import { COLORS } from "../../constants/theme";

interface IProps {
  navigate: StackScreenProps<TRootStackParamList, "Exercises">;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  editExercise: IExercise | null;
}

const windowDimensions = Dimensions.get("window");

function EditExercise({ navigate: { navigation }, setShowEdit, editExercise }: IProps) {
  const { setCurrentWorkout, workouts, setExercises } = useContext(WorkoutContext);

  const filteredWorkouts: IWorkout[] = useMemo(
    () =>
      workouts
        .filter((workout: IWorkout) => workout.exercises.find((exercise) => exercise.name === editExercise?.name))
        .slice()
        .reverse(),
    [workouts]
  );

  const filteredExercises: IExercise[] = useMemo(
    () =>
      filteredWorkouts.map(
        (workout) => workout.exercises.filter((exercise: IExercise) => exercise.name === editExercise?.name)[0]
      ),
    [filteredWorkouts]
  );

  const maxWeight: number[] = useMemo(
    () =>
      filteredExercises.map((exercise: IExercise) => Math.max(...exercise.sets.map((set: ISet) => Number(set.weight)))),
    [filteredExercises]
  );

  const oneRM: number[] = useMemo(
    () =>
      filteredExercises.map((exercise: IExercise) =>
        Math.max(...exercise.sets.map((set: ISet) => Number(set.weight) * (1 + Number(set.reps) / 30)))
      ),
    [filteredExercises]
  );

  const [exerciseName, setExerciseName] = useState<string>(editExercise?.name || "");
  const [currentEquipment, setCurrentEquipment] = useState<string>(editExercise?.equipment || "Any Equipment");
  const [currentMuscle, setCurrentMuscle] = useState(editExercise?.muscle || "Any Muscle");

  function handleSavePress() {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.name === editExercise?.name
          ? { ...exercise, name: exerciseName, equipment: currentEquipment, muscle: currentMuscle }
          : exercise
      )
    );
    setShowEdit(false);
  }

  function handleAddPress() {
    if (editExercise) {
      setCurrentWorkout((prevCurrentWorkout) => ({
        ...prevCurrentWorkout,
        exercises: [...prevCurrentWorkout.exercises, { ...editExercise, sets: [editExercise.sets[0]] }],
      }));

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
        <LineChart
          data={{
            labels:
              oneRM.length > 1 ? filteredWorkouts.map((workout) => `${workout.date.month} ${workout.date.day}`) : [],
            datasets: [
              {
                data: oneRM.length > 1 ? oneRM : [0, 0.001, 0.001, 0.001, 0.002],
              },
            ],
            legend: [oneRM.length > 1 ? "One Rep Max" : "Perform exercise twice for chart"],
          }}
          width={windowDimensions.width / 1.5}
          height={windowDimensions.height / 4}
          chartConfig={{
            backgroundGradientFrom: COLORS.primary,
            backgroundGradientTo: COLORS.primary,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: COLORS.primary,
            },
          }}
          style={styles.chart}
        />
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
    margin: 16,
    padding: 8,
    backgroundColor: COLORS.black,
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
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
  chart: {
    padding: 8,
    alignSelf: "center",
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
