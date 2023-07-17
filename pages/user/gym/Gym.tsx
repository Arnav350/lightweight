import { useContext } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TCompositeProps } from "../../../App";
import { TGymStackParamList } from "../../../stacks/UserStack";
import { WorkoutContext } from "../../../hooks/useWorkout";
import { IWorkout } from "../../workout/Workout";
import WorkoutLog from "../../../components/gym/WorkoutLog";
import { COLORS } from "../../../constants/theme";
import { initCurrentWorkout } from "../../../constants/init";

export type TGymProps = CompositeScreenProps<StackScreenProps<TGymStackParamList, "Gym">, TCompositeProps>;

function Gym(props: TGymProps) {
  const { navigation } = props;
  const { setCurrentWorkout, workouts, routines, setRoutines } = useContext(WorkoutContext);

  function handleEmptyPress() {
    const date: Date = new Date();
    setCurrentWorkout({
      date: {
        month: date.toLocaleDateString("default", { month: "short" }),
        day: date.toLocaleDateString("default", { day: "2-digit" }),
        year: date.getFullYear(),
      },
      name: "Untitled Workout",
      time: date.getTime(),
      weight: 0,
      exercises: [],
    });

    navigation.navigate("WorkoutStack", { screen: "Workout" });
  }

  function handleNewPress() {
    setCurrentWorkout(initCurrentWorkout);
    setRoutines((prevRoutines) => [...prevRoutines, { name: "", creator: "", exercises: [] }]);

    navigation.navigate("Design", { i: routines.length });
  }

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.navigate("Progress")}>
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
            <TouchableOpacity activeOpacity={0.5} style={styles.gymRoutine} onPress={handleNewPress}>
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
            <WorkoutLog key={workout.time + JSON.stringify(workout.date)} i={i} workout={workout} navigate={props} />
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
    marginHorizontal: 16,
  },
  gymRoutine: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  gymRoutines: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 8,
  },
  gymSubtitles: {
    marginLeft: 8,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
  logContainer: {
    padding: 16,
    gap: 8,
  },
});

export default Gym;
