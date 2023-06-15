import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { WorkoutContext } from "../../hooks/useWorkout";
import { IRoutineExercise } from "../../pages/workout/Workout";
import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  exercise: IRoutineExercise;
}

function RoutineExercise({ i, exercise }: IProps) {
  const { routines, setRoutines } = useContext(WorkoutContext);

  return (
    <View style={styles.container}>
      <Text>{exercise.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
});

export default RoutineExercise;
