import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { IWorkoutSettings } from "../../pages/workout/Workout";
import { COLORS } from "../../constants/theme";

interface IProps {
  setSettings: Dispatch<SetStateAction<IWorkoutSettings>>;
}

function ExerciseOptions({ setSettings }: IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <TouchableHighlight underlayColor={COLORS.gray} onPress={() => {}}>
          <View style={styles.optionContainer}>
            <Icon name="reorder-horizontal" size={32} color={COLORS.white} />
            <Text style={styles.option}>Reorder Exercises</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={COLORS.gray} onPress={() => {}}>
          <View style={styles.optionContainer}>
            <Icon name="find-replace" size={32} color={COLORS.white} />
            <Text style={styles.option}>Replace Exercise</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={COLORS.gray} onPress={() => {}}>
          <View style={styles.optionContainer}>
            <Icon name="close" size={32} color={COLORS.primary} />
            <Text style={styles.remove}>Remove Exercise</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableHighlight
          underlayColor={COLORS.gray}
          onPress={() => setSettings((prevSettings) => ({ ...prevSettings, showOptions: false }))}
        >
          <View style={styles.optionContainer}>
            <Text style={styles.cancel}>Cancel</Text>
          </View>
        </TouchableHighlight>
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

export default ExerciseOptions;
