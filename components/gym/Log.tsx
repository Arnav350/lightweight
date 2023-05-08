import { StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS, FONTS } from "../../constants/theme";

function Log() {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginRight: 8,
    marginLeft: 8,
    padding: 8,
    backgroundColor: COLORS.box,
    borderRadius: 16,
  },
  dateContainer: {
    display: "flex",
    alignItems: "center",
    padding: 8,
  },
  dateMonth: {
    color: COLORS.textOne,
    fontSize: FONTS.large,
  },
  dateDay: {
    color: COLORS.textOne,
    fontSize: FONTS.xlarge,
    fontWeight: FONTS.bold,
  },
  logContainer: {
    padding: 8,
  },
  logTitle: {
    color: COLORS.textOne,
    fontSize: FONTS.large,
    fontWeight: FONTS.bold,
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
    color: COLORS.textOne,
    fontSize: FONTS.normal,
  },
  logExercises: {},
  logExercise: {
    color: COLORS.textOne,
  },
});

export default Log;
