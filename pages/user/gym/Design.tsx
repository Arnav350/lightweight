import { useContext, useState } from "react";
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TCompositeProps } from "../../../App";
import { TGymStackParamList } from "../../../stacks/UserStack";
import { AuthContext } from "../../../hooks/useAuth";
import { WorkoutContext } from "../../../hooks/useWorkout";
import { IExercise, IRoutine, IWorkoutSettings, IWorkout } from "../../workout/Workout";
import SetType from "../../../components/shared/SetType";
import ExerciseOptions from "../../../components/shared/ExerciseActions";
import DesignExercise from "../../../components/gym/DesignExercise";
import { initCurrentWorkout } from "../../../constants/init";
import { COLORS } from "../../../constants/theme";

export type TDesignProps = CompositeScreenProps<StackScreenProps<TGymStackParamList, "Design">, TCompositeProps>;

function Design(props: TDesignProps) {
  const {
    navigation,
    route: { params },
  } = props;
  const currentUser = useContext(AuthContext);
  const { currentWorkout, setCurrentWorkout, routines, setRoutines, settings } = useContext(WorkoutContext);

  const [focused, setFocused] = useState<boolean>(false);

  const [originalWorkout] = useState<IWorkout>(currentWorkout);

  function back() {
    if (!routines[params.i].creator) {
      setRoutines((prevRoutines) => prevRoutines.slice(0, -1));
    }

    navigation.goBack();

    setTimeout(() => setCurrentWorkout(initCurrentWorkout), 250);
  }

  function handleLeftPress() {
    if (currentWorkout !== originalWorkout) {
      Alert.alert("Are you sure?", `Routine "${currentWorkout.name.trim() || "Untitled Routine"}" will not be saved`, [
        {
          text: "Back",
          onPress: back,
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ]);
    } else {
      back();
    }
  }

  function handleSavePress() {
    const workoutName: string = currentWorkout.name.trim() || "Untitled Routine";
    //set creator to username

    if (routines.find((routine: IRoutine, i: number) => routine.name === workoutName && i !== params.i)) {
      let j = 1;
      while (routines.find((routine) => routine.name === `${workoutName} (${j})`) && j !== params.i) {
        j++;
      }
      setRoutines((prevRoutines) =>
        prevRoutines.map((routine: IRoutine, i: number) =>
          i === params.i
            ? { name: `${workoutName} (${j})`, creator: "PumpPeak", exercises: currentWorkout.exercises }
            : routine
        )
      );
    } else {
      setRoutines((prevRoutines) =>
        prevRoutines.map((routine: IRoutine, i: number) =>
          i === params.i ? { name: workoutName, creator: "PumpPeak", exercises: currentWorkout.exercises } : routine
        )
      );
    }

    navigation.goBack();

    setTimeout(() => setCurrentWorkout(initCurrentWorkout), 250);
  }

  function handleDeletePress() {
    Alert.alert(
      "Delete Routine?",
      `Are you sure you want to delete "${currentWorkout.name.trim() || "Untitled Routine"}"`,
      [
        {
          text: "Delete",
          onPress: () => {
            setRoutines((prevRoutines) => prevRoutines.filter((_routine, i) => i !== params.i));
            navigation.navigate("Gym");
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  }

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={handleLeftPress}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>New Routine</Text>
        <TouchableOpacity activeOpacity={0.3} onPress={handleSavePress}>
          <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.newContainer}>
        <TextInput
          value={currentWorkout.name}
          placeholder="Routine Name"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          style={focused ? { ...styles.input, borderBottomColor: COLORS.primary } : styles.input}
          onChangeText={(text: string) => setCurrentWorkout({ ...currentWorkout, name: text })}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {currentWorkout.exercises.length ? (
          currentWorkout.exercises.map((exercise: IExercise, i: number) => (
            <DesignExercise key={exercise.name} i={i} exercise={exercise} />
          ))
        ) : (
          <Text style={currentWorkout.name.trim() ? [styles.start, { color: COLORS.gray }] : styles.start}>
            Start creating your own routine by adding an exercise
          </Text>
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Exercises", { i: currentWorkout.exercises.length })}
        >
          <Text style={styles.button}>Add Exercise</Text>
        </TouchableOpacity>
        {routines.length > params.i && routines[params.i].creator && (
          <TouchableOpacity activeOpacity={0.5} style={styles.buttonContainer} onPress={handleDeletePress}>
            <Text style={styles.button}>Delete Routine</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <Modal animationType="fade" transparent visible={settings.showOptions}>
        <ExerciseOptions navigate={props} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackTwo,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
  save: {
    marginRight: 8,
    marginLeft: -16,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "500",
  },
  newContainer: {
    padding: 16,
    backgroundColor: COLORS.black,
  },
  input: {
    marginBottom: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
    color: COLORS.white,
    fontSize: 18,
  },
  start: {
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 8,
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

export default Design;
