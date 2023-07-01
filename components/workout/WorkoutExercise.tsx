import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import ExerciseSet from "./ExerciseSet";
import { ISet, IExercise } from "../../pages/workout/Workout";

import { COLORS } from "../../constants/theme";
import { WorkoutContext } from "../../hooks/useWorkout";

interface IProps {
  i: number;
  currentExercise: IExercise;
}

function WorkoutExercise({ i, currentExercise }: IProps) {
  const { setCurrentWorkout, exercises, setSettings } = useContext(WorkoutContext);

  const [prevExercise, setPrevExercise] = useState<IExercise>(
    exercises.find((exercise) => exercise.name === currentExercise.name) || currentExercise
  );

  useEffect(() => {
    const sortedSets: ISet[] = [];
    const usedIndexes: number[] = [];
    const sets: ISet[] = currentExercise.sets;
    const prevSets: ISet[] =
      exercises.find((exercise) => exercise.name === currentExercise.name)?.sets || currentExercise.sets;

    sets.forEach((set) => {
      const index = prevSets.findIndex((prevSet, i) => !usedIndexes.includes(i) && prevSet.type === set.type);
      if (index !== -1) {
        sortedSets.push(prevSets[index]);
        usedIndexes.push(index);
      } else {
        sortedSets.push({ type: set.type, weight: "", reps: "", notes: "" });
      }
    });

    setPrevExercise((prevPrevExercise) => ({ ...prevPrevExercise, sets: sortedSets }));
  }, [currentExercise]);

  useEffect(() => {
    const lengthDifference = currentExercise.sets.length - prevExercise.sets.length;

    if (lengthDifference > 0) {
      setPrevExercise((prevPrevExercise) => ({
        ...prevPrevExercise,
        sets: [
          ...prevPrevExercise.sets,
          ...Array(lengthDifference).fill({
            type: "N" as const,
            weight: "",
            reps: "",
            notes: "",
          }),
        ],
      }));
    }
  }, [currentExercise.sets.length]);

  function handleAddPress() {
    setCurrentWorkout((prevCurrentWorkout) => ({
      ...prevCurrentWorkout,
      exercises: [
        ...prevCurrentWorkout.exercises.map((exercise: IExercise) =>
          exercise.name === currentExercise.name
            ? {
                ...exercise,
                sets: [...exercise.sets, { type: "N" as const, weight: "" as const, reps: "" as const, notes: "" }],
              }
            : exercise
        ),
      ],
    }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header} numberOfLines={1}>
          {currentExercise.name}
        </Text>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => setSettings((prevSettings) => ({ ...prevSettings, showOptions: true, i: i }))}
        >
          <Icon name="dots-horizontal" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.subtitlesContainer}>
        <Text style={styles.subtitle}>Set</Text>
        <Text style={styles.subtitle}>Weight</Text>
        <Text style={styles.subtitle}>Reps</Text>
        <Text style={styles.subtitle}>Notes</Text>
      </View>
      <View style={styles.setsContainer}>
        {prevExercise.sets.slice(0, currentExercise.sets.length).map((prevSet: ISet, j: number) => (
          <ExerciseSet key={j} i={i} j={j} prevSet={prevSet} prevExercise={prevExercise} />
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
    margin: 4,
    padding: 16,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
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
    paddingHorizontal: 6,
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

export default WorkoutExercise;
