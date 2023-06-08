import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { IFood, IMeal } from "../../pages/user/Nutrition";

import { COLORS } from "../../constants/theme";

interface IProps {
  food: IFood;
  add: boolean;
  currentMeal: IMeal;
  setCurrentMeal: Dispatch<SetStateAction<IMeal>>;
}

function SelectFood({ food, add, currentMeal, setCurrentMeal }: IProps) {
  const [pressed, setPressed] = useState<boolean>(false);

  function handlePress() {
    if (add) {
      setCurrentMeal({
        ...currentMeal,
        foods: [...currentMeal.foods, food],
      });

      setPressed(true);
      setTimeout(() => {
        setPressed(false);
      }, 2000);
    } else {
      setCurrentMeal({
        ...currentMeal,
        foods: currentMeal.foods.filter((currentFood: IFood) => currentFood.name !== food.name),
      });
    }
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
        style={pressed ? { ...styles.button, backgroundColor: COLORS.white } : styles.button}
        onPress={handlePress}
      >
        <Icon
          name={pressed ? "check" : add ? "plus" : "minus"}
          size={24}
          color={pressed ? COLORS.primary : COLORS.white}
        />
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

export default SelectFood;
