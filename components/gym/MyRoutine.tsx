import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { WorkoutContext } from "../../hooks/useWorkout";
import { TSelectProps } from "../../pages/user/gym/Select";
import { IExercise, IRoutine } from "../../pages/workout/Workout";
import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  routine: IRoutine;
  navigate: TSelectProps;
}

function MyRoutine({ i, routine, navigate: { navigation } }: IProps) {
  const { setCurrentWorkout, routines, setSettings } = useContext(WorkoutContext);

  function handlePress() {
    const date = new Date();
    setCurrentWorkout({
      date: {
        month: date.toLocaleDateString("default", { month: "short" }),
        day: date.toLocaleDateString("default", { day: "2-digit" }),
        year: date.getFullYear(),
      },
      name: routines[i].name,
      time: date.getTime(),
      weight: 0,
      exercises: [...routines[i].exercises],
    });

    navigation.navigate("WorkoutStack", { screen: "Workout" });
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={() => navigation.navigate("Routine", { i: i })}
    >
      <View style={styles.topContainer}>
        <Text style={styles.name}>{routine.name}</Text>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => setSettings((prevSettings) => ({ ...prevSettings, showOptions: true, i: i }))}
        >
          <Icon name="dots-horizontal" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <Text style={styles.exercises} numberOfLines={1}>
        {routine.exercises.map((exercise: IExercise) => exercise.name).join(", ")}
      </Text>
      <TouchableOpacity activeOpacity={0.5} style={styles.startContainer} onPress={handlePress}>
        <Text style={styles.start}>Start Routine</Text>
      </TouchableOpacity>
    </TouchableOpacity>
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
