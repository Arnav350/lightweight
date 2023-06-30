import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { WorkoutContext } from "../../hooks/useWorkout";
import { COLORS } from "../../constants/theme";
import { TSelectProps } from "../../pages/user/gym/Select";
import { initCurrentWorkout } from "../../constants/init";
import ActionOptions from "../shared/ActionOptions";

interface IProps {
  navigate: TSelectProps;
}

function RoutineActions({ navigate: { navigation } }: IProps) {
  const { setCurrentWorkout, routines, setRoutines, settings, setSettings } = useContext(WorkoutContext);

  function handleSharePress() {}

  function handleEditPress() {
    setCurrentWorkout({
      ...initCurrentWorkout,
      name: routines[settings.i].name,
      exercises: [...routines[settings.i].exercises],
    });

    setSettings((prevSettings) => ({ ...prevSettings, showOptions: false }));

    navigation.navigate("Design", { i: settings.i });
  }

  function handleRemovePress() {
    setRoutines((prevRoutines) => prevRoutines.filter((_prevRoutine, i) => i !== settings.i));

    setSettings((prevSettings) => ({ ...prevSettings, showOptions: false }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <ActionOptions handlePress={() => {}} icon="reorder-horizontal" text="Reorder Routines" />
        <ActionOptions handlePress={handleSharePress} icon="share" text="Share Routine" />
        <ActionOptions handlePress={handleEditPress} icon="find-replace" text="Edit Routine" />
        <ActionOptions handlePress={handleRemovePress} icon="close" text="Remove Routine" />
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

export default RoutineActions;
