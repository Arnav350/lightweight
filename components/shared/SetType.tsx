import { Dispatch, SetStateAction, useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { WorkoutContext } from "../../hooks/useWorkout";
import { ISet, IWorkoutSettings, TType } from "../../pages/workout/Workout";
import { COLORS } from "../../constants/theme";

interface IProps {
  settings: IWorkoutSettings;
  setSettings: Dispatch<SetStateAction<IWorkoutSettings>>;
}

function SetType({ settings, setSettings }: IProps) {
  const { currentWorkout, setCurrentWorkout } = useContext(WorkoutContext);

  const [showMeanings, setShowMeanings] = useState<boolean>(false);

  const setNumber: number = currentWorkout.exercises[settings.i].sets
    .slice(0, settings.j + 1)
    .filter((set: ISet) => set.type === "N").length;

  function handlePress(type: TType) {
    setCurrentWorkout((prevCurrentWorkout) => ({
      ...prevCurrentWorkout,
      exercises: prevCurrentWorkout.exercises.map((exercise, i) =>
        i === settings.i
          ? { ...exercise, sets: exercise.sets.map((set, j) => (j === settings.j ? { ...set, type } : set)) }
          : exercise
      ),
    }));

    setSettings((prevSettings) => ({ ...prevSettings, showType: false }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.typeContainer}>
        <View style={styles.typesContainer}>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => setSettings((prevSettings) => ({ ...prevSettings, showType: false }))}
          >
            <Icon name="close" size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3} onPress={() => handlePress("W")}>
            <Text style={styles.type}>W</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3} onPress={() => handlePress("N")}>
            <Text style={styles.type}>
              {currentWorkout.exercises[settings.i].sets[settings.j].type === "N" ? setNumber : setNumber + 1}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3} onPress={() => handlePress("D")}>
            <Text style={styles.type}>D</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3} onPress={() => handlePress("S")}>
            <Text style={styles.type}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3} onPress={() => setShowMeanings(!showMeanings)}>
            <Icon name="progress-question" size={32} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        {showMeanings && (
          <View style={styles.meaningsContainer}>
            <View style={styles.meaningContainer}>
              <Text style={styles.character}>W- </Text>
              <Text style={styles.meaning}>
                Warm Up sets are used at the beginning of an exercise with lighter weight
              </Text>
            </View>
            <View style={styles.meaningContainer}>
              <Text style={styles.character}>{settings.j + 1}- </Text>
              <Text style={styles.meaning}>Normal Sets should be used most of the time to build muscle</Text>
            </View>
            <View style={styles.meaningContainer}>
              <Text style={styles.character}>D- </Text>
              <Text style={styles.meaning}>
                Drop Sets are an extra set after the previous one with no rest in between
              </Text>
            </View>
            <View style={styles.meaningContainer}>
              <Text style={styles.character}>S- </Text>
              <Text style={styles.meaning}>
                Super Sets are an extra set of a different exercise after the original without rest
              </Text>
            </View>
          </View>
        )}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111111ee",
  },
  typeContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: COLORS.black,
    borderRadius: 16,
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  type: {
    width: 60,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  meaningsContainer: {
    marginVertical: 12,
  },
  meaningContainer: {
    flexDirection: "row",
    alignContent: "center",
  },
  character: {
    width: 40,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  meaning: {
    flex: 1,
    flexWrap: "wrap",
    marginVertical: 4,
    color: COLORS.white,
    fontSize: 16,
  },
});

export default SetType;
