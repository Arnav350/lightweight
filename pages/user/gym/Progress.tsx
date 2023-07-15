import React, { useContext, useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { LineChart } from "react-native-chart-kit";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TGymStackParamList } from "../../../stacks/UserStack";
import { WorkoutContext } from "../../../hooks/useWorkout";
import { COLORS } from "../../../constants/theme";
import { IExercise, ISet, IWorkout } from "../../workout/Workout";

type TProps = StackScreenProps<TGymStackParamList, "Progress">;

const windowDimensions = Dimensions.get("window");

function Progress({ navigation }: TProps) {
  const { exercises, workouts } = useContext(WorkoutContext);

  const [input, setInput] = useState<string>("");
  const [currentName, setCurrentName] = useState<string>("");

  const filteredWorkouts: IWorkout[] = useMemo(
    () =>
      workouts
        .filter((workout: IWorkout) => workout.exercises.find((exercise) => exercise.name === currentName))
        .slice()
        .reverse(),
    [workouts, currentName]
  );

  const filteredExercises: IExercise[] = useMemo(
    () =>
      filteredWorkouts.map(
        (workout) => workout.exercises.filter((exercise: IExercise) => exercise.name === currentName)[0]
      ),
    [filteredWorkouts]
  );

  const volume: number[] = useMemo(
    () =>
      filteredExercises.map((exercise: IExercise) =>
        exercise.sets.reduce((total: number, set: ISet) => total + Number(set.weight) * Number(set.reps), 0)
      ),
    [filteredExercises]
  );

  const sets: number[] = useMemo(
    () => filteredExercises.map((exercise: IExercise) => exercise.sets.length),
    [filteredExercises]
  );

  const reps: number[] = useMemo(
    () =>
      filteredExercises.map((exercise: IExercise) =>
        exercise.sets.reduce((total: number, set: ISet) => total + Number(set.reps), 0)
      ),
    [filteredExercises]
  );

  const maxWeight: number[] = useMemo(
    () =>
      filteredExercises.map((exercise: IExercise) => Math.max(...exercise.sets.map((set: ISet) => Number(set.weight)))),
    [filteredExercises]
  );

  const oneRM: number[] = useMemo(
    () =>
      filteredExercises.map((exercise: IExercise) =>
        Math.max(...exercise.sets.map((set: ISet) => Number(set.weight) * (1 + Number(set.reps) / 30)))
      ),
    [filteredExercises]
  );

  const [sortBy, setSortBy] = useState<number[]>(volume);

  useEffect(() => {
    setSortBy(volume);
  }, [filteredWorkouts]);

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.navigate("Gym")}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Statistics</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="apple" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <TextInput
          value={input}
          placeholder="Exercise name..."
          placeholderTextColor={COLORS.darkGray}
          keyboardAppearance="dark"
          style={styles.input}
          onChangeText={setInput}
        />
        <FlatList
          data={exercises.filter((exercise: IExercise) => exercise.name.toLowerCase().includes(input.toLowerCase()))}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.nameContainer}
              onPress={() => setCurrentName(item.name)}
            >
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>
              <Icon name="chevron-right" size={24} color={COLORS.darkGray} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
          style={styles.namesContainer}
        />
        {sortBy.length !== 0 && (
          <>
            <LineChart
              data={{
                labels: filteredWorkouts.map((workout) => `${workout.date.month} ${workout.date.day}`),
                datasets: [
                  {
                    data: sortBy,
                  },
                ],
              }}
              width={windowDimensions.width - 32}
              height={windowDimensions.height / 3}
              chartConfig={{
                backgroundGradientFrom: COLORS.primary,
                backgroundGradientTo: COLORS.primary,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: COLORS.primary,
                },
              }}
              style={styles.chart}
            />
            <View style={styles.sortsContainer}>
              <TouchableOpacity activeOpacity={0.3} onPress={() => setSortBy(volume)}>
                <Text style={sortBy === volume ? [styles.sort, { color: COLORS.primary }] : styles.sort}>Volume</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.3} onPress={() => setSortBy(sets)}>
                <Text style={sortBy === sets ? [styles.sort, { color: COLORS.primary }] : styles.sort}>Sets</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.3} onPress={() => setSortBy(reps)}>
                <Text style={sortBy === reps ? [styles.sort, { color: COLORS.primary }] : styles.sort}>Reps</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.3} onPress={() => setSortBy(maxWeight)}>
                <Text style={sortBy === maxWeight ? [styles.sort, { color: COLORS.primary }] : styles.sort}>
                  Max Weight
                </Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.3} onPress={() => setSortBy(oneRM)}>
                <Text style={sortBy === oneRM ? [styles.sort, { color: COLORS.primary }] : styles.sort}>
                  One Rep Max
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
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
  progressContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.black,
  },
  input: {
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    color: COLORS.white,
    fontSize: 18,
  },
  namesContainer: {
    position: "absolute",
    top: 52,
    left: 16,
    width: "100%",
    maxHeight: windowDimensions.height / 2,
    backgroundColor: COLORS.blackOne,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: COLORS.blackOne,
  },
  name: {
    width: "90%",
    color: COLORS.white,
    fontSize: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: "center",
  },
  sortsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  sort: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Progress;
