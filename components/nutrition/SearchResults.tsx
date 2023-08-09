import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

import SelectFood from "./SelectFood";
import FoodInfo from "./FoodInfo";
import { COLORS } from "../../constants/theme";

interface IProps {
  setCurrentMeal: Dispatch<SetStateAction<IMeal>>;
  setCurrentHistories: Dispatch<SetStateAction<IFood[]>>;
  //SHOULD NOT BE ANY
  resultFoods: any[];
}

function SearchResults({ setCurrentMeal, setCurrentHistories, resultFoods }: IProps) {
  const [settings, setSettings] = useState<INutritionSettings>({ show: false, i: 0 });

  return (
    <View>
      <Text style={styles.search}>Search Results</Text>
      {/* SHOULD NOT BE ANY */}
      {/* CHANGE THE KEY */}
      {resultFoods.map((resultFood: any, i: number) => (
        <SelectFood
          key={i}
          i={i}
          food={resultFood}
          add={true}
          setSettings={setSettings}
          setCurrentMeal={setCurrentMeal}
          setCurrentHistories={setCurrentHistories}
        />
      ))}
      <Modal animationType="fade" transparent visible={settings.show}>
        <FoodInfo
          foods={resultFoods}
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
  search: {
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 16,
  },
});

export default SearchResults;
