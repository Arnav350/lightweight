import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { ISet, IExercise, IWorkout } from "./Workout";

import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  j: number;
  prevSet: ISet;
  currentWorkout: IWorkout;
  setCurrentWorkout: React.Dispatch<React.SetStateAction<IWorkout>>;
}

function Set({ prevSet, i, j, currentWorkout, setCurrentWorkout }: IProps) {
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.set}>{j + 1}</Text>
      <TextInput
        value={weight}
        placeholder={prevSet.weight.toString()}
        placeholderTextColor={COLORS.darkGray}
        keyboardType="numeric"
        maxLength={5}
        keyboardAppearance="dark"
        style={styles.weight}
        onChangeText={setWeight}
      />
      <TextInput
        value={reps}
        placeholder={prevSet.reps.toString()}
        placeholderTextColor={COLORS.darkGray}
        keyboardType="numeric"
        maxLength={6}
        keyboardAppearance="dark"
        style={styles.reps}
        onChangeText={setReps}
      />
      <TextInput
        value={notes}
        placeholder={prevSet.notes}
        placeholderTextColor={COLORS.darkGray}
        numberOfLines={1}
        keyboardAppearance="dark"
        style={styles.notes}
        onChangeText={setNotes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  set: {
    width: 23,
    color: COLORS.white,
    textAlign: "center",
    fontSize: 16,
  },
  weight: {
    width: 52.46,
    color: COLORS.white,
    textAlign: "center",
    fontSize: 16,
  },
  reps: {
    width: 34.59,
    color: COLORS.white,
    textAlign: "center",
    fontSize: 16,
  },
  notes: {
    width: "100%",
    color: COLORS.white,
    fontSize: 16,
  },
});

export default Set;
