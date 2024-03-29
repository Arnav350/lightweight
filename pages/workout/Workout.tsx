import { useContext, useEffect, useMemo, useState } from "react";
import { Alert, Keyboard, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TRootStackParamList } from "../../App";
import { WorkoutContext } from "../../hooks/useWorkout";
import WorkoutExercise from "../../components/workout/WorkoutExercise";
import WorkoutTimer from "../../components/workout/WorkoutTimer";
import ExerciseActions from "../../components/shared/ExerciseActions";
import SetType from "../../components/shared/SetType";
import WeightCalculator from "../../components/workout/WeightCalculator";
import { initCurrentWorkout } from "../../constants/init";
import { COLORS } from "../../constants/theme";

export type TWorkoutProps = StackScreenProps<TRootStackParamList, "Workout">;

function Workout(props: TWorkoutProps) {
  const { navigation } = props;

  const {
    currentWorkout,
    setCurrentWorkout,
    setResumeWorkout,
    setWorkouts,
    exercises,
    setExercises,
    settings,
    setSettings,
  } = useContext(WorkoutContext);

  const [showTimer, setShowTimer] = useState<boolean>(false);

  function handleLeftPress() {
    navigation.navigate("UserStack", { screen: "GymStack", params: { screen: "Gym" } });

    setTimeout(() => setCurrentWorkout({ ...initCurrentWorkout }), 500);
  }

  useEffect(() => {
    if (currentWorkout.weight === 0 && currentWorkout.time !== 0) {
      setResumeWorkout(currentWorkout);
    }
  }, [currentWorkout]);

  function finish(tempWorkout: IWorkout) {
    const date = new Date();

    setWorkouts((prevWorkouts) => [
      {
        ...tempWorkout,
        time: date.getTime() - tempWorkout.time,
        weight: tempWorkout.exercises.reduce(
          (total: number, { sets }: IExercise) =>
            (total += sets.reduce((total: number, { weight }: ISet) => (total += Number(weight)), 0)),
          0
        ),
      },
      ...prevWorkouts,
    ]);

    tempWorkout.exercises.forEach((currentExercise) => {
      const tempSets: ISet[] = [];
      const usedIndexes: number[] = [];
      const exercise: IExercise = exercises.find(({ name }) => name === currentExercise.name) || exercises[0];

      exercise.sets.forEach((set: ISet) => {
        const matchingElements = currentExercise.sets.filter(
          ({ type }, index) => !usedIndexes.includes(index) && type === set.type
        );

        if (matchingElements.length > 0) {
          // const [matchedElement] = matchingElements;
          tempSets.push(matchingElements[0]);
          usedIndexes.push(currentExercise.sets.indexOf(matchingElements[0]));
        } else {
          tempSets.push(set);
        }
      });

      const mapedSets: ISet[] = tempSets
        .sort((a: ISet, b: ISet) => a.type.localeCompare(b.type))
        .map((set: ISet, i: number) => (set.weight === "" && set.reps === "" ? exercise.sets[i] : set));
      const extraElements = currentExercise.sets.filter((_el, index) => !usedIndexes.includes(index));
      mapedSets.push(...extraElements);
      mapedSets.sort((a: ISet, b: ISet) => a.type.localeCompare(b.type));

      setExercises((prevExercises) =>
        prevExercises.map((prevExercise) =>
          prevExercise.name === currentExercise.name ? { ...prevExercise, sets: mapedSets } : prevExercise
        )
      );
    });

    navigation.navigate("UserStack", {
      screen: "GymStack",
      params: { screen: "Gym" },
    });

    setResumeWorkout({ ...initCurrentWorkout });
    setTimeout(() => setCurrentWorkout({ ...initCurrentWorkout }), 500);
  }

  function handleFinishPress() {
    if (
      currentWorkout.exercises.find((exercise) => exercise.sets.find((set) => set.weight === "" || set.reps === ""))
    ) {
      Alert.alert("Finish Workout?", "Some weight or reps are missing. Should we autofill them?", [
        {
          text: "Yes, Please Autofill",
          onPress: () => {
            //IDK IF THIS WORKS
            finish({
              ...currentWorkout,
              exercises: currentWorkout.exercises.map((tempExercise: IExercise) => {
                const sortedSets: ISet[] = [];
                const usedIndexes: number[] = [];
                const sets: ISet[] = tempExercise.sets;
                const prevExercise: IExercise =
                  exercises.find(({ name }: IExercise) => name === tempExercise.name) || tempExercise;

                sets.forEach((set: ISet) => {
                  const index: number = prevExercise.sets.findIndex(
                    ({ type }: ISet, i: number) => !usedIndexes.includes(i) && type === set.type
                  );
                  if (index !== -1) {
                    sortedSets.push(prevExercise.sets[index]);
                    usedIndexes.push(index);
                  } else {
                    sortedSets.push({ type: set.type, weight: "", reps: "", notes: "" });
                  }
                });

                return {
                  ...tempExercise,
                  sets: tempExercise.sets.map((set: ISet, i: number) => ({
                    ...set,
                    weight: set.weight === "" ? sortedSets[i].weight : set.weight,
                    reps: set.reps === "" ? sortedSets[i].reps : set.reps,
                  })),
                };
              }),
            });
          },
        },
        {
          text: "No Thanks",
          onPress: () => finish(currentWorkout),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } else {
      finish(currentWorkout);
    }
  }

  function handleDiscardPress() {
    navigation.navigate("UserStack", {
      screen: "GymStack",
      params: { screen: "Gym" },
    });

    setResumeWorkout({ ...initCurrentWorkout });
    setTimeout(() => setCurrentWorkout({ ...initCurrentWorkout }), 500);
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
        {currentWorkout.weight === 0 && (
          <TouchableOpacity activeOpacity={0.3} onPress={handleFinishPress}>
            <Text style={styles.finish}>Finish</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.workoutContainer}>
        {currentWorkout.exercises.length ? (
          currentWorkout.exercises.map((currentExercise: IExercise, i: number) => (
            <WorkoutExercise key={currentExercise.name} i={i} currentExercise={currentExercise} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.get}>Get Started</Text>
            <Text style={styles.add}>Add an exercise to start your workout</Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Exercises", { i: currentWorkout.exercises.length })}
        >
          <Text style={styles.button}>Add Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={styles.buttonContainer} onPress={handleDiscardPress}>
          <Text style={styles.button}>Discard Workout</Text>
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
        <ExerciseActions navigateWorkout={props} />
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
    flexShrink: 1,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    backgroundColor: COLORS.black,
    borderRadius: 16,
  },
  header: {
    padding: 8,
    borderRadius: 8,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  finish: {
    marginHorizontal: 4,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "500",
  },
  workoutContainer: {
    padding: 12,
    backgroundColor: COLORS.black,
  },
  emptyContainer: {
    marginVertical: 32,
    gap: 8,
    alignItems: "center",
  },
  get: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  add: {
    color: COLORS.gray,
    fontSize: 16,
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
