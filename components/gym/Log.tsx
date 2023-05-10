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
        <View style={styles.logInfo}>
          <Icon name="clock-outline" style={styles.logStats}>
            <Text>123425m</Text>
          </Icon>
          <Icon name="weight" style={styles.logStats}>
            <Text>126382 lb</Text>
          </Icon>
        </View>
        <View style={styles.logExercises}>
          <Text style={styles.logExercise}>3 x Chinups</Text>
          <Text style={styles.logExercise}>
            20 x Incline Dumbbell Upper Chest Press
          </Text>
          <Text style={styles.logExercise}>4 x Lateral Raises</Text>
          <Text style={styles.logExercise}>10 x Pushups</Text>
          <Text style={styles.logExercise}>2 x Bicep Curls</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginRight: 8,
    marginLeft: 8,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  dateContainer: {
    display: "flex",
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
    padding: 8,
  },
  logTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  logInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  logStats: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  logExercises: {},
  logExercise: {
    color: COLORS.white,
  },
});

export default Log;
