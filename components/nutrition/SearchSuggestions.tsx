import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { NutritionContext } from "../../hooks/useNutrition";
import SelectFood from "./SelectFood";
import { COLORS } from "../../constants/theme";
import FoodInfo from "./FoodInfo";

interface IProps {
  setCurrentMeal: Dispatch<SetStateAction<IMeal>>;
  setCurrentHistories: Dispatch<SetStateAction<IFood[]>>;
  foodName: string;
  suggestedFoods: string[];
  handleSearch: (searchText: string) => {};
}

function SearchSuggestions({ setCurrentMeal, setCurrentHistories, foodName, suggestedFoods, handleSearch }: IProps) {
  const { histories } = useContext(NutritionContext);

  const filteredHistories = histories
    .filter(({ name }) => name.toLocaleLowerCase().includes(foodName.toLocaleLowerCase()))
    .slice(0, 10);

  const [settings, setSettings] = useState<INutritionSettings>({ show: false, i: 0 });

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
      {suggestedFoods.slice(0, 5).map((suggestedFood: string, i: number) => (
        <TouchableOpacity key={i} style={styles.allContainer} onPress={() => handleSearch(suggestedFood)}>
          <View style={styles.grayContainer}>
            <Icon name="magnify" size={24} color={COLORS.gray} />
          </View>
          <Text style={styles.all}>{suggestedFood}</Text>
        </TouchableOpacity>
      ))}
      {filteredHistories.length !== 0 && <Text style={styles.subtitle}>History</Text>}
      {!histories && <Text style={styles.no}>No previously eaten food items found</Text>}
      {filteredHistories.map((history: IFood, i: number) => (
        <SelectFood
          key={i}
          i={i}
          food={history}
          add={true}
          setSettings={setSettings}
          setCurrentMeal={setCurrentMeal}
          setCurrentHistories={setCurrentHistories}
        />
      ))}
      <Modal animationType="fade" transparent visible={settings.show}>
        <FoodInfo
          foods={filteredHistories}
          add={true}
          settings={settings}
          setSettings={setSettings}
          setCurrentMeal={setCurrentMeal}
          setCurrentHistories={setCurrentHistories}
        />
      </Modal>
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
  no: {
    marginTop: 8,
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default SearchSuggestions;
