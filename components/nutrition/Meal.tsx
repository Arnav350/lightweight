import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { TNutritionStackParamList } from "../../stacks/UserStack";
import { IFood, IMeal } from "../../pages/user/Nutrition";

import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  meal: IMeal;
  navigate: StackScreenProps<TNutritionStackParamList>;
}

function Meal({ i, meal, navigate: { navigation } }: IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.header} numberOfLines={1}>
          {meal.name}
        </Text>
        <Text style={styles.total}>
          {!!meal.foods.length &&
            meal.foods.reduce(
              (total: number, { calories }) => (total += calories),
              0
            )}
        </Text>
      </View>
      {meal.foods.map((food: IFood, i: number) => (
        <View key={i} style={styles.mealContainer}>
          <View style={styles.leftContainer}>
            <Text numberOfLines={1} style={styles.name}>
              {food.name}
            </Text>
            <Text numberOfLines={1} style={styles.amount}>
              {food.amount} {food.amountType}
            </Text>
          </View>
          <Text style={styles.calories}>{food.calories}</Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate("Repast", {
            i: i,
            save: null,
          })
        }
      >
        <Text style={styles.buttonText}>Edit Meal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  header: {
    color: COLORS.white,
    fontSize: 18,
    maxWidth: "80%",
  },
  total: {
    color: COLORS.white,
    fontSize: 16,
  },
  mealContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  leftContainer: {
    maxWidth: "80%",
  },
  name: {
    color: COLORS.white,
    fontSize: 16,
  },
  amount: {
    color: COLORS.gray,
    fontSize: 14,
  },
  calories: {
    color: COLORS.white,
    fontSize: 16,
  },
  button: {
    margin: 8,
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Meal;
