import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { IRoutineExercise, IRoutine } from "../../pages/workout/Workout";
import { COLORS } from "../../constants/theme";

interface IProps {
  routine: IRoutine;
}

function MyRoutine({ routine }: IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.name}>{routine.name}</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Icon name="dots-horizontal" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <Text style={styles.exercises} numberOfLines={1}>
        {routine.exercises.map((exercise: IRoutineExercise) => exercise.name).join(", ")}
      </Text>
      <TouchableOpacity activeOpacity={0.5} style={styles.startContainer}>
        <Text style={styles.start}>Start Routine</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  exercises: {
    marginVertical: 8,
    color: COLORS.gray,
    fontSize: 16,
  },
  startContainer: {
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  start: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default MyRoutine;
