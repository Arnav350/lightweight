import { useContext } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TCompositeProps } from "../../../App";
import { TGymStackParamList } from "../../../stacks/UserStack";
import { WorkoutContext } from "../../../hooks/useWorkout";
import WorkoutLog from "../../../components/gym/WorkoutLog";
import ResumeWorkout from "../../../components/shared/ResumeWorkout";
import { initCurrentWorkout } from "../../../constants/init";
import { COLORS } from "../../../constants/theme";

export type TGymProps = CompositeScreenProps<StackScreenProps<TGymStackParamList, "Gym">, TCompositeProps>;

function Gym(props: TGymProps) {
  const { navigation } = props;
  const { currentWorkout, setCurrentWorkout, resumeWorkout, workouts, routines, setRoutines } =
    useContext(WorkoutContext);

  function handleEmptyPress() {
    const date: Date = new Date();

    navigation.navigate("Workout");

    setTimeout(
      () =>
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
        }),
      500
    );
  }

  function handleNewPress() {
    setCurrentWorkout({ ...initCurrentWorkout });
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
      <FlatList
        data={workouts}
        renderItem={({ item, index }) => (
          <WorkoutLog key={item.time + JSON.stringify(item.date)} i={index} workout={item} navigate={props} />
        )}
        ListHeaderComponent={
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
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.no}>No Workouts Completed</Text>
            <Text style={styles.shown}>Finished workouts will be shown here</Text>
          </View>
        }
        style={styles.gymContainer}
      />
      {resumeWorkout.time !== 0 && <ResumeWorkout navigateGym={props} />}
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
    paddingVertical: 8,
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
    marginBottom: 12,
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
  emptyContainer: {
    marginTop: 16,
    gap: 8,
    alignItems: "center",
  },
  no: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  shown: {
    color: COLORS.gray,
    fontSize: 16,
  },
});

export default Gym;
