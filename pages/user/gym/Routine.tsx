import { useContext, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TCompositeProps } from "../../../App";
import { TGymStackParamList } from "../../../stacks/UserStack";
import { WorkoutContext } from "../../../hooks/useWorkout";
import { ISet, ITypeSettings } from "../../workout/Workout";
import SetType from "../../../components/shared/SetType";
import RoutineExercise from "../../../components/gym/RoutineExercise";
import { COLORS } from "../../../constants/theme";
import { initCurrentWorkout } from "../../../constants/init";

type TProps = CompositeScreenProps<StackScreenProps<TGymStackParamList, "Routine">, TCompositeProps>;

function Routine({ navigation, route: { params } }: TProps) {
  const { setCurrentWorkout, exercises, setExercises, routines } = useContext(WorkoutContext);

  function handleEditPress() {
    setCurrentWorkout({
      ...initCurrentWorkout,
      name: routines[params.i].name,
      exercises: [...routines[params.i].exercises],
    });

    navigation.navigate("Design", { i: params.i });
  }

  function handleStartPress() {
    const date = new Date();
    setCurrentWorkout({
      date: {
        month: date.toLocaleDateString("default", { month: "short" }),
        day: date.toLocaleDateString("default", { day: "2-digit" }),
        year: date.getFullYear(),
      },
      name: routines[params.i].name,
      time: date.getTime(),
      weight: 0,
      exercises: [...routines[params.i].exercises],
    });

    navigation.navigate("WorkoutStack", { screen: "Workout" });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Routine</Text>
        <TouchableOpacity activeOpacity={0.3} onPress={handleEditPress}>
          <Icon name="square-edit-outline" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.routineContainer}>
        <Text style={styles.name}>{routines[params.i].name}</Text>
        <Text style={styles.created}>
          Created by
          <Text style={styles.creator}> {routines[params.i].creator}</Text>
        </Text>
        <TouchableOpacity activeOpacity={0.5} style={styles.startContainer} onPress={handleStartPress}>
          <Text style={styles.start}>Start Routine</Text>
        </TouchableOpacity>
        {routines[params.i].exercises.map((exercise, i) => (
          <RoutineExercise key={i} exercise={exercise} />
        ))}
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
  routineContainer: {
    padding: 16,
    backgroundColor: COLORS.black,
  },
  name: {
    color: COLORS.white,
    fontSize: 24,
  },
  created: {
    color: COLORS.gray,
    fontSize: 18,
  },
  creator: {
    color: COLORS.white,
  },
  startContainer: {
    marginVertical: 8,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  start: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Routine;
