import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";

import { IFood, IMeal } from "../../pages/user/nutrition/Nutrition";
import SelectFood from "./SelectFood";
import { COLORS } from "../../constants/theme";

interface IProps {
  setCurrentMeal: Dispatch<SetStateAction<IMeal>>;
  setCurrentHistories: Dispatch<SetStateAction<IFood[]>>;
  resultFoods: any[];
}

function SearchResults({ setCurrentMeal, setCurrentHistories, resultFoods }: IProps) {
  return (
    <View>
      <Text style={styles.text}>Search Results</Text>
      {resultFoods.map((resultFood: any, i: number) => (
        <SelectFood
          key={i}
          food={resultFood}
          add={true}
          setCurrentMeal={setCurrentMeal}
          setCurrentHistories={setCurrentHistories}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 16,
  },
});

export default SearchResults;
