import { useContext } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TCompositeProps } from "../../App";
import { TGymStackParamList } from "../../stacks/UserStack";
import { WorkoutContext } from "../../hooks/useWorkout";
import { IWorkout } from "../workout/Workout";
import Log from "../../components/gym/Log";
import { COLORS } from "../../constants/theme";

type TProps = CompositeScreenProps<StackScreenProps<TGymStackParamList, "Gym">, TCompositeProps>;

function Gym({ navigation }: TProps) {
  const { setCurrentWorkout, workouts } = useContext(WorkoutContext);

  function handleEmptyPress() {
    navigation.navigate("WorkoutStack", { screen: "Workout" });
    setCurrentWorkout({ date: { month: "", day: "" }, name: "Empty Workout", time: "", weight: 0, exercises: [] });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="chart-line" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Workout</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.gymContainer}>
        <View style={styles.gymButtons}>
          <TouchableOpacity activeOpacity={0.5} style={styles.gymRoutine} onPress={handleEmptyPress}>
            <Icon name="plus" size={24} color={COLORS.primary} />
            <Text style={styles.gymSubtitles}>Start Empty Workout</Text>
          </TouchableOpacity>

          <View style={styles.gymRoutines}>
            <TouchableOpacity activeOpacity={0.5} style={styles.gymRoutine} onPress={() => {}}>
              <Icon name="clipboard-plus-outline" size={24} color={COLORS.primary} />
              <Text style={styles.gymSubtitles}>New Routine</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.gymRoutine}
              onPress={() => navigation.navigate("Select")}
            >
              <Icon name="bookmark-outline" size={24} color={COLORS.primary} />
              <Text style={styles.gymSubtitles}>Select Routine</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.logContainer}>
          {workouts.map((workout: IWorkout, i: number) => (
            <Log key={i} workout={workout} />
          ))}
        </View>
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
  gymContainer: {
    backgroundColor: COLORS.black,
  },
  gymButtons: {
    marginTop: 16,
    marginHorizontal: 12,
  },
  gymRoutine: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    padding: 16,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  gymRoutines: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  gymSubtitles: {
    marginLeft: 8,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
  logContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default Gym;
