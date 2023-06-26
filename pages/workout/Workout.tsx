import { useContext, useState } from "react";
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TRootStackParamList } from "../../App";
import { TWorkoutStackParamList } from "../../stacks/WorkoutStack";
import { WorkoutContext } from "../../hooks/useWorkout";
import WorkoutExercise from "../../components/workout/WorkoutExercise";
import WorkoutTimer from "../../components/workout/WorkoutTimer";
import ExerciseOptions from "../../components/shared/ExerciseOptions";
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

export interface IWorkoutSettings {
  showType: boolean;
  showOptions: boolean;
  i: number;
  j: number;
}

function Workout({ navigation }: TProps) {
  const { currentWorkout, setCurrentWorkout, exercises, setExercises, workouts, setWorkouts } =
    useContext(WorkoutContext);

  // const [currentExercises, setCurrentExercises] = useState<IExercise[]>(currentWorkout.exercises);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [settings, setSettings] = useState<IWorkoutSettings>({ showType: false, showOptions: false, i: 0, j: 0 });

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

      const extraElements = currentExercise.sets.filter((el, index) => !usedIndexes.includes(index));
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
      time: Math.round((date.getTime() - currentWorkout.time) / 60000),
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
            //NEED TO GET PREV EXERCISES
            tempWorkout.exercises.map((exercise) =>
              exercise.sets.map((set) => {
                set.weight === "" ? set : set;
                set.reps === "" ? set : set;
              })
            );
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
          <WorkoutExercise key={i} i={i} currentExercise={currentExercise} setSettings={setSettings} />
        ))}
        <TouchableOpacity activeOpacity={0.5} style={styles.buttonContainer} onPress={() => navigation.navigate("Add")}>
          <Text style={styles.button}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={showTimer}>
        <WorkoutTimer setShowTimer={setShowTimer} />
      </Modal>
      <Modal animationType="fade" transparent={true} visible={settings.showOptions}>
        <ExerciseOptions setSettings={setSettings} />
      </Modal>
      <Modal animationType="fade" transparent={true} visible={settings.showType}>
        <SetType settings={settings} setSettings={setSettings} />
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
