import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { WorkoutContext } from "../../hooks/useWorkout";
import { TWorkoutProps } from "../../pages/workout/Workout";
import { TDesignProps } from "../../pages/user/gym/Design";
import ActionOptions from "./ActionOptions";
import { COLORS } from "../../constants/theme";

interface IProps {
  navigate: TWorkoutProps | TDesignProps;
}

function ExerciseActions({ navigate: { navigation } }: IProps) {
  const { setCurrentWorkout, settings, setSettings } = useContext(WorkoutContext);

  function handleReplacePress() {
    // FIX THIS
    // navigation.navigate("Exercises", { i: settings.i });

    setSettings((prevSettings) => ({ ...prevSettings, showOptions: false }));
  }

  function handleRemovePress() {
    setCurrentWorkout((prevCurrentWorkout) => ({
      ...prevCurrentWorkout,
      exercises: prevCurrentWorkout.exercises.filter((_exercise, i) => i !== settings.i),
    }));

    setSettings((prevSettings) => ({ ...prevSettings, showOptions: false }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <ActionOptions handlePress={() => {}} icon="reorder-horizontal" text="Reorder Exercises" />
        <ActionOptions handlePress={handleReplacePress} icon="find-replace" text="Replace Exercise" />
        <ActionOptions handlePress={handleRemovePress} icon="close" text="Remove Exercise" />
      </View>
      <View style={styles.optionsContainer}>
        <ActionOptions
          handlePress={() => setSettings((prevSettings) => ({ ...prevSettings, showOptions: false }))}
          text="Cancel"
        />
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
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#111111ee",
  },
  optionsContainer: {
    marginVertical: 8,
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackOne,
  },
  option: {
    marginLeft: 8,
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  remove: {
    marginLeft: 8,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "500",
  },
  cancel: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ExerciseActions;
