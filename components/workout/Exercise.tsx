import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Set from "./Set";
import { ISet, IExercise, IWorkout } from "../../pages/workout/Workout";

import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  currentWorkout: IWorkout;
  setCurrentWorkout: Dispatch<SetStateAction<IWorkout>>;
}

const init: IExercise = {
  name: "Bench Press",
  notes: "New PR!",
  sets: [
    { type: "W", weight: 200, reps: 10, notes: "notes" },
    { type: "N", weight: 300, reps: 8, notes: "" },
    { type: "D", weight: 400, reps: 6, notes: "" },
    { type: "N", weight: 500, reps: 1, notes: "WOW" },
  ],
};

function Exercise({ i, currentWorkout, setCurrentWorkout }: IProps) {
  const [prevExercise, setPrevExercise] = useState<IExercise>(init);

  useEffect(() => {
    const lengthDifference =
      currentWorkout.exercises[i].sets.length - prevExercise.sets.length;

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
                sets: [
                  ...exercise.sets,
                  { type: "N" as const, weight: 0, reps: 0, notes: "" },
                ],
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
        {prevExercise.sets
          .slice(0, currentWorkout.exercises[i].sets.length)
          .map((prevSet: ISet, j: number) => (
            <Set
              key={j}
              i={i}
              j={j}
              prevSet={prevSet}
              currentWorkout={currentWorkout}
              setCurrentWorkout={setCurrentWorkout}
            />
          ))}
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.addButton}
        onPress={handleAddPress}
      >
        <Text style={styles.addText}>+ Add Set</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    padding: 12,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: COLORS.white,
  },
  topText: {
    maxWidth: "80%",
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  subtitlesContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
  },
  subtitle: {
    color: COLORS.white,
  },
  setsContainer: {
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray,
  },
  addButton: {
    paddingTop: 8,
    paddingRight: 8,
    paddingLeft: 8,
  },
  addText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default Exercise;
