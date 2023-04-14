import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { COLORS, FONTS } from "../../constants/theme";

interface ISet {
  label?: "W" | "D";
  weight: number;
  reps: number;
  notes?: string;
}

interface IProps {
  id: number;
  prevSet: ISet;
}

function Set(props: IProps) {
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.setSet}>{props.id + 1}</Text>
      <TextInput
        value={weight}
        placeholder={props.prevSet.weight.toString()}
        placeholderTextColor={COLORS.placeholder}
        keyboardType="numeric"
        maxLength={5}
        keyboardAppearance="dark"
        style={styles.setWeight}
        onChangeText={setWeight}
      />
      <TextInput
        value={reps}
        placeholder={props.prevSet.reps.toString()}
        placeholderTextColor={COLORS.placeholder}
        keyboardType="numeric"
        maxLength={6}
        keyboardAppearance="dark"
        style={styles.setReps}
        onChangeText={setReps}
      />
      <TextInput
        value={notes}
        placeholder={props.prevSet.notes}
        placeholderTextColor={COLORS.placeholder}
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
    color: COLORS.textOne,
    textAlign: "center",
    fontSize: FONTS.normal,
  },
  setWeight: {
    width: 52.46,
    color: COLORS.textOne,
    textAlign: "center",
    fontSize: FONTS.normal,
  },
  setReps: {
    width: 34.59,
    color: COLORS.textOne,
    textAlign: "center",
    fontSize: FONTS.normal,
  },
  setNotes: {
    width: "100%",
    color: COLORS.textOne,
    fontSize: FONTS.normal,
  },
});

export default Set;
