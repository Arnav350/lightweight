import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS, FONTS, SPACES } from "../../constants/theme";

function Set() {
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.setSet}>1</Text>
      <TextInput
        value={weight}
        placeholder="Weight"
        placeholderTextColor={COLORS.placeholder}
        keyboardType="numeric"
        maxLength={5}
        style={styles.setWeight}
        onChangeText={setWeight}
      />
      <TextInput
        value={reps}
        placeholder="Reps"
        placeholderTextColor={COLORS.placeholder}
        keyboardType="numeric"
        maxLength={6}
        style={styles.setReps}
        onChangeText={setReps}
      />
      <TextInput
        value={notes}
        placeholder="Notes"
        placeholderTextColor={COLORS.placeholder}
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
    fontSize: FONTS.small,
  },
  setWeight: {
    width: 52.46,
    color: COLORS.textOne,
    textAlign: "center",
    fontSize: FONTS.small,
  },
  setReps: {
    width: 34.59,
    color: COLORS.textOne,
    textAlign: "center",
    fontSize: FONTS.small,
  },
  setNotes: {
    width: "100%",
    color: COLORS.textOne,
    fontSize: FONTS.small,
  },
});

export default Set;
