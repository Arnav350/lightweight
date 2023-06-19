import { StyleSheet, Text, View } from "react-native";

import { ISet } from "../../pages/workout/Workout";
import { COLORS } from "../../constants/theme";

interface IProps {
  set: ISet;
}

function RoutineSet({ set: { type } }: IProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{type}</Text>
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
