import { Dispatch, SetStateAction, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { EDAMAM_ID, EDAMAM_KEY } from "@env";
import { NutritionContext } from "../../hooks/useNutrition";
import { IFood, IMeal } from "../../pages/user/nutrition/Nutrition";
import SelectFood from "./SelectFood";
import { COLORS } from "../../constants/theme";

interface IProps {
  setCurrentMeal: Dispatch<SetStateAction<IMeal>>;
  setCurrentHistories: Dispatch<SetStateAction<IFood[]>>;
  foodName: string;
  suggestedFoods: string[];
  setResultFoods: Dispatch<SetStateAction<IFood[]>>;
}

function SearchSuggestions({ setCurrentMeal, setCurrentHistories, foodName, suggestedFoods, setResultFoods }: IProps) {
  const { histories } = useContext(NutritionContext);

  async function handleSearch(searchText: string) {
    if (foodName) {
      try {
        const data = await fetch(
          `https://api.edamam.com/api/food-database/v2/parser?session=0&app_id=${EDAMAM_ID}&app_key=${EDAMAM_KEY}&ingr=${searchText}&nutrition-type=cooking`
        );
        const { hints } = await data.json();

        setResultFoods(
          hints.map((hint: any) => ({
            name: hint.food.knownAs.charAt(0).toUpperCase() + hint.food.knownAs.slice(1).toLowerCase(),
            calories: +hint.food.nutrients.ENERC_KCAL.toFixed(2),
            protein: +hint.food.nutrients.PROCNT.toFixed(2),
            fat: +hint.food.nutrients.FAT.toFixed(2),
            carbs: +hint.food.nutrients.CHOCDF.toFixed(2),
            amount: hint.food.knownAs.charAt(0).toUpperCase() + hint.food.knownAs.slice(1).toLowerCase(),
            amountType: 1,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <View>
      {foodName && (
        <TouchableOpacity style={styles.allContainer} onPress={() => handleSearch(foodName)}>
          <View style={styles.whiteContainer}>
            <Icon name="magnify" size={24} color={COLORS.white} />
          </View>
          <Text style={styles.all}>Search all foods for: "{foodName}"</Text>
        </TouchableOpacity>
      )}
      {/* CHANGE THIS WHEN ITS ONLY 5 RESULTS */}
      {suggestedFoods.slice(0, 5).map((suggestedFood, i) => (
        <TouchableOpacity key={i} style={styles.allContainer} onPress={() => handleSearch(suggestedFood)}>
          <View style={styles.grayContainer}>
            <Icon name="magnify" size={24} color={COLORS.gray} />
          </View>
          <Text style={styles.all}>{suggestedFood}</Text>
        </TouchableOpacity>
      ))}
      {histories.filter((history) => history.name.toLowerCase().includes(foodName.toLowerCase())).length !== 0 && (
        <Text style={styles.subtitle}>History</Text>
      )}
      {histories
        .filter((history) => history.name.toLowerCase().includes(foodName.toLowerCase()))
        .slice(0, 10)
        .map((history, i) => (
          <SelectFood
            key={i}
            food={history}
            add={true}
            setCurrentMeal={setCurrentMeal}
            setCurrentHistories={setCurrentHistories}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  whiteContainer: {
    marginRight: 8,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 24,
  },
  grayContainer: {
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 24,
  },
  all: {
    color: COLORS.white,
    fontSize: 16,
  },
  subtitle: {
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 16,
  },
});

export default SearchSuggestions;
