import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { NutritionContext } from "../../hooks/useNutrition";
import { IMeasurement } from "../../pages/user/nutrition/Nutrition";
import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  weight: IMeasurement;
}

function WeightList({ i, weight: { data, date } }: IProps) {
  const { setWeights } = useContext(NutritionContext);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.data}>{data} lbs</Text>
        <Text style={styles.date}>
          {date.toLocaleDateString("default", { month: "short" })} {date.getDate()}, {date.getFullYear()}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.3}
        style={styles.trashContainer}
        onPress={() => setWeights((prevWeights) => prevWeights.filter((_prevWeight, j: number) => j !== i))}
      >
        <Icon name="trash-can-outline" size={32} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    padding: 16,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  data: {
    color: COLORS.white,
    fontSize: 18,
  },
  date: {
    color: COLORS.gray,
    fontSize: 16,
  },
  trashContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
});

export default WeightList;
