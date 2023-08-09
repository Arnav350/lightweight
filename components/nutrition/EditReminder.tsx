import { Dispatch, SetStateAction, useContext, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { NutritionContext } from "../../hooks/useNutrition";
import { daysList } from "../../constants/init";
import { COLORS } from "../../constants/theme";

interface IProps {
  settings: INutritionSettings;
  setSettings: Dispatch<SetStateAction<INutritionSettings>>;
}

function EditReminder({ settings, setSettings }: IProps) {
  const { reminders, setReminders } = useContext(NutritionContext);

  const [focused, setFocused] = useState<boolean>(false);
  const [name, setName] = useState<string>(settings.i === -1 ? "" : reminders[settings.i].name);
  const [date, setDate] = useState<Date>(settings.i === -1 ? new Date() : reminders[settings.i].time);
  const [days, setDays] = useState<boolean[]>(
    Array(7)
      .fill(null)
      .map((_el, i: number) => reminders[settings.i]?.days.includes(i))
  );
  const [err, setErr] = useState<boolean>(false);

  function handlePress() {
    if (name.trim() !== "" && days.some((day: boolean) => day)) {
      let i: number = 0;
      if (reminders.filter((reminder: IReminder, j: number) => reminder.name === name && j !== settings.i).length > 0) {
        i = 1;
        while (
          reminders.filter((reminder: IReminder, j: number) => reminder.name === name + ` (${i})` && j !== settings.i)
            .length > 0
        ) {
          i++;
        }
      }
      const tempName: string = i ? name + ` (${i})` : name;

      const tempDays: number[] = [];
      days.forEach((day, i) => day && tempDays.push(i));

      setSettings((prevSettings) => ({ ...prevSettings, show: false }));
      if (settings.i === -1) {
        setReminders((prevReminders) =>
          [...prevReminders, { name: tempName, time: date, days: tempDays }].sort(
            (a: IReminder, b: IReminder) => a.time.getTime() - b.time.getTime()
          )
        );
      } else {
        setReminders((prevReminders) =>
          prevReminders
            .map((prevReminder: IReminder, i: number) =>
              i === settings.i ? { name: tempName, time: date, days: tempDays } : prevReminder
            )
            .sort((a: IReminder, b: IReminder) => a.time.getTime() - b.time.getTime())
        );
      }
    } else {
      setErr(true);
    }
  }

  function handleChange(event: DateTimePickerEvent, date: Date | undefined) {
    if (event.type === "set" && date) {
      setDate(date);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.reminderContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => setSettings((prevSettings) => ({ ...prevSettings, show: false }))}
          >
            <Icon name="close" size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.header}>{settings.i === -1 ? "New Reminder" : `Edit ${reminders[settings.i].name}`}</Text>
          <TouchableOpacity activeOpacity={0.3} onPress={handlePress}>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.editContainer}>
          {err && <Text style={styles.error}>Enter a name and select at least one day</Text>}
          <View style={styles.inputContainer}>
            <TextInput
              value={name}
              placeholder="Remind me to..."
              placeholderTextColor={COLORS.darkGray}
              keyboardAppearance="dark"
              style={focused ? [styles.name, { borderBottomColor: COLORS.primary }] : styles.name}
              onChangeText={setName}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            <RNDateTimePicker
              mode="time"
              display="default"
              themeVariant="dark"
              accentColor={COLORS.primary}
              value={date}
              onChange={(event: DateTimePickerEvent, date: Date | undefined) => handleChange(event, date)}
            />
          </View>
          <View style={styles.daysContainer}>
            {days.map((day, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.5}
                style={day ? [styles.dayContainer, { backgroundColor: COLORS.primary }] : styles.dayContainer}
                onPress={() => setDays((prevDays) => prevDays.map((prevDay, j) => (j === i ? !prevDay : prevDay)))}
              >
                <Text style={styles.day}>{daysList[i].slice(0, 3)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111111ee",
  },
  reminderContainer: {
    margin: 16,
    padding: 8,
    backgroundColor: COLORS.black,
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  header: {
    marginHorizontal: 16,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  save: {
    color: COLORS.primary,
    fontSize: 20,
  },
  editContainer: {
    padding: 8,
    gap: 8,
  },
  error: {
    color: "#f00",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    paddingHorizontal: 8,
    minWidth: 132,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
    color: COLORS.white,
    fontSize: 16,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 2,
  },
  dayContainer: {
    padding: 4,
    width: 44,
    backgroundColor: COLORS.blackOne,
    borderRadius: 4,
  },
  day: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default EditReminder;
