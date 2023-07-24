import { useContext, useEffect, useState } from "react";
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TNutritionStackParamList } from "../../../stacks/UserStack";
import { NutritionContext } from "../../../hooks/useNutrition";
import { IFood, IMeal, INutritionSettings } from "./Nutrition";
import SelectFood from "../../../components/nutrition/SelectFood";
import FoodInfo from "../../../components/nutrition/FoodInfo";
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

  const [mealSettings, setMealSettings] = useState<INutritionSettings>({ show: false, i: 0 });
  const [historySettings, setHistorySettings] = useState<INutritionSettings>({ show: false, i: 0 });

  useEffect(() => {
    setCurrentMeal({
      name: params.i < currentMeals.meals.length ? currentMeals.meals[params.i].name : "",
      foods: params.i < currentMeals.meals.length ? currentMeals.meals[params.i].foods : [],
    });
  }, [isFocused]);

  function handleNavigatePress(page: "left" | "recipes" | "create" | "search") {
    setCurrentMeals((prevCurrentMeals) => ({
      ...prevCurrentMeals,
      meals: prevCurrentMeals.meals.map((meal: IMeal, i: number) => (i === params.i ? currentMeal : meal)),
    }));

    setHistories((prevHistories) =>
      [...currentHistories, ...prevHistories.filter((food: IFood) => !currentHistories.includes(food))].splice(0, 50)
    );

    switch (page) {
      case "left":
        navigation.goBack();
        break;
      case "recipes":
        navigation.navigate("Recipe", { i: params.i, save: null });
        break;
      case "create":
        navigation.navigate("Create", { i: params.i, save: false });
        break;
      case "search":
        navigation.navigate("Search", { i: params.i, save: null });
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
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.optionsButton}
              onPress={() => handleNavigatePress("search")}
            >
              <Icon name="magnify" size={48} color={COLORS.primary} />
              <Text style={styles.optionsText}>Search Food</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.foodsContainer}>
          <Text style={styles.subheader}>Foods</Text>
          {currentMeal.foods.length ? (
            currentMeal.foods.map((food: IFood, i: number) => (
              <SelectFood
                key={i}
                i={i}
                food={food}
                add={false}
                setSettings={setMealSettings}
                setCurrentMeal={setCurrentMeal}
                setCurrentHistories={setCurrentHistories}
              />
            ))
          ) : (
            <Text style={styles.add}>
              Add a food item by pressing one of the buttons above {histories.length !== 0 && "or below"}
            </Text>
          )}
        </View>
        <View style={styles.foodsContainer}>
          {histories.length !== 0 && <Text style={styles.subheader}>History</Text>}
          {histories.slice(0, 10).map((history: IFood, i: number) => (
            <SelectFood
              key={i}
              i={i}
              food={history}
              add={true}
              setSettings={setHistorySettings}
              setCurrentMeal={setCurrentMeal}
              setCurrentHistories={setCurrentHistories}
            />
          ))}
        </View>
      </ScrollView>
      <Modal animationType="fade" transparent visible={mealSettings.show}>
        <FoodInfo
          foods={currentMeal.foods}
          add={false}
          settings={mealSettings}
          setSettings={setMealSettings}
          setCurrentMeal={setCurrentMeal}
          setCurrentHistories={setCurrentHistories}
        />
      </Modal>
      <Modal animationType="fade" transparent visible={historySettings.show}>
        <FoodInfo
          foods={histories.slice(0, 10)}
          add={true}
          settings={historySettings}
          setSettings={setHistorySettings}
          setCurrentMeal={setCurrentMeal}
          setCurrentHistories={setCurrentHistories}
        />
      </Modal>
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
    paddingVertical: 8,
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
  add: {
    marginTop: 16,
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Repast;
