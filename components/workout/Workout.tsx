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

import { COLORS, FONTS } from "../../constants/theme";

function Workout() {
  const [workoutName, setWorkoutName] = useState<string>("Workout Name");
  const [exercises, setExercises] = useState<string[]>([
    "Bench Press",
    "Smith Machine 45 Pound Plate Elevated Front Squat",
    "Bicep Curl",
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon
              name="chevron-left"
              size={FONTS.xxlarge}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="alarm" size={FONTS.xxlarge} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <TextInput
          value={workoutName}
          placeholder="Workout Name"
          placeholderTextColor={COLORS.placeholder}
          keyboardAppearance="dark"
          style={styles.header}
          onChangeText={setWorkoutName}
        />
        <Button title="Finish" color={COLORS.primary} onPress={() => {}} />
      </View>
      <ScrollView style={styles.workoutContainer}>
        {exercises.map((exercise: string, i: number) => (
          <Exercise key={i} name={exercise} />
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
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.header,
  },
  header: {
    padding: 8,
    backgroundColor: "transparent",
    borderRadius: 8,
    color: COLORS.textOne,
    textAlign: "center",
    fontSize: FONTS.xlarge,
    fontWeight: FONTS.bold,
  },
  headerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    width: 64,
  },
  workoutContainer: {
    padding: 8,
  },
  workoutButton: {
    marginTop: 8,
    marginRight: 4,
    marginBottom: 8,
    marginLeft: 4,
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  workoutText: {
    color: COLORS.textOne,
    textAlign: "center",
    fontSize: FONTS.normal,
    fontWeight: FONTS.xbold,
  },
});

export default Workout;
