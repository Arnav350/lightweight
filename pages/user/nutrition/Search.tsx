import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { EDAMAM_ID, EDAMAM_KEY } from "@env";
import { NutritionContext } from "../../../hooks/useNutrition";
import SearchResults from "../../../components/nutrition/SearchResults";
import SearchSuggestions from "../../../components/nutrition/SearchSuggestions";
import { labelsList } from "../../../constants/init";
import { COLORS } from "../../../constants/theme";

type TProps = StackScreenProps<TNutritionStackParamList, "Search">;

interface IMeasure {
  label: string;
  uri: string;
  weight: number;
}

interface IHint {
  food: {
    category: string;
    categoryLabel: string;
    foodId: string;
    image: string;
    knownAs: string;
    label: string;
    nutrients: {
      CHOCDF: number;
      ENERC_KCAL: number;
      FAT: number;
      FIBTG: number | undefined;
      PROCNT: number;
    };
  };
  measures: IMeasure[];
}

function Search({ navigation, route: { params } }: TProps) {
  const isFocused = useIsFocused();

  const { currentMeals, setCurrentMeals, setHistories } = useContext(NutritionContext);

  const [foodName, setFoodName] = useState<string>("");
  const [currentMeal, setCurrentMeal] = useState<IMeal>({ name: "", foods: [] });
  const [currentHistories, setCurrentHistories] = useState<IFood[]>([]);
  const [suggestedFoods, setSuggestedFoods] = useState<string[]>([]);
  const [resultFoods, setResultFoods] = useState<IFood[]>([]);
  const [moreResults, setMoreResults] = useState<string>("");

  useEffect(() => {
    setCurrentMeal({
      name: currentMeals.meals[params.i].name,
      foods: currentMeals.meals[params.i].foods,
    });
  }, [isFocused]);

  async function handleBlur() {
    setSuggestedFoods([]);
    setResultFoods([]);
    setMoreResults("");

    if (foodName) {
      try {
        //WHY ISNT IT ONLY 5 RESULTS
        const data = await fetch(
          `https://api.edamam.com/auto-complete?app_id=${EDAMAM_ID}&app_key=${EDAMAM_KEY}&q=${foodName}&limit=5`
        );
        const response = await data.json();

        setSuggestedFoods(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleLeftPress() {
    setCurrentMeals((prevCurrentMeals) => ({
      ...prevCurrentMeals,
      meals: prevCurrentMeals.meals.map((meal: IMeal, i: number) => (i === params.i ? currentMeal : meal)),
    }));

    setHistories((prevHistories) =>
      [...currentHistories, ...prevHistories.filter((food) => !currentHistories.includes(food))].splice(0, 50)
    );

    navigation.goBack();
  }

  async function handleSearch(searchText: string) {
    if (foodName) {
      try {
        const response = await fetch(
          moreResults ||
            `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_ID}&app_key=${EDAMAM_KEY}&ingr=${searchText}&nutrition-type=cooking`
        );

        const { _links, hints } = await response.json();

        setMoreResults(_links?.next?.href || "");

        await Promise.all(
          hints.map(async (hint: IHint) => {
            const measure =
              hint.measures.find((measure: IMeasure) => !labelsList.includes(measure.label)) || hint.measures[1];

            const res = await fetch(
              `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${EDAMAM_ID}&app_key=${EDAMAM_KEY}`,
              {
                method: "POST",
                body: JSON.stringify({
                  ingredients: [
                    {
                      quantity: 1,
                      measureURI: measure.uri,
                      foodId: hint.food.foodId,
                    },
                  ],
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }
            );
            const {
              calories,
              totalNutrients: { PROCNT, FAT, CHOCDF },
            } = await res.json();

            setResultFoods((prevResultFoods) => [
              ...prevResultFoods,
              {
                name: hint.food.label,
                calories: calories,
                protein: +PROCNT.quantity.toFixed(2),
                fat: +FAT.quantity.toFixed(2),
                carbs: +CHOCDF.quantity.toFixed(2),
                amount: 1,
                amountType: measure.label,
              },
            ]);
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={handleLeftPress}>
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
            onBlur={handleBlur}
          />
        </View>
        {resultFoods.length ? (
          <SearchResults
            setCurrentMeal={setCurrentMeal}
            setCurrentHistories={setCurrentHistories}
            resultFoods={resultFoods}
          />
        ) : (
          <SearchSuggestions
            setCurrentMeal={setCurrentMeal}
            setCurrentHistories={setCurrentHistories}
            foodName={foodName}
            suggestedFoods={suggestedFoods}
            handleSearch={handleSearch}
          />
        )}
        {moreResults && (
          <TouchableOpacity activeOpacity={0.3} onPress={() => handleSearch("")}>
            <Text style={styles.more}>Show more...</Text>
          </TouchableOpacity>
        )}
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
    margin: 8,
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
  more: {
    marginVertical: 8,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "500",
    alignSelf: "center",
  },
});

export default Search;
