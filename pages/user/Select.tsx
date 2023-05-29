import { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TGymProps } from "../../stacks/UserStack";

import { COLORS } from "../../constants/theme";

interface IExercise {
  name: string;
  sets: number;
}

interface IRoutine {
  name: String;
  exercises: IExercise[];
}

function Select({ navigation }: TGymProps) {
  const [routines, setRoutines] = useState<IRoutine[]>([
    {
      name: "Push",
      exercises: [
        { name: "Bench Press", sets: 3 },
        { name: "Dips", sets: 3 },
        { name: "Incline Dumbbell Banded Bench Chest Press", sets: 3 },
      ],
    },
    {
      name: "Pull",
      exercises: [
        { name: "T-Bar Row", sets: 3 },
        { name: "Curls", sets: 3 },
        { name: "Lat Pulldown", sets: 3 },
      ],
    },
    {
      name: "Legs",
      exercises: [
        { name: "Squat", sets: 3 },
        { name: "Leg Curls", sets: 3 },
        { name: "Calf Raises", sets: 3 },
      ],
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Gym")}
        >
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Select Routine</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.selectContainer}>
        <Text style={styles.subheading}>My Routines</Text>
        {routines.map((routine: IRoutine, i: number) => (
          <View key={i} style={styles.myContainer}>
            <View style={styles.topContainer}>
              <Text style={styles.name}>{routine.name}</Text>
              <TouchableOpacity activeOpacity={0.5}>
                <Icon name="dots-horizontal" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.exercises} numberOfLines={1}>
              {routine.exercises
                .map((exercise: IExercise) => exercise.name)
                .join(", ")}
            </Text>
            <TouchableOpacity activeOpacity={0.5} style={styles.startContainer}>
              <Text style={styles.start}>Start Routine</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Text style={styles.subheading}>Explore Routines</Text>
      </ScrollView>
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
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
  selectContainer: {
    backgroundColor: COLORS.black,
  },
  subheading: {
    color: COLORS.white,
  },
  myContainer: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "500",
  },
  exercises: {
    marginVertical: 8,
    color: COLORS.gray,
    fontSize: 16,
  },
  startContainer: {
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  start: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default Select;
