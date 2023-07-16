import { useContext, useState } from "react";
import { Alert, Keyboard, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TRootStackParamList } from "../../App";
import { TWorkoutStackParamList } from "../../stacks/WorkoutStack";
import { WorkoutContext } from "../../hooks/useWorkout";
import WorkoutExercise from "../../components/workout/WorkoutExercise";
import WorkoutTimer from "../../components/workout/WorkoutTimer";
import ExerciseActions from "../../components/shared/ExerciseActions";
import SetType from "../../components/shared/SetType";
import WeightCalculator from "../../components/workout/WeightCalculator";
import { initCurrentWorkout } from "../../constants/init";
import { COLORS } from "../../constants/theme";

export type TWorkoutProps = CompositeScreenProps<
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

export interface IWorkoutSettings {
  showType: boolean;
  showOptions: boolean;
  showCalculator: boolean;
  i: number;
  j: number;
}

function Workout(props: TWorkoutProps) {
  const { navigation } = props;

  const { currentWorkout, setCurrentWorkout, exercises, setExercises, setWorkouts, settings, setSettings } =
    useContext(WorkoutContext);

  // const [currentExercises, setCurrentExercises] = useState<IExercise[]>(currentWorkout.exercises);
  const [showTimer, setShowTimer] = useState<boolean>(false);

  function handleLeftPress() {
    //temporary
    setCurrentWorkout(initCurrentWorkout);

    navigation.navigate("UserStack", { screen: "GymStack", params: { screen: "Gym" } });
  }

  function finish(tempWorkout: IWorkout) {
    setWorkouts((prevWorkouts) => [tempWorkout, ...prevWorkouts]);

    tempWorkout.exercises.forEach((currentExercise) => {
      const tempSets: ISet[] = [];
      const usedIndexes: number[] = [];
      const exercise: IExercise | undefined = exercises.find((exercise) => exercise.name === currentExercise.name);

      exercise &&
        exercise.sets.forEach((element) => {
          const matchingElements = currentExercise.sets.filter(
            (el, index) => !usedIndexes.includes(index) && el.type === element.type
          );

          if (matchingElements.length > 0) {
            const [matchedElement] = matchingElements;
            tempSets.push(matchedElement);
            usedIndexes.push(currentExercise.sets.indexOf(matchedElement));
          } else {
            tempSets.push(element);
          }
        });

      const extraElements = currentExercise.sets.filter((_el, index) => !usedIndexes.includes(index));
      tempSets.push(...extraElements);
      tempSets.sort((a: ISet, b: ISet) => a.type.localeCompare(b.type));

      setExercises((prevExercises) =>
        prevExercises.map((exercise) =>
          exercise.name === currentExercise.name ? { ...exercise, sets: tempSets } : exercise
        )
      );
    });

    navigation.navigate("UserStack", {
      screen: "GymStack",
      params: { screen: "Gym" },
    });

    setTimeout(() => setCurrentWorkout(initCurrentWorkout), 250);
  }

  function handleFinishPress() {
    const date = new Date();

    const tempWorkout: IWorkout = {
      ...currentWorkout,
      time: date.getTime() - currentWorkout.time,
      weight: currentWorkout.exercises.reduce(
        (total: number, exercise: IExercise) =>
          (total += exercise.sets.reduce((total: number, set: ISet) => (total += Number(set.weight)), 0)),
        0
      ),
    };

    if (tempWorkout.exercises.find((exercise) => exercise.sets.find((set) => set.weight === "" || set.reps === ""))) {
      Alert.alert("Finish Workout?", "Some weight or reps are missing. Should we autofill them?", [
        {
          text: "Yes, Please Autofill",
          onPress: () => {
            //IDK IF THIS WORKS
            tempWorkout.exercises.map((tempExercise: IExercise) => {
              const sortedSets: ISet[] = [];
              const usedIndexes: number[] = [];
              const sets: ISet[] = tempExercise.sets;
              const prevExercise: IExercise =
                exercises.find((exercise: IExercise) => exercise.name === tempExercise.name) || tempExercise;

              sets.forEach((set: ISet) => {
                const index: number = prevExercise.sets.findIndex(
                  (prevSet: ISet, i: number) => !usedIndexes.includes(i) && prevSet.type === set.type
                );
                if (index !== -1) {
                  sortedSets.push(prevExercise.sets[index]);
                  usedIndexes.push(index);
                } else {
                  sortedSets.push({ type: set.type, weight: "", reps: "", notes: "" });
                }
              });

              return tempExercise.sets.map((set: ISet, i: number) => {
                return {
                  ...set,
                  weight: set.weight === "" ? sortedSets[i].weight : set.weight,
                  reps: set.reps === "" ? sortedSets[i].reps : set.reps,
                };
              });
            });
            finish(tempWorkout);
          },
        },
        {
          text: "No Thanks",
          onPress: () => finish(tempWorkout),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } else {
      finish(tempWorkout);
    }
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
            onChangeText={(text) => setCurrentWorkout((prevCurrentWorkout) => ({ ...prevCurrentWorkout, name: text }))}
          />
        </View>
        <TouchableOpacity activeOpacity={0.3} onPress={handleFinishPress}>
          <Text style={styles.finish}>Finish</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.workoutContainer}>
        {currentWorkout.exercises.map((currentExercise: IExercise, i: number) => (
          <WorkoutExercise key={currentExercise.name} i={i} currentExercise={currentExercise} />
        ))}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Exercises", { i: currentWorkout.exercises.length })}
        >
          <Text style={styles.button}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* I DONT LIKE THAT ANIMATE ON IS NONE */}
      <KeyboardAccessoryView
        androidAdjustResize
        animateOn="none"
        hideBorder
        inSafeAreaView
        style={styles.keyboardContainer}
      >
        <View style={styles.accessoryContainer}>
          <TouchableOpacity onPress={() => setSettings((prevSettings) => ({ ...prevSettings, showCalculator: true }))}>
            <Icon name="calculator" size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={() => {}} style={styles.check}>
              <Icon name="check" size={32} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={Keyboard.dismiss}>
              <Icon name="keyboard-close" size={32} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAccessoryView>
      <Modal animationType="fade" transparent visible={showTimer}>
        <WorkoutTimer setShowTimer={setShowTimer} />
      </Modal>
      <Modal animationType="fade" transparent visible={settings.showOptions}>
        <ExerciseActions navigate={props} />
      </Modal>
      <Modal animationType="fade" transparent visible={settings.showCalculator}>
        <WeightCalculator />
      </Modal>
      <Modal animationType="fade" transparent visible={settings.showType}>
        <SetType />
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
  keyboardContainer: {
    backgroundColor: COLORS.blackTwo,
  },
  accessoryContainer: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightContainer: {
    flexDirection: "row",
  },
  check: {
    marginRight: 8,
  },
});

export default Workout;
