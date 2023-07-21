import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../constants/theme";
import { TGymProps } from "../../pages/user/gym/Gym";
import { TNutritionProps } from "../../pages/user/nutrition/Nutrition";

interface IProps {
  navigate: TGymProps | TNutritionProps;
}

function ResumeWorkout(props: IProps) {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={() => {}}>
      <View style={styles.resumeContainer}>
        <Icon name="play" size={24} color={COLORS.white} />
        <Text style={styles.resume}>Resume Workout</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
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
