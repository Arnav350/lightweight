import { useContext } from "react";
import { Alert, Animated, StyleSheet, TouchableOpacity } from "react-native";

import { WorkoutContext } from "../../hooks/useWorkout";
import { COLORS } from "../../constants/theme";

interface IProps {
  dragX: any;
  variable: string;
  i: number;
  j?: number;
}

//SHOULD BE ANY
function DeleteSwipe({ dragX, variable, i, j }: IProps) {
  const { setWorkouts } = useContext(WorkoutContext);

  const scale = dragX.interpolate({
    inputRange: [-100, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  function remove() {
    switch (variable) {
      case "workout":
        setWorkouts((prevWorkouts) => prevWorkouts.filter((_prevWorkout, k) => k !== i));
        break;
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
      style={[styles.deleteContainer, variable === "workout" && { borderRadius: 16 }]}
      onPress={handlePress}
    >
      <Animated.Text style={[styles.delete, { transform: [{ scale: scale }] }]}>Delete</Animated.Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteContainer: {
    justifyContent: "center",
    marginVertical: 4,
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
