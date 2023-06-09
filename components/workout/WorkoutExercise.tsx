import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import ExerciseSet from "./ExerciseSet";
import { ISet, IExercise } from "../../pages/workout/Workout";

import { COLORS } from "../../constants/theme";
import { WorkoutContext } from "../../hooks/useWorkout";

interface IProps {
  i: number;
}

const init: IExercise = {
  name: "Bench Press",
  equipment: "Barbell",
  muscle: "Chest",
  notes: "New PR!",
  sets: [
    { type: "W", weight: 200, reps: 10, notes: "notes" },
    { type: "N", weight: 300, reps: 8, notes: "" },
    { type: "D", weight: 400, reps: 6, notes: "" },
    { type: "N", weight: 500, reps: 1, notes: "WOW" },
  ],
};

function Exercise({ i }: IProps) {
  const { currentWorkout, setCurrentWorkout, exercises, setExercises } = useContext(WorkoutContext);
  const [prevExercise, setPrevExercise] = useState<IExercise>(init);

  // const a: number= exercises.filter((exercise, i) => exercise.name === exercises[i].name)[0].sets.length;

  useEffect(() => {
    const lengthDifference = currentWorkout.exercises[i].sets.length - prevExercise.sets.length;

    if (lengthDifference > 0) {
      setPrevExercise({
        ...prevExercise,
        sets: [
          ...prevExercise.sets,
          ...Array(lengthDifference).fill({
            type: "N" as const,
            weight: 0,
            reps: 0,
            notes: "",
          }),
        ],
      });
    }
  }, [currentWorkout.exercises[i].sets.length]);

  function handleAddPress() {
    setCurrentWorkout({
      ...currentWorkout,
      exercises: [
        ...currentWorkout.exercises.map((exercise: IExercise, j: number) =>
          j === i
            ? {
                ...exercise,
                sets: [...exercise.sets, { type: "N" as const, weight: 0, reps: 0, notes: "" }],
              }
            : exercise
        ),
      ],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText} numberOfLines={1}>
          {currentWorkout.exercises[i].name}
        </Text>
        <Icon name="dots-horizontal" size={24} color={COLORS.white} />
      </View>
      <View style={styles.subtitlesContainer}>
        <Text style={styles.subtitle}>Set</Text>
        <Text style={styles.subtitle}>Weight</Text>
        <Text style={styles.subtitle}>Reps</Text>
        <Text style={styles.subtitle}>Notes</Text>
      </View>
      <View style={styles.setsContainer}>
        {prevExercise.sets.slice(0, currentWorkout.exercises[i].sets.length).map((prevSet: ISet, j: number) => (
          <ExerciseSet key={j} i={i} j={j} prevSet={prevSet} />
        ))}
      </View>
      <TouchableOpacity activeOpacity={0.5} style={styles.addButton} onPress={handleAddPress}>
        <Text style={styles.addText}>+ Add Set</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    padding: 16,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topText: {
    maxWidth: "90%",
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  subtitlesContainer: {
    flexDirection: "row",
    padding: 4,
  },
  subtitle: {
    marginHorizontal: 2,
    color: COLORS.white,
    fontSize: 16,
  },
  setsContainer: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray,
  },
  addButton: {
    marginTop: 8,
  },
  addText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Exercise;
