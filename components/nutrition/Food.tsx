import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { IFood, IMeal } from "../../pages/user/Nutrition";

import { COLORS } from "../../constants/theme";

interface IProps {
  food: IFood;
  currentMeal: IMeal;
  setCurrentMeal: Dispatch<SetStateAction<IMeal>>;
}

function Food({ food, currentMeal, setCurrentMeal }: IProps) {
  function handlePress() {
    setCurrentMeal({
      ...currentMeal,
      foods: currentMeal.foods.filter(
        (currentFood: IFood) => currentFood.name !== food.name
      ),
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {food.name}
        </Text>
        <Text style={styles.info}>
          {food.calories} cal - {food.amount} {food.amountType}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={handlePress}
      >
        <Icon name="minus" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  textContainer: {
    padding: 8,
    maxWidth: "80%",
  },
  name: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
  info: {
    color: COLORS.gray,
    fontSize: 14,
  },
  button: {
    margin: 8,
    padding: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
  },
});

export default Food;
