import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Exercise from "./Exercise";

import { COLORS, FONTS, SPACES } from "../../constants/theme";

function Workout() {
  const [workoutName, setWorkoutName] = useState<string>("Workout Name");
  const [exercises, setExercises] = useState<string[]>([
    "Bench Press",
    "Smith Machine Elevated Front Squat",
    "Bicep Curl",
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerIcons}>
          <Icon
            name="chevron-left"
            size={FONTS.xxlarge}
            color={COLORS.primary}
          />
          <Icon name="alarm" size={FONTS.xxlarge} color={COLORS.primary} />
        </View>
        <TextInput
          value={workoutName}
          placeholder="Workout Name"
          placeholderTextColor={COLORS.placeholder}
          style={styles.header}
          onChangeText={setWorkoutName}
        />
        <Button title="Finish" color={COLORS.primary} onPress={() => {}} />
      </View>
      <ScrollView style={styles.workoutContainer}>
        {exercises.map((__, i: number) => (
          <Exercise key={i} />
        ))}
        <TouchableOpacity style={styles.workoutButton} onPress={() => {}}>
          <Text style={styles.workoutText}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACES.large,
    backgroundColor: COLORS.header,
  },
  header: {
    flex: 1,
    padding: SPACES.medium,
    backgroundColor: "transparent",
    borderRadius: SPACES.medium,
    color: COLORS.textOne,
    textAlign: "center",
    fontSize: FONTS.xlarge,
  },
  headerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACES.medium,
    width: 64,
  },
  headerButton: {
    backgroundColor: COLORS.primary,
    // padding: 4 10,
    borderRadius: SPACES.medium,
    color: COLORS.textOne,
    fontSize: FONTS.normal,
  },
  workoutContainer: {
    gap: SPACES.large,
    padding: SPACES.large,
  },
  workoutButton: {
    // margin: 8 0,
    padding: SPACES.medium,
    backgroundColor: COLORS.primary,
    borderRadius: SPACES.medium,
  },
  workoutText: {
    color: COLORS.textOne,
    fontSize: FONTS.normal,
  },
});

export default Workout;
