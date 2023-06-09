import { Dispatch, SetStateAction, useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TWorkoutStackParamList } from "../../stacks/WorkoutStack";
import { WorkoutContext } from "../../hooks/useWorkout";
import { IExercise } from "../../pages/workout/Workout";
import { COLORS } from "../../constants/theme";

interface IProps {
  exercise: IExercise;
  navigate: StackScreenProps<TWorkoutStackParamList>;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
}

function Activity({ exercise, navigate: { navigation }, setShowEdit }: IProps) {
  const { currentWorkout, setCurrentWorkout } = useContext(WorkoutContext);

  function handlePress() {
    setCurrentWorkout({ ...currentWorkout, exercises: [...currentWorkout.exercises, exercise] });
    navigation.goBack();
  }

  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={() => setShowEdit(true)}>
      <Image source={require("../../assets/logo.png")} style={styles.image} />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {exercise.name}
        </Text>
        <Text style={styles.specifier}>
          {exercise.muscle} - {exercise.equipment}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.5} style={styles.iconContainer} onPress={handlePress}>
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

export default Activity;
