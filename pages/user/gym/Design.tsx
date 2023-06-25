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
import { IExercise, IRoutine, ITypeSettings, IWorkout } from "../../workout/Workout";
import SetType from "../../../components/shared/SetType";
import DesignExercise from "../../../components/gym/DesignExercise";
import { initCurrentWorkout } from "../../../constants/init";
import { COLORS } from "../../../constants/theme";

type TProps = CompositeScreenProps<StackScreenProps<TGymStackParamList, "Design">, TCompositeProps>;

function Design({ navigation, route: { params } }: TProps) {
  const currentUser = useContext(AuthContext);
  const { currentWorkout, setCurrentWorkout, routines, setRoutines } = useContext(WorkoutContext);

  const [focused, setFocused] = useState<boolean>(false);

  const [typeSettings, setTypeSettings] = useState<ITypeSettings>({ show: false, i: 0, j: 0 });

  const [originalWorkout, setOriginalWorkout] = useState<IWorkout>(currentWorkout);

  function handleLeftPress() {
    //should be original workout not init
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

  function back() {
    if (!routines[params.i].creator) {
      setRoutines(routines.slice(0, -1));
    }
    setCurrentWorkout(initCurrentWorkout);
    navigation.goBack();
  }

  function handleSavePress() {
    const workoutName: string = currentWorkout.name.trim() || "Untitled Routine";
    //set creator to username
    if (routines.find((routine: IRoutine, i: number) => routine.name === workoutName && i !== params.i)) {
      let j = 1;
      while (routines.find((routine) => routine.name === `${workoutName} (${j})`) && j !== params.i) {
        j++;
      }
      setRoutines(
        routines.map((routine: IRoutine, i: number) =>
          i === params.i
            ? { name: `${workoutName} (${j})`, creator: "PumpPeak", exercises: currentWorkout.exercises }
            : routine
        )
      );
    } else {
      setRoutines(
        routines.map((routine: IRoutine, i: number) =>
          i === params.i ? { name: workoutName, creator: "PumpPeak", exercises: currentWorkout.exercises } : routine
        )
      );
    }

    setCurrentWorkout(initCurrentWorkout);

    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
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

        {currentWorkout.exercises.map((exercise: IExercise, i: number) => (
          <DesignExercise key={i} i={i} exercise={exercise} setTypeSettings={setTypeSettings} />
        ))}
        <TouchableOpacity activeOpacity={0.5} style={styles.addContainer} onPress={() => navigation.navigate("Add")}>
          <Text style={styles.add}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
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
    borderBottomColor: COLORS.gray,
    color: COLORS.white,
    fontSize: 18,
  },
  addContainer: {
    marginTop: 8,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
  },
  add: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Design;
