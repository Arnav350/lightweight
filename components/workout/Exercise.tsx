import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Set from "./Set";

import { COLORS } from "../../constants/theme";

interface ISet {
  type: number | "W" | "D";
  weight: number;
  reps: number;
  notes?: string;
}

type ISets = ISet[];

interface IExercise {
  name: string;
  sets: ISets;
}

type IExercises = IExercise[];

interface IProps {
  i: number;
  exercises: IExercises;
  setExercises: React.Dispatch<React.SetStateAction<IExercises>>;
}

function Exercise(props: IProps) {
  const [prevExercise, setPrevExercise] = useState<IExercise>();
  const [prevExercises, setPrevExercises] = useState<IExercises>([
    {
      name: "Bench Press",
      sets: [
        { type: "W", weight: 200, reps: 10, notes: "notes" },
        { type: 1, weight: 300, reps: 8 },
        { type: "D", weight: 400, reps: 6 },
      ],
    },
    {
      name: "Smith Machine 45 Pound Plate Elevated Front Squat",
      sets: [
        { type: "W", weight: 200, reps: 10, notes: "notes" },
        { type: 1, weight: 300, reps: 8 },
        { type: "D", weight: 400, reps: 6 },
      ],
    },
    {
      name: "Bicep Curl",
      sets: [
        { type: "W", weight: 200, reps: 10, notes: "notes" },
        { type: 1, weight: 300, reps: 8 },
        { type: "D", weight: 400, reps: 6 },
      ],
    },
  ]);

  useEffect(() => {
    prevExercises.every((prevExercise) => {
      if (prevExercise.name === props.exercises[props.i].name) {
        setPrevExercise(prevExercise);
        return false;
      }
      return true;
    });
  }, [props.exercises]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText} numberOfLines={1}>
          {/* {props.prevExercise.name} */}
        </Text>
        <Icon name="dots-horizontal" size={24} color={COLORS.white} />
      </View>
      <View style={styles.exerciseSubtitles}>
        <Text style={styles.exerciseSubtitle}>Set</Text>
        <Text style={styles.exerciseSubtitle}>Weight</Text>
        <Text style={styles.exerciseSubtitle}>Reps</Text>
        <Text style={styles.exerciseSubtitle}>Notes</Text>
      </View>
      <View style={styles.setsContainer}>
        {prevExercise &&
          prevExercise.sets.map((prevSet: ISet, i: number) => (
            <Set
              key={i}
              prevSet={prevSet}
              si={i}
              ei={props.i}
              exercises={props.exercises}
              setExercises={props.setExercises}
            />
          ))}
      </View>
      <TouchableOpacity style={styles.exerciseButton}>
        <Text style={styles.exerciseText}>+ Add Set</Text>
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
  exerciseSubtitles: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
  },
  exerciseSubtitle: {
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
  exerciseButton: {
    paddingTop: 8,
    paddingRight: 8,
    paddingLeft: 8,
  },
  exerciseText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default Exercise;
