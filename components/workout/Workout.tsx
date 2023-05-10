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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Exercise from "./Exercise";

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

interface IWorkout {
  date: {
    month: string;
    day: string;
  };
  name: string;
  time: string;
  weight: number;
  exercises: IExercises;
}

type IWorkouts = IWorkout[];

function Workout() {
  const [workout, setWorkout] = useState<IWorkout | {}>({});
  const [exercises, setExercises] = useState<IExercises>([]);
  const [workoutName, setWorkoutName] = useState<string>("Workout Name");

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon name="chevron-left" size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="alarm" size={32} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <TextInput
          value={workoutName}
          placeholder="Workout Name"
          placeholderTextColor={COLORS.darkGray}
          keyboardAppearance="dark"
          style={styles.header}
          onChangeText={setWorkoutName}
          onBlur={() => setWorkout({ ...workout, name: workoutName })}
        />
        <Button title="Finish" color={COLORS.primary} onPress={() => {}} />
      </View>
      <ScrollView style={styles.workoutContainer}>
        {exercises.map((__, i: number) => (
          <Exercise
            key={i}
            i={i}
            exercises={exercises}
            setExercises={setExercises}
          />
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
    backgroundColor: COLORS.black,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackTwo,
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
    color: COLORS.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Workout;
