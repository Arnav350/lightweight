import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import DeleteSwipe from "../shared/DeleteSwipe";
import { daysList } from "../../constants/init";
import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  reminder: IReminder;
  setSettings: Dispatch<SetStateAction<INutritionSettings>>;
}

function ReminderList({ i, reminder: { name, time, days }, setSettings }: IProps) {
  const hours = time.getHours();

  const schedule = (function () {
    switch (true) {
      case days.length === 7:
        return "Everyday";
      case days[0] === 0 && days[1] === 6:
        return "Weekends";
      case days.length === 5 && days[0] !== 0 && days[4] !== 6:
        return "Weekdays";
      case days.length === 6:
        const temp: number = days.find((day, i) => day !== i) || 0;
        return "Everday except " + daysList[temp - 1].slice(0, 3);
      default:
        return days.map((day) => daysList[day].slice(0, 3)).join(", ");
    }
  })();

  return (
    <Swipeable
      overshootFriction={8}
      renderRightActions={(_progress, dragX) => <DeleteSwipe dragX={dragX} variable="reminder" i={i} />}
    >
      <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={() => setSettings({ show: true, i: i })}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.scheduleContainer}>
          <Text style={styles.schedule}>{schedule}</Text>
          <Text style={styles.schedule}>
            {hours % 12 === 0 ? 12 : hours}:{time.getMinutes().toString().padStart(2, "0")} {hours >= 12 ? "PM" : "AM"}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  name: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  scheduleContainer: {},
  schedule: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "right",
  },
});

export default ReminderList;
