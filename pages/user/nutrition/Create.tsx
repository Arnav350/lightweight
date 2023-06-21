import { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TNutritionStackParamList } from "../../../stacks/UserStack";
import { NutritionContext } from "../../../hooks/useNutrition";
import { IFood, IMeal } from "./Nutrition";
import { COLORS } from "../../../constants/theme";

type TProps = StackScreenProps<TNutritionStackParamList, "Create">;

function Create({ navigation, route: { params } }: TProps) {
  const { currentMeals, setCurrentMeals, recipes, setRecipes } = useContext(NutritionContext);

  const [focusedInput, setFocusedInput] = useState<string>("none");
  const [currentFood, setCurrentFood] = useState<IFood>({
    name: "",
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    amount: 0,
    amountType: "",
  });
  const [err, setErr] = useState<boolean>(false);

  function handlePress() {
    if (currentFood.calories && currentFood.name) {
      const tempFood: IFood = {
        ...currentFood,
        amount: currentFood.amount || 1,
        amountType: currentFood.amountType || "amount",
      };

      navigation.goBack();

      if (params.save) {
        if (recipes.filter((recipe) => recipe.name === tempFood.name).length > 0) {
          let i = 1;
          while (recipes.filter((recipe) => recipe.name === tempFood.name + ` (${i})`).length > 0) {
            i++;
          }
          setRecipes([...recipes, { ...tempFood, name: `${tempFood.name} (${i})` }]);
        } else {
          setRecipes([...recipes, { ...tempFood, name: tempFood.name }]);
        }
      } else {
        setCurrentMeals({
          ...currentMeals,
          meals: currentMeals.meals.map((meal: IMeal, i: number) =>
            i === params.i
              ? {
                  ...meal,
                  foods: [...meal.foods, tempFood],
                }
              : meal
          ),
        });
      }
    } else {
      setErr(true);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>{params.save ? "Create Recipe" : "Quick Add"}</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="check" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.createContainer}>
        {!params.save && (
          <Text numberOfLines={1} style={styles.name}>
            Meal: {currentMeals.meals.map((meal: IMeal, i: number) => i === params.i && meal.name)}
          </Text>
        )}
        {err && <Text style={styles.err}>Fill out the name and calories fields</Text>}
        <TextInput
          value={currentFood.name}
          placeholder="Food name"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          style={focusedInput === "name" ? { ...styles.input, borderBottomColor: COLORS.primary } : styles.input}
          onChangeText={(text: string) => setCurrentFood({ ...currentFood, name: text })}
          onFocus={() => setFocusedInput("name")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          value={currentFood.calories ? currentFood.calories.toString() : ""}
          placeholder="Calories"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          keyboardType="number-pad"
          style={focusedInput === "calories" ? { ...styles.input, borderBottomColor: COLORS.primary } : styles.input}
          onChangeText={(text: string) => setCurrentFood({ ...currentFood, calories: Number(text) })}
          onFocus={() => setFocusedInput("calories")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          value={currentFood.protein ? currentFood.protein.toString() : ""}
          placeholder="Protein (optional)"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          keyboardType="numeric"
          style={focusedInput === "protein" ? { ...styles.input, borderBottomColor: COLORS.primary } : styles.input}
          onChangeText={(text: string) => setCurrentFood({ ...currentFood, protein: Number(text) })}
          onFocus={() => setFocusedInput("protein")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          value={currentFood.fat ? currentFood.fat.toString() : ""}
          placeholder="Fat (optional)"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          keyboardType="numeric"
          style={focusedInput === "fat" ? { ...styles.input, borderBottomColor: COLORS.primary } : styles.input}
          onChangeText={(text: string) => setCurrentFood({ ...currentFood, fat: Number(text) })}
          onFocus={() => setFocusedInput("fat")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          value={currentFood.carbs ? currentFood.carbs.toString() : ""}
          placeholder="Carbs (optional)"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          keyboardType="numeric"
          style={focusedInput === "carbs" ? { ...styles.input, borderBottomColor: COLORS.primary } : styles.input}
          onChangeText={(text: string) => setCurrentFood({ ...currentFood, carbs: Number(text) })}
          onFocus={() => setFocusedInput("carbs")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          value={currentFood.amount ? currentFood.amount.toString() : ""}
          placeholder="Number of Servings (optional)"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          keyboardType="numeric"
          style={focusedInput === "number" ? { ...styles.input, borderBottomColor: COLORS.primary } : styles.input}
          onChangeText={(text: string) => setCurrentFood({ ...currentFood, amount: Number(text) })}
          onFocus={() => setFocusedInput("number")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          value={currentFood.amountType}
          placeholder="Serving Units (optional)"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          style={focusedInput === "unit" ? { ...styles.input, borderBottomColor: COLORS.primary } : styles.input}
          onChangeText={(text: string) => setCurrentFood({ ...currentFood, amountType: text })}
          onFocus={() => setFocusedInput("unit")}
          onBlur={() => setFocusedInput("none")}
        />
        <TouchableOpacity activeOpacity={0.2} style={styles.addContainer} onPress={handlePress}>
          <Text style={styles.add}>{params.save ? "Add Recipe" : "Quick Add"}</Text>
        </TouchableOpacity>
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
  createContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.black,
  },
  name: {
    marginBottom: 8,
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "500",
  },
  err: {
    marginVertical: 4,
    color: "#ff0000",
    fontSize: 16,
  },
  input: {
    marginBottom: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    color: COLORS.white,
    fontSize: 16,
  },
  addContainer: {
    marginTop: 8,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  add: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Create;
