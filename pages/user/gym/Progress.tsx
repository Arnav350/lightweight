import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { LineChart } from "react-native-chart-kit";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TGymStackParamList } from "../../../stacks/UserStack";
import { WorkoutContext } from "../../../hooks/useWorkout";
import { COLORS } from "../../../constants/theme";
import { IExercise, ISet, IWorkout } from "../../workout/Workout";

type TProps = StackScreenProps<TGymStackParamList, "Progress">;

function Progress({ navigation }: TProps) {
  const { workouts } = useContext(WorkoutContext);

  const name: string = "Barbell Row";

  const filteredWorkouts: IWorkout[] = workouts
    .filter((workout: IWorkout) => workout.exercises.find((exercise) => exercise.name === name))
    .slice()
    .reverse();

  const filteredExercises: IExercise[] = filteredWorkouts.map(
    (workout) => workout.exercises.filter((exercise: IExercise) => exercise.name === name)[0]
  );

  const volume: number[] = filteredExercises.map((exercise: IExercise) =>
    exercise.sets.reduce((total: number, set: ISet) => total + Number(set.weight) * Number(set.reps), 0)
  );

  const sets: number[] = filteredExercises.map((exercise: IExercise) => exercise.sets.length);

  const maxWeight: number[] = filteredExercises.map((exercise: IExercise) =>
    Math.max(...exercise.sets.map((set: ISet) => Number(set.weight)))
  );

  const oneMax: number[] = filteredExercises.map((exercise: IExercise) =>
    Math.max(...exercise.sets.map((set: ISet) => Number(set.weight) * (1 + Number(set.reps) / 30)))
  );

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
        <LineChart
          data={{
            labels: filteredWorkouts.map((workout) => `${workout.date.month} ${workout.date.day}`),
            datasets: [
              {
                data: oneMax,
              },
            ],
          }}
          width={320}
          height={200}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginLeft: 32,
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
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
    backgroundColor: COLORS.black,
  },
});

export default Progress;
