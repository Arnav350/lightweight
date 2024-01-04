import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { WorkoutContext } from "../../hooks/useWorkout";
import { COLORS } from "../../constants/theme";

function AccountCalendar() {
  const { workouts } = useContext(WorkoutContext);

  const currentDate: Date = new Date();
  const currentDay: number = currentDate.getDay() === 6 ? -1 : currentDate.getDay();
  const lastDate: Date = new Date();
  lastDate.setDate(currentDate.getDate() - 112);
  const lastMilli = lastDate.getTime();

  const temp = new Date();
  let randomDates: Date[] = Array(25).fill(temp);
  randomDates = randomDates
    .map((date) => new Date(temp.getTime() - Math.floor(Math.random() * 113) * 24 * 60 * 60 * 1000))
    .sort((a, b) => a.getTime() - b.getTime())
    .reverse();

  // const workoutDays = new Set<number>([]);
  // for (let i = 0; i < workouts.length; i++) {
  //   if (workouts[i].date >= lastDate) {
  //     workoutDays.add(Math.floor((lastMilli - workouts[i].date.setHours(0)) / 86400000));
  //   } else {
  //     break;
  //   }
  // }

  const workoutDays = new Set<number>([]);
  for (let i = 0; i < randomDates.length; i++) {
    if (randomDates[i] >= lastDate) {
      workoutDays.add(-Math.floor((lastMilli - randomDates[i].setHours(0)) / 86400000));
    } else {
      break;
    }
  }

  const t = Array.from(workoutDays);
  console.log(t);

  return (
    <View style={{ flexDirection: "row" }}>
      {Array(16)
        .fill(true)
        .map((__, i) => (
          <View key={i}>
            {Array(7)
              .fill(true)
              .map((__, j) => (
                <View
                  key={j}
                  style={styles.square}
                  // style={i === 0 && j <= currentDay ? { ...styles.square, opacity: 0 } : styles.square}
                ></View>
              ))}
          </View>
        ))}
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
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
});

export default AccountCalendar;
