import { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TNutritionProps } from "../../stacks/UserStack";
import { IFood, IMeal } from "./Nutrition";
import { MealContext } from "../../hooks/useMeal";

import { COLORS } from "../../constants/theme";

function Create({ navigation, route: { params } }: TNutritionProps) {
  const { meals, setMeals } = useContext(MealContext);

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
  const [error, setError] = useState<boolean>(false);

  function handlePress() {
    if (currentFood.name && currentFood.calories) {
      setMeals(
        meals.map((meal: IMeal, i: number) =>
          params && i === params.i
            ? {
                ...meal,
                foods: [
                  ...meal.foods,
                  {
                    ...currentFood,
                    amount: currentFood.amount || 1,
                    amountType: currentFood.amountType || "amountZ",
                  },
                ],
              }
            : meal
        )
      );

      params && navigation.navigate("Repast", { i: params.i });
    } else {
      setError(true);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Quick Add</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="check" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.createContainer}>
        <Text numberOfLines={1} style={styles.name}>
          Meal:{" "}
          {meals.map(
            (meal: IMeal, i: number) => params && i === params.i && meal.name
          )}
        </Text>
        {error && (
          <Text style={styles.error}>Fill out the name and calories field</Text>
        )}
        <TextInput
          value={currentFood.name}
          placeholder="Food name"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          style={
            focusedInput === "name"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : styles.input
          }
          onChangeText={(text: string) =>
            setCurrentFood({ ...currentFood, name: text })
          }
          onFocus={() => setFocusedInput("name")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          value={currentFood.calories ? currentFood.calories.toString() : ""}
          placeholder="Calories"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          keyboardType="number-pad"
          style={
            focusedInput === "calories"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : styles.input
          }
          onChangeText={(text: string) =>
            setCurrentFood({ ...currentFood, calories: Number(text) })
          }
          onFocus={() => setFocusedInput("calories")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          value={currentFood.protein ? currentFood.protein.toString() : ""}
          placeholder="Protein (optional)"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          keyboardType="numeric"
          style={
            focusedInput === "protein"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : styles.input
          }
          onChangeText={(text: string) =>
            setCurrentFood({ ...currentFood, protein: Number(text) })
          }
          onFocus={() => setFocusedInput("protein")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          value={currentFood.fat ? currentFood.fat.toString() : ""}
          placeholder="Fat (optional)"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          keyboardType="numeric"
          style={
            focusedInput === "fat"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : styles.input
          }
          onChangeText={(text: string) =>
            setCurrentFood({ ...currentFood, fat: Number(text) })
          }
          onFocus={() => setFocusedInput("fat")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          value={currentFood.carbs ? currentFood.carbs.toString() : ""}
          placeholder="Carbs (optional)"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          keyboardType="numeric"
          style={
            focusedInput === "carbs"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : styles.input
          }
          onChangeText={(text: string) =>
            setCurrentFood({ ...currentFood, carbs: Number(text) })
          }
          onFocus={() => setFocusedInput("carbs")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          value={currentFood.amount ? currentFood.amount.toString() : ""}
          placeholder="Number of Servings (optional)"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          keyboardType="numeric"
          style={
            focusedInput === "number"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : styles.input
          }
          onChangeText={(text: string) =>
            setCurrentFood({ ...currentFood, amount: Number(text) })
          }
          onFocus={() => setFocusedInput("number")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          value={currentFood.amountType}
          placeholder="Serving Units (optional)"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          style={
            focusedInput === "unit"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : styles.input
          }
          onChangeText={(text: string) =>
            setCurrentFood({ ...currentFood, amountType: text })
          }
          onFocus={() => setFocusedInput("unit")}
          onBlur={() => setFocusedInput("none")}
        />
        <TouchableOpacity
          activeOpacity={0.2}
          style={styles.addContainer}
          onPress={handlePress}
        >
          <Text style={styles.add}>Add Food</Text>
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
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
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
  error: {
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
