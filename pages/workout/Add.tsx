import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Dropdown from "../../components/workout/Dropdown";
import Activity from "../../components/workout/Activity";
import New from "../../components/workout/New";
import { AuthContext } from "../../hooks/useAuth";

import { COLORS } from "../../constants/theme";

export interface IActivity {
  name: string;
  equipment: string;
  muscle: string;
}

const equipments: string[] = [
  "None",
  "Barbell",
  "Dumbbell",
  "Kettlebell",
  "Machine",
  "Cable",
  "Plate",
  "Resistance Band",
  "Other",
];

const muscles: string[] = [
  "Abs",
  "Biceps",
  "Calves",
  "Cardio",
  "Chest",
  "Forearms",
  "Full Body",
  "Glutes",
  "Hamstrings",
  "Lats",
  "Lower Back",
  "Quads",
  "Shoulders",
  "Triceps",
  "Upper Back",
  "Other",
];

const init: IActivity[] = [
  { name: "Bench Press", equipment: "Barbell", muscle: "Chest" },
  { name: "Hammer Curl", equipment: "Dumbbell", muscle: "Bicep" },
  {
    name: "Smith Machine 45 Pound Plate Elevated Front Squat",
    equipment: "Barbell",
    muscle: "Quads",
  },
  { name: "Bench Press", equipment: "Dumbbell", muscle: "Chest" },
];

function Add() {
  const [activityName, setActivityName] = useState<string>("");
  const [activities, setActivities] = useState<IActivity[]>(init);

  const [currentEquipment, setCurrentEquipment] = useState<string>("Any Equipment");
  const [currentMuscle, setCurrentMuscle] = useState<string>("Any Muscle");

  const [showNew, setShowNew] = useState<boolean>(false);

  const currentUser = useContext(AuthContext);

  useEffect(() => {
    AsyncStorage.setItem(`@${currentUser?.id}:activities`, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    AsyncStorage.getItem(`@${currentUser?.id}:activities`).then((jsonActivities) => {
      if (jsonActivities) {
        setActivities(JSON.parse(jsonActivities));
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Add Exercise</Text>
        <TouchableOpacity activeOpacity={0.3} onPress={() => setShowNew(true)}>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.inputContainer}>
          <Icon name="magnify" size={24} color={COLORS.gray} />
          <TextInput
            value={activityName}
            placeholder="Search exercise"
            placeholderTextColor={COLORS.gray}
            keyboardAppearance="dark"
            style={styles.input}
            onChangeText={setActivityName}
          />
        </View>
        <View style={styles.dropdownsContainer}>
          <Dropdown
            data={["Any Equipment", ...equipments]}
            current={currentEquipment}
            setCurrent={setCurrentEquipment}
          />
          <Dropdown data={["Any Muscle", ...muscles]} current={currentMuscle} setCurrent={setCurrentMuscle} />
        </View>
      </View>
      <ScrollView style={styles.exercisesContainer}>
        <View>{!activityName && <Text style={styles.subheader}>Recent</Text>}</View>
        <View>
          {!activityName && <Text style={styles.subheader}>All Exercises</Text>}
          {activities
            .filter(
              (activity) =>
                activity.name.toLowerCase().includes(activityName.toLowerCase()) &&
                (currentEquipment === activity.equipment || currentEquipment === "Any Equipment") &&
                (currentMuscle === activity.muscle || currentMuscle === "Any Muscle")
            )
            .map((activity: IActivity, i: number) => (
              <Activity key={i} activity={activity} />
            ))}
          <Text style={styles.dont}>Don't see the exercise you want?</Text>
          <TouchableOpacity activeOpacity={0.5} style={styles.newContainer}>
            <Text style={styles.new} onPress={() => setShowNew(true)}>
              Create New Exercise
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {showNew && (
        <New
          equipments={equipments}
          muscles={muscles}
          activities={activities}
          setActivities={setActivities}
          setShowNew={setShowNew}
        />
      )}
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
    paddingVertical: 8,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
  optionsContainer: {
    position: "relative",
    zIndex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: COLORS.black,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    paddingHorizontal: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    paddingLeft: 16,
    color: COLORS.white,
    fontSize: 16,
  },
  dropdownsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  exercisesContainer: {
    padding: 16,
    backgroundColor: COLORS.black,
  },
  subheader: {
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  dont: {
    marginVertical: 16,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  newContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 8,
  },
  new: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default Add;
