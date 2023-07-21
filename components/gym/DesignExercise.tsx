import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { WorkoutContext } from "../../hooks/useWorkout";
import { IExercise, ISet } from "../../pages/workout/Workout";
import RoutineSet from "./RoutineSet";
import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  exercise: IExercise;
}

function DesignExercise({ i, exercise }: IProps) {
  const { setCurrentRoutine } = useContext(WorkoutContext);

  function handleAddPress() {
    setCurrentRoutine((prevCurrentRoutine) => ({
      ...prevCurrentRoutine,
      exercises: [
        ...prevCurrentRoutine.exercises.map((currentExercise: IExercise) =>
          currentExercise.name === exercise.name
            ? {
                ...currentExercise,
                sets: [
                  ...currentExercise.sets,
                  { type: "N" as const, weight: "" as const, reps: "" as const, notes: "" },
                ],
              }
            : currentExercise
        ),
      ],
    }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{exercise.name}</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="dots-horizontal" color={COLORS.white} size={24} />
        </TouchableOpacity>
      </View>
      {exercise.notes && <Text style={styles.notes}>{exercise.notes}</Text>}
      <View style={styles.newContainer}>
        {exercise.sets.map((set: ISet, j: number) => (
          <RoutineSet key={j} i={i} j={j} set={set} exercise={exercise} />
        ))}
      </View>
      <TouchableOpacity activeOpacity={0.5} style={styles.addContainer} onPress={handleAddPress}>
        <Text style={styles.add}>+ Add Set</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
  },
  header: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  notes: {
    color: COLORS.white,
    fontSize: 16,
  },
  newContainer: {
    marginHorizontal: 8,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray,
  },
  addContainer: {
    marginTop: 8,
  },
  add: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default DesignExercise;
