import { useContext } from "react";
import { Alert, Animated, StyleSheet, TouchableOpacity } from "react-native";

import { WorkoutContext } from "../../hooks/useWorkout";
import { NutritionContext } from "../../hooks/useNutrition";
import { COLORS } from "../../constants/theme";

interface IProps {
  dragX: any;
  variable: string;
  i: number;
  j?: number;
}

//SHOULDNT BE ANY
function DeleteSwipe({ dragX, variable, i, j }: IProps) {
  const { setCurrentWorkout, setWorkouts } = useContext(WorkoutContext);
  const { setReminders } = useContext(NutritionContext);

  const scale = dragX.interpolate({
    inputRange: [-100, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  function remove() {
    switch (variable) {
      case "set":
        setCurrentWorkout((prevCurrentWorkout) => ({
          ...prevCurrentWorkout,
          exercises: prevCurrentWorkout.exercises.map((currentExercise, k) =>
            k === i
              ? { ...currentExercise, sets: currentExercise.sets.filter((_currentSet, l) => l !== j) }
              : currentExercise
          ),
        }));
        break;
      case "workout":
        setWorkouts((prevWorkouts) => prevWorkouts.filter((_prevWorkout, k) => k !== i));
        break;
      case "reminder":
        setReminders((prevReminders) => prevReminders.filter((_prevReminder, k) => k !== i));
      default:
        break;
    }
  }

  function handlePress() {
    Alert.alert(`Delete ${variable}?`, `Are you sure you want to delete this ${variable}`, [
      {
        text: "Delete",
        onPress: remove,
        style: "destructive",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.deleteContainer,
        variable === "workout" && { borderRadius: 16 },
        variable === "reminder" && { borderRadius: 8 },
        variable === "set" && { borderRadius: 4 },
      ]}
      onPress={handlePress}
    >
      <Animated.Text style={[styles.delete, { transform: [{ scale: scale }] }]}>Delete</Animated.Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteContainer: {
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
  },
  delete: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "500",
  },
});

export default DeleteSwipe;
