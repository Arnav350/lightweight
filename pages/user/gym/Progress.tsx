import React, { useContext, useEffect, useMemo, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
  const [showDropdown, setShowDropdown] = useState<boolean>(true);

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

  function handlePress(exerciseName: string) {
    setCurrentName(exerciseName);
    setInput(exerciseName);
    setShowDropdown(false);
  }

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
        <View style={showDropdown ? styles.inputContainer : [styles.inputContainer, { borderRadius: 16 }]}>
          <Icon name="magnify" size={24} color={COLORS.darkGray} />
          <TextInput
            value={input}
            placeholder="Exercise name..."
            placeholderTextColor={COLORS.darkGray}
            keyboardAppearance="dark"
            style={styles.input}
            onChangeText={setInput}
            onFocus={() => setShowDropdown(true)}
          />
          <View style={styles.rightContainer}>
            {input && showDropdown && (
              <TouchableOpacity activeOpacity={0.3} onPress={() => setInput("")}>
                <Icon name="close-circle" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            )}
            <TouchableOpacity activeOpacity={0.3} onPress={() => setShowDropdown(!showDropdown)}>
              <Icon name={showDropdown ? "chevron-up" : "chevron-down"} size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
        {showDropdown && (
          <FlatList
            data={exercises.filter((exercise: IExercise) => exercise.name.toLowerCase().includes(input.toLowerCase()))}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.5} style={styles.nameContainer} onPress={() => handlePress(item.name)}>
                <Text numberOfLines={1} style={styles.name}>
                  {item.name}
                </Text>
                <Icon name="chevron-right" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.nameContainer}>
                <Text style={styles.name}>Could not find "{input}"</Text>
              </View>
            }
            keyExtractor={(item) => item.name}
            style={styles.namesContainer}
          />
        )}
        {sortBy.length > 2 ? (
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
        ) : (
          sortBy.length !== 0 && (
            <Text style={styles.must}>"{currentName}" must be done at least twice to display charts</Text>
          )
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 8,
    backgroundColor: COLORS.blackOne,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  input: {
    flex: 1,
    padding: 12,
    color: COLORS.white,
    fontSize: 18,
  },
  rightContainer: {
    flexDirection: "row",
    gap: 4,
  },
  namesContainer: {
    position: "absolute",
    zIndex: 1,
    top: 60,
    left: 16,
    paddingHorizontal: 8,
    width: "100%",
    maxHeight: Math.ceil(windowDimensions.height / 132) * 44,
    backgroundColor: COLORS.blackOne,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.blackOne,
    borderTopColor: COLORS.darkGray,
    borderTopWidth: 1,
  },
  name: {
    marginVertical: 12,
    marginHorizontal: 8,
    maxWidth: "90%",
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
  must: {
    marginTop: 8,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "center",
  },
});

export default Progress;
