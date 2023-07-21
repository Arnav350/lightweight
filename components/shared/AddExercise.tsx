import { Dispatch, SetStateAction, useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TRootStackParamList } from "../../App";
import { WorkoutContext } from "../../hooks/useWorkout";
import { IExercise } from "../../pages/workout/Workout";
import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  workout: boolean;
  navigate: StackScreenProps<TRootStackParamList, "Exercises">;
  exercise: IExercise;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  setEditExercise: Dispatch<SetStateAction<IExercise | null>>;
}

function AddExercise({ i, workout, navigate: { navigation }, exercise, setShowEdit, setEditExercise }: IProps) {
  const { currentWorkout, setCurrentWorkout, currentRoutine, setCurrentRoutine } = useContext(WorkoutContext);

  function handleContainerPress() {
    setShowEdit(true);
    setEditExercise(exercise);
  }

  function handlePlusPress() {
    if (workout) {
      if (i === currentWorkout.exercises.length) {
        setCurrentWorkout((prevCurrentWorkout) => ({
          ...prevCurrentWorkout,
          exercises: [...prevCurrentWorkout.exercises, { ...exercise, sets: [exercise.sets[0]] }],
        }));
      } else {
        setCurrentWorkout((prevCurrentWorkout) => ({
          ...prevCurrentWorkout,
          exercises: prevCurrentWorkout.exercises.map((prevExercise, j) => (j === i ? exercise : prevExercise)),
        }));
      }
    } else {
      if (i === currentRoutine.exercises.length) {
        setCurrentRoutine((prevCurrentRoutine) => ({
          ...prevCurrentRoutine,
          exercises: [...prevCurrentRoutine.exercises, { ...exercise, sets: [exercise.sets[0]] }],
        }));
      } else {
        setCurrentRoutine((prevCurrentRoutine) => ({
          ...prevCurrentRoutine,
          exercises: prevCurrentRoutine.exercises.map((prevExercise, j) => (j === i ? exercise : prevExercise)),
        }));
      }
    }
    navigation.goBack();
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={i !== currentWorkout.exercises.length}
      style={styles.container}
      onPress={handleContainerPress}
    >
      <Image source={require("../../assets/logo.png")} style={styles.image} />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {exercise.name}
        </Text>
        <Text style={styles.specifier}>
          {exercise.muscle} - {exercise.equipment}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.5} style={styles.iconContainer} onPress={handlePlusPress}>
        <Icon name="plus" size={32} color={COLORS.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
  image: {
    marginVertical: 8,
    height: 64,
    width: 64,
    backgroundColor: COLORS.blackOne,
    borderRadius: 40,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    justifyContent: "center",
  },
  name: {
    width: "90%",
    marginBottom: 4,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
  specifier: {
    color: COLORS.gray,
    fontSize: 14,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    height: 40,
    width: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
});

export default AddExercise;
