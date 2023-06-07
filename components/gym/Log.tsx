import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { IExercise, IWorkout } from "../../pages/workout/Workout";
import { COLORS } from "../../constants/theme";

interface IProps {
  workout: IWorkout;
}

function Log({ workout }: IProps) {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateMonth}>{workout.date.month}</Text>
        <Text style={styles.dateDay}>{workout.date.day}</Text>
      </View>
      <View style={styles.logContainer}>
        <Text style={styles.logTitle}>{workout.name}</Text>
        <View style={styles.logStats}>
          <Icon name="clock" style={styles.logStat}>
            <Text>{workout.time}m</Text>
          </Icon>
          <Icon name="weight" style={styles.logStat}>
            <Text>{workout.weight} lb</Text>
          </Icon>
        </View>
        <View style={styles.logExercises}>
          {workout.exercises.map((exercise: IExercise, i: number) => (
            <Text key={i} numberOfLines={1} style={styles.logExercise}>
              {exercise.sets.length} x {exercise.name}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 4,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  dateContainer: {
    alignItems: "center",
    padding: 8,
  },
  dateMonth: {
    color: COLORS.white,
    fontSize: 18,
  },
  dateDay: {
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
  },
  logStat: {
    marginRight: 16,
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  logExercises: {},
  logExercise: {
    color: COLORS.white,
  },
});

export default Log;
