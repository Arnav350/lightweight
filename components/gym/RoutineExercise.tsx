import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";

import { IExercise, ISet, ITypeSettings } from "../../pages/workout/Workout";
import RoutineSet from "./RoutineSet";
import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  exercise: IExercise;
  setTypeSettings: Dispatch<SetStateAction<ITypeSettings>>;
}

function RoutineExercise({ i, exercise: { name, sets }, setTypeSettings }: IProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.routineContainer}>
        {sets.map((set: ISet, j: number) => (
          <RoutineSet key={j} i={i} j={j} set={set} setTypeSettings={setTypeSettings} />
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
