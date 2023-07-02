import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TNutritionStackParamList } from "../../../stacks/UserStack";
import { NutritionContext } from "../../../hooks/useNutrition";
import { IFood, IMeal } from "./Nutrition";
import SelectFood from "../../../components/nutrition/SelectFood";
import { COLORS } from "../../../constants/theme";

type TProps = StackScreenProps<TNutritionStackParamList, "Search">;

function Search({ navigation, route: { params } }: TProps) {
  const isFocused = useIsFocused();

  const { currentMeals, setCurrentMeals, histories, setHistories } = useContext(NutritionContext);

  const [foodName, setFoodName] = useState<string>("");
  const [currentMeal, setCurrentMeal] = useState<IMeal>({ name: "", foods: [] });
  const [currentHistories, setCurrentHistories] = useState<IFood[]>([]);

  useEffect(() => {
    setCurrentMeal({
      name: currentMeals.meals[params.i].name,
      foods: currentMeals.meals[params.i].foods,
    });
  }, [isFocused]);

  function handlePress() {
    setCurrentMeals((prevCurrentMeals) => ({
      ...prevCurrentMeals,
      meals: prevCurrentMeals.meals.map((meal: IMeal, i: number) => (i === params.i ? currentMeal : meal)),
    }));

    setHistories((prevHistories) =>
      [...currentHistories, ...prevHistories.filter((food) => !currentHistories.includes(food))].splice(0, 50)
    );

    navigation.goBack();
  }

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={handlePress}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Search Food</Text>
        <Icon name="water" size={32} color={COLORS.primary} />
      </View>
      <ScrollView style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Icon name="magnify" size={24} color={COLORS.darkGray} />
          <TextInput
            value={foodName}
            placeholder="Search food name"
            placeholderTextColor={COLORS.gray}
            keyboardAppearance="dark"
            returnKeyType="search"
            style={styles.input}
            onChangeText={setFoodName}
          />
        </View>
        <Text style={styles.subtitle}>History</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blackTwo,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackTwo,
  },
  header: {
    paddingVertical: 8,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  searchContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.black,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  subtitle: {
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 16,
  },
});

export default Search;
