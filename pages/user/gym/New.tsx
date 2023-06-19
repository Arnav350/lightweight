import { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TCompositeProps } from "../../../App";
import { TGymStackParamList } from "../../../stacks/UserStack";
import { AuthContext } from "../../../hooks/useAuth";
import { WorkoutContext } from "../../../hooks/useWorkout";
import { IExercise } from "../../workout/Workout";
import NewRoutine from "../../../components/gym/NewRoutine";
import { initCurrentWorkout } from "../../../constants/init";
import { COLORS } from "../../../constants/theme";

type TProps = CompositeScreenProps<StackScreenProps<TGymStackParamList, "Gym">, TCompositeProps>;

function New({ navigation }: TProps) {
  const currentUser = useContext(AuthContext);
  const { currentWorkout, setCurrentWorkout, routines, setRoutines } = useContext(WorkoutContext);

  const [focused, setFocused] = useState<boolean>(false);

  function handleSavePress() {
    //set creator to username
    setRoutines([
      ...routines,
      { name: currentWorkout.name || "Untitled Workout", creator: "", exercises: currentWorkout.exercises },
    ]);
    setCurrentWorkout(initCurrentWorkout);

    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
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
          <NewRoutine key={i} exercise={exercise} />
        ))}
        <TouchableOpacity activeOpacity={0.5} style={styles.addContainer} onPress={() => navigation.navigate("Add")}>
          <Text style={styles.add}>Add Exercise</Text>
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

export default New;
