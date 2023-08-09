import { useContext, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { NutritionContext } from "../../../hooks/useNutrition";
import ReminderList from "../../../components/nutrition/ReminderList";
import EditReminder from "../../../components/nutrition/EditReminder";
import { COLORS } from "../../../constants/theme";

type TReminderProps = StackScreenProps<TNutritionStackParamList, "Reminder">;

function Reminder({ navigation }: TReminderProps) {
  const { reminders, setReminders } = useContext(NutritionContext);

  const [settings, setSettings] = useState<INutritionSettings>({ show: false, i: 0 });

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <Text style={styles.header}>Reminders</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="speaker" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.reminderContainer}>
        <TouchableOpacity
          style={styles.newContainer}
          activeOpacity={0.5}
          onPress={() => setSettings({ show: true, i: -1 })}
        >
          <Text style={styles.new}>Create New Reminder</Text>
        </TouchableOpacity>
        <View style={styles.listContainer}>
          {reminders.length ? (
            reminders.map((reminder: IReminder, i: number) => (
              <ReminderList key={reminder.name} i={i} reminder={reminder} setSettings={setSettings} />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.no}>No Saved Reminders</Text>
              <Text style={styles.shown}>Reminders will be shown here</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <Modal animationType="fade" transparent visible={settings.show}>
        <EditReminder settings={settings} setSettings={setSettings} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blackTwo,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackTwo,
  },
  header: {
    margin: 8,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  reminderContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.black,
  },
  newContainer: {
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  new: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  listContainer: {
    marginTop: 16,
    gap: 8,
  },
  emptyContainer: {
    marginTop: 8,
    gap: 8,
    alignItems: "center",
  },
  no: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  shown: {
    color: COLORS.gray,
    fontSize: 16,
  },
});

export default Reminder;
