import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { IFood, IMeal, INutritionSettings } from "../../pages/user/nutrition/Nutrition";
import { COLORS } from "../../constants/theme";

interface IProps {
  foods: IFood[];
  add: boolean;
  settings: INutritionSettings;
  setSettings: Dispatch<SetStateAction<INutritionSettings>>;
  setCurrentMeal: Dispatch<SetStateAction<IMeal>>;
  setCurrentHistories: Dispatch<SetStateAction<IFood[]>>;
}

interface IPercents {
  protein: number;
  carbs: number;
  fat: number;
}

function FoodInfo({ foods, add, settings, setSettings, setCurrentMeal, setCurrentHistories }: IProps) {
  const food: IFood = foods[settings.i];

  const percents: IPercents = {
    protein: +((food.protein * 400) / food.calories).toFixed(),
    carbs: +((food.carbs * 400) / food.calories).toFixed(),
    fat: +((food.fat * 900) / food.calories).toFixed(),
  };

  const [servings, setServings] = useState<number>(food.amount);

  function handlePress() {
    const multiplier: number = servings || food.amount;

    if (add) {
      setCurrentMeal((prevCurrentMeal) => ({
        ...prevCurrentMeal,
        foods: [
          ...prevCurrentMeal.foods,
          {
            ...food,
            calories: food.calories * multiplier,
            protein: food.protein * multiplier,
            fat: food.fat * multiplier,
            carbs: food.carbs * multiplier,
            amount: multiplier,
          },
        ],
      }));
      setCurrentHistories((prevCurrentHistories) => [
        {
          ...food,
          calories: food.calories * multiplier,
          protein: food.protein * multiplier,
          fat: food.fat * multiplier,
          carbs: food.carbs * multiplier,
          amount: multiplier,
        },
        ...prevCurrentHistories.filter(
          (currentFood: IFood) => currentFood.name !== food.name && currentFood.calories !== food.calories
        ),
      ]);
    } else {
      setCurrentMeal((prevCurrentMeal) => ({
        ...prevCurrentMeal,
        foods: prevCurrentMeal.foods.filter((currentFood: IFood) => currentFood.name !== food.name),
      }));
    }

    setSettings((prevSettings) => ({ ...prevSettings, showInfo: false }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => setSettings((prevSettings) => ({ ...prevSettings, showInfo: false }))}
          >
            <Icon name="close" size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.header}>{food.name}</Text>
          <TouchableOpacity activeOpacity={0.3} onPress={handlePress}>
            <Icon name="check" size={32} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.foodContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.subtitle}>Serving Size</Text>
            <Text style={styles.subtitle}>{food.amountType}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.subtitle}>Number of Servings</Text>
            <TextInput
              value={servings ? servings.toString() : ""}
              placeholder={food.amount.toString()}
              keyboardType="numeric"
              keyboardAppearance="dark"
              style={styles.input}
              onChangeText={(text) => setServings(Number(text))}
            />
          </View>
          <View>
            <View style={styles.macrosContainer}>
              <View style={styles.macroContainer}>
                <Text style={styles.percent}>{percents.protein}%</Text>
                <Text style={styles.grams}>{food.protein}</Text>
                <Text style={styles.subtitle}>Protein</Text>
              </View>
              <View style={styles.macroContainer}>
                <Text style={styles.percent}>{percents.carbs}%</Text>
                <Text style={styles.grams}>{food.carbs}</Text>
                <Text style={styles.subtitle}>Carbs</Text>
              </View>
              <View style={styles.macroContainer}>
                <Text style={styles.percent}>{percents.fat}%</Text>
                <Text style={styles.grams}>{food.fat}</Text>
                <Text style={styles.subtitle}>Fat</Text>
              </View>
            </View>
            <View style={styles.boxContainer}>
              <View style={[styles.macro, { width: percents.protein * 2.5 }]} />
              <View style={[styles.macro, { width: percents.carbs * 2.5 }]} />
              <View style={[styles.macro, { width: percents.fat * 2.5 }]} />
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.5} style={styles.buttonContainer} onPress={handlePress}>
            <Text style={styles.button}>{add ? "Add" : "Remove"} Food</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111111ee",
  },
  infoContainer: {
    margin: 16,
    padding: 12,
    backgroundColor: COLORS.black,
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  header: {
    margin: 8,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  foodContainer: {
    padding: 8,
  },
  rowContainer: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 16,
  },
  input: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 80,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    color: COLORS.white,
    fontSize: 16,
    textAlign: "right",
  },
  macrosContainer: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroContainer: {
    alignItems: "center",
    marginHorizontal: 16,
    width: 56,
  },
  percent: {
    color: COLORS.white,
    fontSize: 18,
  },
  grams: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "500",
  },
  boxContainer: {
    flexDirection: "row",
    paddingVertical: 4,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: COLORS.darkGray,
    alignSelf: "center",
  },
  macro: {
    marginHorizontal: 2,
    height: 16,
    backgroundColor: COLORS.primary,
  },
  buttonContainer: {
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  button: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default FoodInfo;
