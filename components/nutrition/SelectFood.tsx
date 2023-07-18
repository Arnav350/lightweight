import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { IFood, IMeal, INutritionSettings } from "../../pages/user/nutrition/Nutrition";

import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  food: IFood;
  add: boolean;
  setSettings: Dispatch<SetStateAction<INutritionSettings>>;
  setCurrentMeal: Dispatch<SetStateAction<IMeal>>;
  setCurrentHistories: Dispatch<SetStateAction<IFood[]>>;
}

function SelectFood({ i, food, add, setSettings, setCurrentMeal, setCurrentHistories }: IProps) {
  const [pressed, setPressed] = useState<boolean>(false);

  function handlePress() {
    if (add) {
      setCurrentMeal((prevCurrentMeal) => ({
        ...prevCurrentMeal,
        foods: [...prevCurrentMeal.foods, food],
      }));
      setCurrentHistories((prevCurrentHistories) => [
        food,
        ...prevCurrentHistories.filter(
          (currentFood: IFood) => currentFood.name !== food.name && currentFood.calories !== food.calories
        ),
      ]);

      setPressed(true);
      setTimeout(() => {
        setPressed(false);
      }, 2000);
    } else {
      setCurrentMeal((prevCurrentMeal) => ({
        ...prevCurrentMeal,
        foods: prevCurrentMeal.foods.filter((currentFood: IFood) => currentFood.name !== food.name),
      }));
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={() => setSettings((prevSettings) => ({ show: true, i: i }))}
    >
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
    </TouchableOpacity>
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
