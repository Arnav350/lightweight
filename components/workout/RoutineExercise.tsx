import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { WorkoutContext } from "../../hooks/useWorkout";
import { IRoutineExercise } from "../../pages/workout/Workout";

interface IProps {
  i: number;
  exercise: IRoutineExercise;
}

function RoutineExercise({ i, exercise }: IProps) {
  const { routines, setRoutines } = useContext(WorkoutContext);

  return (
    <View>
      <Text>{exercise.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default RoutineExercise;
