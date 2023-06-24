import { useContext, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TRootStackParamList } from "../../App";
import { TWorkoutStackParamList } from "../../stacks/WorkoutStack";
import { WorkoutContext } from "../../hooks/useWorkout";
import WorkoutExercise from "../../components/workout/WorkoutExercise";
import WorkoutTimer from "../../components/workout/WorkoutTimer";
import SetType from "../../components/shared/SetType";
import { initCurrentWorkout } from "../../constants/init";
import { COLORS } from "../../constants/theme";

type TProps = CompositeScreenProps<
  StackScreenProps<TWorkoutStackParamList, "Workout">,
  StackScreenProps<TRootStackParamList>
>;

export type TType = "D" | "N" | "S" | "W";

export interface ISet {
  type: TType;
  weight: number | "";
  reps: number | "";
  notes: string;
}

export interface IExercise {
  name: string;
  equipment: string;
  muscle: string;
  notes: string;
  sets: ISet[];
}

export interface IWorkout {
  date: {
    month: string;
    day: string;
    year: number;
  };
  name: string;
  time: number;
  weight: number;
  exercises: IExercise[];
}

export interface IRoutine {
  name: string;
  creator: string;
  exercises: IExercise[];
}

export interface ITypeSettings {
  show: boolean;
  i: number;
  j: number;
}

function Workout({ navigation }: TProps) {
  const { currentWorkout, setCurrentWorkout, exercises, setExercises, workouts, setWorkouts } =
    useContext(WorkoutContext);

  const [currentExercises, setCurrentExercises] = useState<IExercise[]>(currentWorkout.exercises);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [typeSettings, setTypeSettings] = useState<ITypeSettings>({ show: false, i: 0, j: 0 });

  function handleLeftPress() {
    //temporary
    setCurrentWorkout(initCurrentWorkout);

    navigation.navigate("UserStack", { screen: "GymStack", params: { screen: "Gym" } });
  }

  function handleFinishPress() {
    const date = new Date();

    setCurrentWorkout(initCurrentWorkout);
    setWorkouts([
      ...workouts,
      {
        ...currentWorkout,
        time: Math.round((date.getTime() - currentWorkout.time) / 60000),
        weight: currentWorkout.exercises.reduce(
          (total: number, exercise: IExercise) =>
            (total += exercise.sets.reduce((total: number, set: ISet) => (total += Number(set.weight)), 0)),
          0
        ),
      },
    ]);

    setExercises(
      exercises.map((exercise) => {
        const matchedExercise = currentWorkout.exercises.find(
          (currentExercise) => currentExercise.name === exercise.name
        );
        if (matchedExercise) {
          return matchedExercise;
        }
        return exercise;
      })
    );

    navigation.navigate("UserStack", {
      screen: "GymStack",
      params: { screen: "Gym" },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerIcons}>
          <TouchableOpacity activeOpacity={0.3} onPress={handleLeftPress}>
            <Icon name="chevron-left" size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3} onPress={() => setShowTimer(true)}>
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
        {currentWorkout.exercises.map((currentExercise: IExercise, i: number) => (
          <WorkoutExercise key={i} i={i} currentExercise={currentExercise} setTypeSettings={setTypeSettings} />
        ))}
        <TouchableOpacity activeOpacity={0.5} style={styles.buttonContainer} onPress={() => navigation.navigate("Add")}>
          <Text style={styles.button}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={showTimer}>
        <WorkoutTimer setShowTimer={setShowTimer} />
      </Modal>
      <Modal animationType="fade" transparent={true} visible={typeSettings.show}>
        <SetType typeSettings={typeSettings} setTypeSettings={setTypeSettings} />
      </Modal>
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
    padding: 12,
    backgroundColor: COLORS.black,
  },
  buttonContainer: {
    marginVertical: 8,
    marginHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
  },
  button: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Workout;
