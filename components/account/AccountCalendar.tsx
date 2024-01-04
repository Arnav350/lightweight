import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { WorkoutContext } from "../../hooks/useWorkout";
import { COLORS } from "../../constants/theme";

function AccountCalendar() {
  const { workouts } = useContext(WorkoutContext);

  const currentDate = new Date();
  const lastDate = new Date();
  lastDate.setDate(currentDate.getDate() - 112);

  const recentWorkouts: IWorkout[] = [];
  for (let i = 0; i < workouts.length; i++) {
    if (workouts[i].date >= lastDate) {
      recentWorkouts.push(workouts[i]);
    } else {
      break;
    }
  }
  const recentDates: number[] = recentWorkouts.map(({ date }) =>
    Math.round((currentDate.setHours(0) - date.setHours(0)) / 86400000)
  );

  return (
    <View style={{ flexDirection: "row" }}>
      {/* {Array(16)
        .fill(true)
        .map(({ index }) => (
          <View key={index}>
            {Array(7)
              .fill(true)
              .map(({ index }) => (
                <View
                  key={index}
                  style={{ height: 16, width: 16, backgroundColor: COLORS.primary, borderRadius: 4 }}
                ></View>
              ))}
          </View>
        ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  square: {
    width: 8,
    height: 8,
    margin: 2,
  },
});

export default AccountCalendar;
