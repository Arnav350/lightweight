import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { IExercise, ISet, ITypeSettings } from "../../pages/workout/Workout";
import { COLORS } from "../../constants/theme";

interface IProps {
  i?: number;
  j: number;
  set: ISet;
  exercise: IExercise;
  setTypeSettings?: Dispatch<SetStateAction<ITypeSettings>>;
}

function RoutineSet({ i, j, set: { type }, exercise: { sets }, setTypeSettings }: IProps) {
  return (
    <View style={styles.container}>
      {i !== undefined && j !== undefined && setTypeSettings !== undefined ? (
        <TouchableOpacity activeOpacity={0.3} onPress={() => setTypeSettings({ show: true, i: i, j: j })}>
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
