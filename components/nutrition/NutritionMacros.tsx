import { useContext } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { NutritionContext } from "../../hooks/useNutrition";
import { TNutritionProps } from "../../pages/user/nutrition/Nutrition";
import MacroCircle from "./MacroCircle";
import { COLORS } from "../../constants/theme";

interface IProps {
  navigate: TNutritionProps;
}

const windowWidth = Dimensions.get("window").width;

function NutritionMacros({ navigate: { navigation } }: IProps) {
  const { currentMeals, macros } = useContext(NutritionContext);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Macros</Text>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.navigate("Macro")}>
          <Icon name="dots-horizontal" size={32} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.circlesContainer}>
        <View>
          <MacroCircle
            current={
              +currentMeals.meals
                .reduce(
                  (total: number, meal: IMeal) =>
                    (total += meal.foods.reduce((total: number, { calories }) => (total += calories), 0)),
                  0
                )
                .toFixed()
            }
            total={macros.calories}
            unit="cal"
            label="Calories"
          />
          <MacroCircle
            current={
              +currentMeals.meals
                .reduce(
                  (total: number, meal: IMeal) =>
                    (total += meal.foods.reduce((total: number, { fat }) => (total += fat), 0)),
                  0
                )
                .toFixed()
            }
            total={macros.fat}
            unit="g"
            label="Fat"
          />
        </View>
        <View>
          <MacroCircle
            current={
              +currentMeals.meals
                .reduce(
                  (total: number, meal: IMeal) =>
                    (total += meal.foods.reduce((total: number, { protein }) => (total += protein), 0)),
                  0
                )
                .toFixed()
            }
            total={macros.protein}
            unit="g"
            label="Protein"
          />

          <MacroCircle
            current={
              +currentMeals.meals
                .reduce(
                  (total: number, meal: IMeal) =>
                    (total += meal.foods.reduce((total: number, { carbs }) => (total += carbs), 0)),
                  0
                )
                .toFixed()
            }
            total={macros.carbs}
            unit="g"
            label="Carbs"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 32,
    margin: 16,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  header: {
    margin: 8,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  circlesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NutritionMacros;
