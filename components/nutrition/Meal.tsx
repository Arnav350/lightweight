import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../constants/theme";

interface IFood {
  name: string;
  calories: number;
  amount: number;
  amountType: string;
}

type IFoods = IFood[];

function Meal() {
  const [foods, setFoods] = useState<IFoods>([
    {
      name: "Extra Virgin Olive Oil",
      calories: 460,
      amount: 4,
      amountType: "tbsp",
    },
    {
      name: "Pizza",
      calories: 600,
      amount: 2,
      amountType: "slices",
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.header}>Meal</Text>
        <Text style={styles.total}>
          {foods.reduce(
            (total: number, { calories }) => (total += calories),
            0
          )}
        </Text>
      </View>
      {foods.map((food: IFood, i: number) => (
        <View key={i} style={styles.mealContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.name}>{food.name}</Text>
            <Text style={styles.amount}>
              {food.amount} {food.amountType}
            </Text>
          </View>
          <Text style={styles.calories}>{food.calories}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button} activeOpacity={0.5}>
        <Text style={styles.buttonText}>Add Food</Text>
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
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  header: {
    color: COLORS.white,
    fontSize: 18,
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
  leftContainer: {},
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
