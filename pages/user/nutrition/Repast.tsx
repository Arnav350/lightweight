import { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TNutritionStackParamList } from "../../../stacks/UserStack";
import { NutritionContext } from "../../../hooks/useNutrition";
import { IFood, IMeal } from "./Nutrition";
import SelectFood from "../../../components/nutrition/SelectFood";
import { COLORS } from "../../../constants/theme";

type TProps = StackScreenProps<TNutritionStackParamList, "Repast">;

function Repast({ navigation, route: { params } }: TProps) {
  const isFocused = useIsFocused();

  const { currentMeals, setCurrentMeals, histories, setHistories } = useContext(NutritionContext);

  const [currentMeal, setCurrentMeal] = useState<IMeal>({
    name: "",
    foods: [],
  });

  const [currentHistories, setCurrentHistories] = useState<IFood[]>([]);

  useEffect(() => {
    setCurrentMeal({
      name: params.i < currentMeals.meals.length ? currentMeals.meals[params.i].name : "",
      foods: params.i < currentMeals.meals.length ? currentMeals.meals[params.i].foods : [],
    });
  }, [isFocused]);

  function handleNavigatePress(page: "left" | "recipes" | "create") {
    setCurrentMeals((prevCurrentMeals) => ({
      ...prevCurrentMeals,
      meals: prevCurrentMeals.meals.map((meal: IMeal, i: number) => (i === params.i ? currentMeal : meal)),
    }));

    setHistories((prevHistories) =>
      [...currentHistories, ...prevHistories.filter((food: IFood) => !currentHistories.includes(food))].splice(0, 10)
    );

    switch (page) {
      case "left":
        navigation.goBack();
        break;
      case "recipes":
        navigation.navigate("Recipes", { i: params.i, save: null });
        break;
      case "create":
        navigation.navigate("Create", { i: params.i, save: false });
        break;
    }
  }

  function handleTrashPress() {
    Alert.alert("Delete Meal?", `Are you sure you want to delete "${currentMeal.name}"`, [
      {
        text: "Delete",
        onPress: () => {
          setCurrentMeals((prevCurrentMeals) => ({
            ...prevCurrentMeals,
            meals: prevCurrentMeals.meals.filter((_meal, i: number) => i !== params.i),
          }));
          navigation.goBack();
        },
        style: "destructive",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  }

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => handleNavigatePress("left")}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            value={currentMeal.name}
            placeholder="Meal Name"
            keyboardAppearance="dark"
            numberOfLines={1}
            style={styles.header}
            onChangeText={(text) => setCurrentMeal({ ...currentMeal, name: text })}
            onBlur={() =>
              setCurrentMeal({
                ...currentMeal,
                name: currentMeal.name || "Meal Name",
              })
            }
          />
        </View>
        <TouchableOpacity activeOpacity={0.3} onPress={handleTrashPress}>
          <Icon name="trash-can-outline" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.repastContainer}>
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <TouchableOpacity activeOpacity={0.5} style={styles.optionsButton}>
              <Icon name="barcode-scan" size={48} color={COLORS.primary} />
              <Text style={styles.optionsText}>Scan Barcode</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.optionsButton}
              onPress={() => handleNavigatePress("recipes")}
            >
              <Icon name="cart-outline" size={48} color={COLORS.primary} />
              <Text style={styles.optionsText}>My Recipes</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.optionsRow}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.optionsButton}
              onPress={() => handleNavigatePress("create")}
            >
              <Icon name="timer-outline" size={48} color={COLORS.primary} />
              <Text style={styles.optionsText}>Quick Add</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} style={styles.optionsButton}>
              <Icon name="magnify" size={48} color={COLORS.primary} />
              <Text style={styles.optionsText}>Search Food</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.foodsContainer}>
          <Text style={styles.subheader}>Foods</Text>
          {currentMeal.foods.map((food: IFood, i: number) => (
            <SelectFood
              key={i}
              food={food}
              add={false}
              setCurrentMeal={setCurrentMeal}
              setCurrentHistories={setCurrentHistories}
            />
          ))}
        </View>
        <View style={styles.foodsContainer}>
          {histories.length !== 0 && <Text style={styles.subheader}>History</Text>}
          {histories.map((history: IFood, i: number) => (
            <SelectFood
              key={i}
              food={history}
              add={true}
              setCurrentMeal={setCurrentMeal}
              setCurrentHistories={setCurrentHistories}
            />
          ))}
        </View>
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
  inputContainer: {
    paddingHorizontal: 20,
    maxWidth: "80%",
    backgroundColor: COLORS.black,
    borderRadius: 16,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 8,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  repastContainer: {
    backgroundColor: COLORS.black,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 12,
  },
  optionsRow: {
    flex: 1,
  },
  optionsButton: {
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORS.blackOne,
  },
  optionsText: {
    marginTop: 4,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
  foodsContainer: {
    padding: 16,
  },
  subheader: {
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
});

export default Repast;
