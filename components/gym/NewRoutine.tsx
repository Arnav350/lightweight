import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { WorkoutContext } from "../../hooks/useWorkout";
import { IExercise, ISet } from "../../pages/workout/Workout";
import RoutineSet from "./RoutineSet";
import { COLORS } from "../../constants/theme";

interface IProps {
  exercise: IExercise;
}

function NewRoutine({ exercise: { name, notes, sets } }: IProps) {
  const { currentWorkout, setCurrentWorkout } = useContext(WorkoutContext);

  function handleAddPress() {
    setCurrentWorkout({
      ...currentWorkout,
      exercises: [
        ...currentWorkout.exercises.map((exercise: IExercise) =>
          exercise.name === name
            ? {
                ...exercise,
                sets: [...exercise.sets, { type: "N" as const, weight: "" as const, reps: "" as const, notes: "" }],
              }
            : exercise
        ),
      ],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{name}</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="dots-horizontal" color={COLORS.white} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.newContainer}>
        {sets.map((set: ISet, i: number) => (
          <RoutineSet key={i} set={set} />
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

export default NewRoutine;
