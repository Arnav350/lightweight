import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../constants/theme";

function Log() {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateMonth}>May</Text>
        <Text style={styles.dateDay}>12</Text>
      </View>
      <View style={styles.logContainer}>
        <Text style={styles.logTitle}>Workout Name</Text>
        <View style={styles.logStats}>
          <Icon name="clock" style={styles.logStat}>
            <Text>123425m</Text>
          </Icon>
          <Icon name="weight" style={styles.logStat}>
            <Text>126382 lb</Text>
          </Icon>
        </View>
        <View style={styles.logExercises}>
          <Text style={styles.logExercise} numberOfLines={1}>
            3 x Chinups
          </Text>
          <Text style={styles.logExercise} numberOfLines={1}>
            20 x Incline Dumbbell Upper Chest Press
          </Text>
          <Text style={styles.logExercise} numberOfLines={1}>
            4 x Lateral Raises
          </Text>
          <Text style={styles.logExercise} numberOfLines={1}>
            10 x Pushups
          </Text>
          <Text style={styles.logExercise} numberOfLines={1}>
            2 x Bicep Curls
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 4,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  dateContainer: {
    alignItems: "center",
    padding: 8,
  },
  dateMonth: {
    color: COLORS.white,
    fontSize: 18,
  },
  dateDay: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  logContainer: {
    flexShrink: 1,
    padding: 8,
  },
  logTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  logStats: {
    flexDirection: "row",
  },
  logStat: {
    marginRight: 16,
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  logExercises: {},
  logExercise: {
    color: COLORS.white,
  },
});

export default Log;
