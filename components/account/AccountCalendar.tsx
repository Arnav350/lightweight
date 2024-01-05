import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { WorkoutContext } from "../../hooks/useWorkout";
import { COLORS } from "../../constants/theme";

const days: number = 112;

function AccountCalendar() {
  const { workouts } = useContext(WorkoutContext);

  const currentDate: Date = new Date();
  const currentDay: number = currentDate.getDay();
  const lastDate: Date = new Date();
  lastDate.setDate(currentDate.getDate() - days + 1);
  lastDate.setHours(0, 0, 0, 0);
  const lastMilli = lastDate.getTime();

  const uniqueDays = new Set<number>([]);
  for (let i = 0; i < workouts.length; i++) {
    if (workouts[i].date >= lastDate) {
      uniqueDays.add(Math.floor((workouts[i].date.getTime() - lastMilli) / 86400000));
    } else {
      break;
    }
  }

  const workoutDays = Array.from(uniqueDays);
  const booleanDays = Array(days + 7).fill(false);

  for (let i = 0, j = 0; i < booleanDays.length; i++) {
    if (i - currentDay === workoutDays[j]) {
      booleanDays[i] = true;
      j++;
      if (j === workoutDays.length) {
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
    <View style={styles.container}>
      <View>
        <View style={styles.rowContainer}>
          <Text style={styles.emptyContainer}>Wed</Text>
          <View style={styles.monthsContainer}>
            <Text style={{ ...styles.month, marginRight: -40 + Math.floor(currentDate.getDate() / 7) * 12 }}>Sep</Text>
            <Text style={styles.month}>Oct</Text>
            <Text style={styles.month}>Nov</Text>
            <Text style={styles.month}>Dec</Text>
            <Text style={styles.month}>Jan</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.daysContainer}>
            <Text style={styles.day}>Sun</Text>
            <Text style={styles.day}>Mon</Text>
            <Text style={styles.day}>Tue</Text>
            <Text style={styles.day}>Wed</Text>
            <Text style={styles.day}>Thu</Text>
            <Text style={styles.day}>Fri</Text>
            <Text style={styles.day}>Sat</Text>
          </View>
          <View style={styles.squaresContainer}>
            {Array(days / 7 + 7)
              .fill(true)
              .map((__, i) => (
                <View key={i}>
                  {booleanDays.slice(7 * i, 7 * (i + 1)).map((bol, j) => (
                    <View key={j} style={getStyle(i, j, bol)}></View>
                  ))}
                </View>
              ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
  },
  emptyContainer: {
    marginRight: 8,
    fontSize: 13,
    opacity: 0,
  },
  monthsContainer: {
    flexDirection: "row",
    gap: 48,
  },
  month: {
    color: COLORS.white,
    fontSize: 13,
  },
  daysContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  day: {
    color: COLORS.white,
    fontSize: 13,
  },
  squaresContainer: {
    flexDirection: "row",
  },
  square: {
    margin: 2,
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: COLORS.darkGray,
  },
});

export default AccountCalendar;
