import { StyleSheet, Text, View } from "react-native";

import { IDay, IMeal } from "../../pages/user/nutrition/Nutrition";
import { COLORS } from "../../constants/theme";

interface IProps {
  day: IDay;
}

function MacroMeal({ day: { date, meals } }: IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.month}>{date.toLocaleDateString("default", { month: "short" })}</Text>
        <Text style={styles.day}>{date.toLocaleDateString("default", { day: "2-digit" })}</Text>
      </View>
      <View style={styles.mealsContainer}>
        {meals.map((meal: IMeal, i: number) => (
          <View key={i}>
            <Text numberOfLines={1} style={styles.name}>
              {meal.name}
            </Text>
            <Text style={styles.foods}>{meal.foods.map((food) => food.name).join(", ")}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  dateContainer: {
    alignItems: "center",
    padding: 8,
  },
  month: {
    color: COLORS.white,
    fontSize: 18,
  },
  day: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  mealsContainer: {
    flexShrink: 1,
    gap: 8,
    padding: 8,
  },
  name: {
    color: COLORS.white,
    fontSize: 18,
  },
  foods: {
    color: COLORS.gray,
    fontSize: 16,
  },
});

export default MacroMeal;
