import { StyleSheet, Text, View } from "react-native";

import { IExercise, ISet } from "../../pages/workout/Workout";
import RoutineSet from "./RoutineSet";
import { COLORS } from "../../constants/theme";

interface IProps {
  exercise: IExercise;
}

function RoutineExercise({ exercise }: IProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{exercise.name}</Text>
      <View style={styles.routineContainer}>
        {exercise.sets.map((set: ISet, j: number) => (
          <RoutineSet key={j} j={j} set={set} exercise={exercise} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  name: {
    margin: 8,
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  routineContainer: {
    padding: 8,
    marginHorizontal: 8,
  },
});

export default RoutineExercise;
