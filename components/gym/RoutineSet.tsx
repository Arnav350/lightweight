import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { WorkoutContext } from "../../hooks/useWorkout";
import { COLORS } from "../../constants/theme";

interface IProps {
  i?: number;
  j: number;
  set: ISet;
  exercise: IExercise;
}

function RoutineSet({ i, j, set: { type }, exercise: { sets } }: IProps) {
  const { setSettings } = useContext(WorkoutContext);

  return (
    <View style={styles.container}>
      {i !== undefined && j !== undefined ? (
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => setSettings((prevSettings) => ({ ...prevSettings, showType: true, i: i, j: j }))}
        >
          <Text style={styles.text}>
            {type === "N" ? sets.slice(0, j + 1).filter((set: ISet) => set.type === "N").length : type}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.text}>{type}</Text>
      )}
      <Text style={styles.text}>-</Text>
      <Text style={styles.text}>-</Text>
      <Text style={styles.text}>-</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    marginHorizontal: 16,
    width: 16,
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default RoutineSet;
