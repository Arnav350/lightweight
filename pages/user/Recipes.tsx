import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TNutritionProps } from "../../stacks/UserStack";
import { NutritionContext } from "../../hooks/useNutrition";
import { IFood, IMeal } from "./Nutrition";
import SelectFood from "../../components/nutrition/SelectFood";
import { COLORS } from "../../constants/theme";

function Recipes({ navigation, route: { params } }: TNutritionProps) {
  const isFocused = useIsFocused();

  const { meals, setMeals, recipes, setRecipes } = useContext(NutritionContext);

  const [recipeName, setRecipeName] = useState<string>("");

  const [currentMeal, setCurrentMeal] = useState<IMeal>({ name: "", foods: [] });

  useEffect(() => {
    setCurrentMeal({
      name: params?.i ? meals[params.i].name : "",
      foods: params?.i ? meals[params.i].foods : [],
    });
  }, [isFocused]);

  function handlePress() {
    setMeals(meals.map((meal: IMeal, i: number) => (i === params?.i ? currentMeal : meal)));

    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={handlePress}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>My Recipes</Text>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => params && navigation.navigate("Create", { i: params.i, save: true })}
        >
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.recipesContainer}>
        <View style={styles.inputContainer}>
          <Icon name="magnify" size={24} color={COLORS.darkGray} />
          <TextInput
            value={recipeName}
            placeholder="Search recipe name"
            placeholderTextColor={COLORS.gray}
            keyboardAppearance="dark"
            style={styles.input}
            onChangeText={setRecipeName}
          />
        </View>
        <Text style={styles.text}>Recipes</Text>
        <ScrollView>
          {recipes
            .filter((recipe: IFood) => recipe.name.toLowerCase().includes(recipeName.toLowerCase()))
            .map((recipe: IFood, i: number) => (
              <SelectFood key={i} food={recipe} add={true} currentMeal={currentMeal} setCurrentMeal={setCurrentMeal} />
            ))}
          <View style={styles.orContainer}>
            <Text style={styles.or}>OR</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonContainer}
            onPress={() => params && navigation.navigate("Create", { i: params.i, save: true })}
          >
            <Text style={styles.button}>Create a New Recipe</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
  recipesContainer: {
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
  text: {
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  orContainer: {
    marginBottom: 16,
    width: 120,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
    alignSelf: "center",
  },
  or: {
    top: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.black,
    color: COLORS.gray,
    alignSelf: "center",
  },
  buttonContainer: {
    marginVertical: 8,
    paddingVertical: 8,
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

export default Recipes;
