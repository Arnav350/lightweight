import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

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
  prevSet: ISet;
  si: number;
  ei: number;
  exercises: IExercises;
  setExercises: React.Dispatch<React.SetStateAction<IExercises>>;
}

function Set(props: IProps) {
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.setSet}>{props.si + 1}</Text>
      <TextInput
        value={weight}
        placeholder={props.prevSet.weight.toString()}
        placeholderTextColor={COLORS.darkGray}
        keyboardType="numeric"
        maxLength={5}
        keyboardAppearance="dark"
        style={styles.setWeight}
        onChangeText={setWeight}
      />
      <TextInput
        value={reps}
        placeholder={props.prevSet.reps.toString()}
        placeholderTextColor={COLORS.darkGray}
        keyboardType="numeric"
        maxLength={6}
        keyboardAppearance="dark"
        style={styles.setReps}
        onChangeText={setReps}
      />
      <TextInput
        value={notes}
        placeholder={props.prevSet.notes}
        placeholderTextColor={COLORS.darkGray}
        numberOfLines={1}
        keyboardAppearance="dark"
        style={styles.setNotes}
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
  setSet: {
    width: 23,
    color: COLORS.white,
    textAlign: "center",
    fontSize: 16,
  },
  setWeight: {
    width: 52.46,
    color: COLORS.white,
    textAlign: "center",
    fontSize: 16,
  },
  setReps: {
    width: 34.59,
    color: COLORS.white,
    textAlign: "center",
    fontSize: 16,
  },
  setNotes: {
    width: "100%",
    color: COLORS.white,
    fontSize: 16,
  },
});

export default Set;
