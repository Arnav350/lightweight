import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { WorkoutContext } from "../../hooks/useWorkout";
import { TGymProps } from "../../pages/user/gym/Gym";
import { TNutritionProps } from "../../pages/user/nutrition/Nutrition";
import { initCurrentWorkout } from "../../constants/init";
import { COLORS } from "../../constants/theme";

interface IProps {
  navigateGym?: TGymProps;
  navigateNutrition?: TNutritionProps;
}

function ResumeWorkout({ navigateGym, navigateNutrition }: IProps) {
  const { setCurrentWorkout, resumeWorkout, setResumeWorkout } = useContext(WorkoutContext);

  function handlePress() {
    setCurrentWorkout(resumeWorkout);

    if (navigateGym) {
      navigateGym.navigation.navigate("Workout");
    } else if (navigateNutrition) {
      navigateNutrition.navigation.navigate("Workout");
    }

    setTimeout(() => setResumeWorkout({ ...initCurrentWorkout }), 500);
  }

  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={handlePress}>
      <View style={styles.resumeContainer}>
        <Icon name="play" size={24} color={COLORS.white} />
        <Text style={styles.resume}>Resume Workout</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: COLORS.black,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
  resumeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.blackTwo,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  resume: {
    color: COLORS.white,
    fontSize: 18,
  },
});

export default ResumeWorkout;
