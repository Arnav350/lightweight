import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TRootStackParamList } from "../../App";
import { TWorkoutStackParamList } from "../../stacks/WorkoutStack";
import { AuthContext } from "../../hooks/useAuth";
import { WorkoutContext } from "../../hooks/useWorkout";
import { IExercise } from "./Workout";
import ExerciseDropdown from "../../components/workout/ExerciseDropdown";
import AddExercise from "../../components/workout/AddExercise";
import NewExercise from "../../components/workout/NewExercise";
import { COLORS } from "../../constants/theme";

type TProps = CompositeScreenProps<
  StackScreenProps<TWorkoutStackParamList, "Add">,
  StackScreenProps<TRootStackParamList>
>;

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

const init: IExercise[] = [
  {
    name: "Bench Press",
    equipment: "Barbell",
    muscle: "Chest",
    notes: "",
    sets: [
      { type: "W", weight: 0, reps: 0, notes: "" },
      { type: "N", weight: 0, reps: 0, notes: "" },
      { type: "N", weight: 0, reps: 0, notes: "" },
    ],
  },
  {
    name: "Smith Machine 45 Pound Plate Elevated Front Squat",
    equipment: "Barbell",
    muscle: "Quads",
    notes: "",
    sets: [
      { type: "N", weight: 0, reps: 0, notes: "" },
      { type: "N", weight: 0, reps: 0, notes: "" },
      { type: "D", weight: 0, reps: 0, notes: "" },
      { type: "N", weight: 0, reps: 0, notes: "" },
      { type: "N", weight: 0, reps: 0, notes: "" },
    ],
  },
  {
    name: "Bicep Curl",
    equipment: "Dumbbell",
    muscle: "Bicep",
    notes: "",
    sets: [
      { type: "N", weight: 0, reps: 0, notes: "" },
      { type: "S", weight: 0, reps: 0, notes: "" },
      { type: "S", weight: 0, reps: 0, notes: "" },
    ],
  },
];

function Add(props: TProps) {
  const { navigation } = props;

  const currentUser = useContext(AuthContext);
  const { exercises, setExercises } = useContext(WorkoutContext);

  const [activityName, setActivityName] = useState<string>("");
  const [activities, setActivities] = useState<IExercise[]>(init);

  const [currentEquipment, setCurrentEquipment] = useState<string>("Any Equipment");
  const [currentMuscle, setCurrentMuscle] = useState<string>("Any Muscle");

  const [showNew, setShowNew] = useState<boolean>(false);

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
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
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
          <ExerciseDropdown
            data={["Any Equipment", ...equipments]}
            current={currentEquipment}
            setCurrent={setCurrentEquipment}
          />
          <ExerciseDropdown data={["Any Muscle", ...muscles]} current={currentMuscle} setCurrent={setCurrentMuscle} />
        </View>
      </View>
      <ScrollView style={styles.exercisesContainer}>
        <View>{!activityName && <Text style={styles.subheader}>Recent</Text>}</View>
        <View>
          {!activityName && <Text style={styles.subheader}>All Exercises</Text>}
          {activities
            .filter(
              (activity: IExercise) =>
                activity.name.toLowerCase().includes(activityName.toLowerCase()) &&
                (currentEquipment === activity.equipment || currentEquipment === "Any Equipment") &&
                (currentMuscle === activity.muscle || currentMuscle === "Any Muscle")
            )
            .map((activity: IExercise, i: number) => (
              <AddExercise key={i} activity={activity} navigate={props} />
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
        <NewExercise
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
