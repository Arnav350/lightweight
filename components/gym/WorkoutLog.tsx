import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { WorkoutContext } from "../../hooks/useWorkout";
import { TGymProps } from "../../pages/user/gym/Gym";
import DeleteSwipe from "../shared/DeleteSwipe";
import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  workout: IWorkout;
  navigate: TGymProps;
}

function WorkoutLog({ i, workout, navigate: { navigation } }: IProps) {
  const { date, name, time, weight, exercises } = workout;
  const currentDate = new Date(date);

  const { setCurrentWorkout } = useContext(WorkoutContext);

  function handlePress() {
    setCurrentWorkout(workout);

    navigation.navigate("Workout");
  }

  return (
    <Swipeable
      overshootFriction={8}
      renderRightActions={(_progress, dragX) => <DeleteSwipe dragX={dragX} variable="workout" i={i} />}
      containerStyle={styles.container}
    >
      <TouchableOpacity activeOpacity={0.5} style={styles.workoutContainer} onPress={handlePress}>
        <View style={styles.dateContainer}>
          <Text style={styles.month}>{currentDate.toLocaleDateString("default", { month: "short" })}</Text>
          <Text style={styles.day}>{currentDate.toLocaleDateString("default", { day: "2-digit" })}</Text>
        </View>
        <View style={styles.logContainer}>
          <Text style={styles.logTitle}>{name}</Text>
          <View style={styles.logStats}>
            <Icon name="clock" style={styles.logStat}>
              <Text>{Math.round(time / 60000)}m</Text>
            </Icon>
            <Icon name="weight" style={styles.logStat}>
              <Text>{weight} lb</Text>
            </Icon>
          </View>
          <View style={styles.logExercises}>
            {exercises.map((exercise: IExercise, i: number) => (
              <Text key={exercise.name} numberOfLines={1} style={styles.logExercise}>
                {exercise.sets.length} x {exercise.name}
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  workoutContainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  dateContainer: {
    alignItems: "center",
    padding: 8,
  },
  month: {
    color: COLORS.white,
    fontSize: 18,
  },
  day: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  logContainer: {
    flexShrink: 1,
    padding: 8,
  },
  logTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  logStats: {
    flexDirection: "row",
    gap: 16,
  },
  logStat: {
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  logExercises: {},
  logExercise: {
    color: COLORS.white,
  },
});

export default WorkoutLog;
