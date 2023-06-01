import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Exercise from "../../components/workout/Exercise";
import { TWorkoutStackParamList } from "../../App";

import { COLORS } from "../../constants/theme";

type TProps = StackScreenProps<TWorkoutStackParamList>;

export interface ISet {
  type: "D" | "N" | "S" | "W";
  weight: number;
  reps: number;
  notes: string;
}

export interface IExercise {
  name: string;
  notes: string;
  sets: ISet[];
}

export interface IWorkout {
  date: {
    month: string;
    day: string;
  };
  name: string;
  time: string;
  weight: number;
  exercises: IExercise[];
}

const init: IWorkout = {
  date: {
    month: "Jun",
    day: "19",
  },
  name: "Workout Name",
  time: "1:45:34",
  weight: 200,
  exercises: [
    {
      name: "Bench Press",
      notes: "",
      sets: [
        { type: "W", weight: 200, reps: 10, notes: "notes" },
        { type: "N", weight: 300, reps: 8, notes: "" },
        { type: "D", weight: 400, reps: 6, notes: "" },
      ],
    },
    {
      name: "Smith Machine 45 Pound Plate Elevated Front Squat",
      notes: "",
      sets: [
        { type: "W", weight: 200, reps: 10, notes: "notes" },
        { type: "N", weight: 300, reps: 8, notes: "" },
        { type: "D", weight: 400, reps: 6, notes: "" },
      ],
    },
    {
      name: "Bicep Curl",
      notes: "",
      sets: [
        { type: "W", weight: 200, reps: 10, notes: "notes" },
        { type: "N", weight: 300, reps: 8, notes: "" },
        { type: "D", weight: 400, reps: 6, notes: "" },
      ],
    },
  ],
};

const init2: IWorkout = {
  date: {
    month: "Jun",
    day: "19",
  },
  name: "Workout Name",
  time: "1:45:34",
  weight: 0,
  exercises: [
    {
      name: "Bench Press",
      notes: "",
      sets: [
        { type: "W", weight: 0, reps: 0, notes: "" },
        { type: "N", weight: 0, reps: 0, notes: "" },
        { type: "N", weight: 0, reps: 0, notes: "" },
      ],
    },
    {
      name: "Smith Machine 45 Pound Plate Elevated Front Squat",
      notes: "",
      sets: [
        { type: "N", weight: 0, reps: 0, notes: "" },
        { type: "N", weight: 0, reps: 0, notes: "" },
        { type: "D", weight: 0, reps: 0, notes: "" },
        { type: "N", weight: 0, reps: 0, notes: "" },
        { type: "N", weight: 0, reps: 0, notes: "" },
      ],
    },
    {
      name: "Bicep Curl",
      notes: "",
      sets: [
        { type: "N", weight: 0, reps: 0, notes: "" },
        { type: "S", weight: 0, reps: 0, notes: "" },
        { type: "S", weight: 0, reps: 0, notes: "" },
      ],
    },
  ],
};

const init3: IWorkout = {
  date: { month: "", day: "" },
  name: "",
  time: "",
  weight: 0,
  exercises: [],
};

function Workout({ navigation }: TProps) {
  const [currentWorkout, setCurrentWorkout] = useState<IWorkout>(init2);

  function handleFinishPress() {
    setCurrentWorkout({
      ...currentWorkout,
      weight: currentWorkout.exercises.reduce(
        (total: number, exercise: IExercise) =>
          (total += exercise.sets.reduce((total: number, set: ISet) => (total += set.weight), 0)),
        0
      ),
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerIcons}>
          <TouchableOpacity activeOpacity={0.3}>
            <Icon name="chevron-left" size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3}>
            <Icon name="alarm" size={32} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={currentWorkout.name}
            placeholder="Workout Name"
            placeholderTextColor={COLORS.darkGray}
            keyboardAppearance="dark"
            style={styles.header}
            onChangeText={(text) => setCurrentWorkout({ ...currentWorkout, name: text })}
          />
        </View>
        <TouchableOpacity activeOpacity={0.3} onPress={handleFinishPress}>
          <Text style={styles.finish}>Finish</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.workoutContainer}>
        {currentWorkout.exercises.map((exercise: IExercise, i: number) => (
          <Exercise key={i} i={i} currentWorkout={currentWorkout} setCurrentWorkout={setCurrentWorkout} />
        ))}
        <TouchableOpacity activeOpacity={0.5} style={styles.addButton} onPress={() => {}}>
          <Text style={styles.addText}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blackTwo,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackTwo,
  },
  headerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  inputContainer: {
    paddingHorizontal: 20,
    maxWidth: "80%",
    backgroundColor: COLORS.black,
    borderRadius: 16,
  },
  header: {
    padding: 8,
    backgroundColor: "transparent",
    borderRadius: 8,
    color: COLORS.white,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
  },
  finish: {
    margin: 8,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "500",
  },
  workoutContainer: {
    padding: 8,
    backgroundColor: COLORS.black,
  },
  addButton: {
    marginTop: 8,
    marginRight: 4,
    marginBottom: 8,
    marginLeft: 4,
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  addText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Workout;
