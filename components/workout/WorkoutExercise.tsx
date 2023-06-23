import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import ExerciseSet from "./ExerciseSet";
import { ISet, IExercise, ITypeSettings } from "../../pages/workout/Workout";

import { COLORS } from "../../constants/theme";
import { WorkoutContext } from "../../hooks/useWorkout";

interface IProps {
  i: number;
  currentExercise: IExercise;
  setTypeSettings: Dispatch<SetStateAction<ITypeSettings>>;
}

function WorkoutExercise({ i, currentExercise, setTypeSettings }: IProps) {
  const { currentWorkout, setCurrentWorkout, exercises, setExercises } = useContext(WorkoutContext);

  const [prevExercise, setPrevExercise] = useState<IExercise>(
    exercises.filter((exercise) => exercise.name === currentExercise.name)[0]
  );

  useEffect(() => {
    const lengthDifference = currentExercise.sets.length - prevExercise.sets.length;

    if (lengthDifference > 0) {
      setPrevExercise({
        ...prevExercise,
        sets: [
          ...prevExercise.sets,
          ...Array(lengthDifference).fill({
            type: "N" as const,
            weight: "",
            reps: "",
            notes: "",
          }),
        ],
      });
    }
  }, [currentExercise.sets.length]);

  function handleAddPress() {
    setCurrentWorkout({
      ...currentWorkout,
      exercises: [
        ...currentWorkout.exercises.map((exercise: IExercise, j: number) =>
          j === i
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
        <Text style={styles.header} numberOfLines={1}>
          {currentExercise.name}
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
        {prevExercise.sets.slice(0, currentExercise.sets.length).map((prevSet: ISet, j: number) => (
          <ExerciseSet key={j} i={i} j={j} prevSet={prevSet} setTypeSettings={setTypeSettings} />
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
    paddingHorizontal: 8,
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
