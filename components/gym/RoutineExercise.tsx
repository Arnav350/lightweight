import { StyleSheet, Text, View } from "react-native";

import { IExercise, ISet } from "../../pages/workout/Workout";
import RoutineSet from "./RoutineSet";
import { COLORS } from "../../constants/theme";

interface IProps {
  exercise: IExercise;
}

function RoutineExercise({ exercise: { name, sets } }: IProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.routineContainer}>
        {sets.map((set: ISet, i: number) => (
          <RoutineSet key={i} set={set} />
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
