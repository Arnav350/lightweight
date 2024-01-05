import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { WorkoutContext } from "../../hooks/useWorkout";
import { COLORS } from "../../constants/theme";

function AccountCalendar() {
  const { workouts } = useContext(WorkoutContext);

  const days = 112;
  const currentDate: Date = new Date();
  const currentDay: number = currentDate.getDay();
  const lastDate: Date = new Date();
  lastDate.setDate(currentDate.getDate() - days + 1);
  lastDate.setHours(0, 0, 0, 0);
  const lastMilli = lastDate.getTime();

  // console.log(lastDate);

  const temp = new Date();
  let randomDates: Date[] = Array(60).fill(temp);
  randomDates = randomDates
    .map((date) => new Date(temp.getTime() - Math.floor(Math.random() * days) * 24 * 60 * 60 * 1000))
    .sort((a, b) => a.getTime() - b.getTime());

  // const workoutDays = new Set<number>([]);
  // for (let i = 0; i < workouts.length; i++) {
  //   if (workouts[i].date >= lastDate) {
  //     workoutDays.add(Math.floor((lastMilli - workouts[i].date.setHours(0, 0, 0, 0)) / 86400000));
  //   } else {
  //     break;
  //   }
  // }

  const uniqueDays = new Set<number>([]);
  for (let i = 0; i < randomDates.length; i++) {
    if (randomDates[i] >= lastDate) {
      uniqueDays.add(Math.floor((randomDates[i].getTime() - lastMilli) / 86400000));
    } else {
      break;
    }
  }

  const workoutDays = Array.from(uniqueDays);

  const booleanDays = Array(days + 7).fill(false);

  let originalIndex = 0;

  for (let i = 0; i < booleanDays.length; i++) {
    if (i - currentDay === workoutDays[originalIndex]) {
      booleanDays[i] = true;
      originalIndex++;
      if (originalIndex === workoutDays.length) {
        break;
      }
    }
  }

  function getStyle(i: number, j: number, bol: boolean) {
    if ((i === 0 && j < currentDay) || (i === 16 && j >= currentDay)) {
      return { ...styles.square, opacity: 0 };
    } else if (bol) {
      return { ...styles.square, backgroundColor: COLORS.primary };
    } else {
      return styles.square;
    }
  }

  return (
    <View style={{ flexDirection: "row" }}>
      {Array(days / 7 + 7)
        .fill(true)
        .map((__, i) => (
          <View key={i}>
            {booleanDays.slice(7 * i, 7 * (i + 1)).map((bol, j) => (
              <View
                key={j}
                // style={styles.square}
                style={getStyle(i, j, bol)}
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
    backgroundColor: COLORS.darkGray,
  },
});

export default AccountCalendar;
