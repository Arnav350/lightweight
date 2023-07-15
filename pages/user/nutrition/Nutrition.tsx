import { useContext, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TNutritionStackParamList } from "../../../stacks/UserStack";
import { NutritionContext } from "../../../hooks/useNutrition";
import MacroCircle from "../../../components/nutrition/MacroCircle";
import NutritionMeal from "../../../components/nutrition/NutritionMeal";
import { COLORS } from "../../../constants/theme";

export type TNutritionProps = StackScreenProps<TNutritionStackParamList, "Nutrition">;

export interface IFood {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  amount: number;
  amountType: string;
}

export interface IMeal {
  name: string;
  foods: IFood[];
}

export interface IDay {
  date: number;
  meals: IMeal[];
}

export interface INutritionSettings {
  showInfo: boolean;
  i: number;
}

const windowWidth = Dimensions.get("window").width;

function Nutrition(props: TNutritionProps) {
  const { navigation } = props;

  const { currentMeals, setCurrentMeals } = useContext(NutritionContext);
  const [mealName, setMealName] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const [slide, setSlide] = useState<number>(0);

  function handlePress() {
    const name: string = mealName.trim() || "Untitled Workout";
    if (currentMeals.meals.filter((currentMeal) => currentMeal.name === name).length > 0) {
      let i = 1;
      while (currentMeals.meals.filter((currentMeal) => currentMeal.name === name + ` (${i})`).length > 0) {
        i++;
      }
      setCurrentMeals((prevCurrentMeals) => ({
        ...prevCurrentMeals,
        meals: [...prevCurrentMeals.meals, { name: `${mealName} (${i})`, foods: [] }],
      }));
    } else {
      setCurrentMeals((prevCurrentMeals) => ({
        ...prevCurrentMeals,
        meals: [...prevCurrentMeals.meals, { name: mealName, foods: [] }],
      }));
    }

    setMealName("");

    navigation.navigate("Repast", {
      i: currentMeals.meals.length,
      save: null,
    });
  }

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="chart-line" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Nutrition</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.nutritionContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => setSlide(event.nativeEvent.contentOffset.x / windowWidth)}
        >
          <View style={styles.sectionContainer}>
            <View style={styles.subheaderContainer}>
              <Text style={styles.subheader}>Macros</Text>
              <Icon name="plus" size={32} color={COLORS.white} />
            </View>
            <View style={styles.circlesContainer}>
              <View>
                <MacroCircle
                  current={currentMeals.meals.reduce(
                    (total: number, meal: IMeal) =>
                      (total += meal.foods.reduce((total: number, { calories }) => (total += calories), 0)),
                    0
                  )}
                  total={30000}
                  unit="cal"
                  label="Calories"
                />
                <MacroCircle
                  current={currentMeals.meals.reduce(
                    (total: number, meal: IMeal) =>
                      (total += meal.foods.reduce((total: number, { fat }) => (total += fat), 0)),
                    0
                  )}
                  total={80}
                  unit="g"
                  label="Fat"
                />
              </View>
              <View>
                <MacroCircle
                  current={currentMeals.meals.reduce(
                    (total: number, meal: IMeal) =>
                      (total += meal.foods.reduce((total: number, { protein }) => (total += protein), 0)),
                    0
                  )}
                  total={180}
                  unit="g"
                  label="Protein"
                />

                <MacroCircle
                  current={currentMeals.meals.reduce(
                    (total: number, meal: IMeal) =>
                      (total += meal.foods.reduce((total: number, { carbs }) => (total += carbs), 0)),
                    0
                  )}
                  total={180}
                  unit="g"
                  label="Carbs"
                />
              </View>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.subheaderContainer}>
              <Text style={styles.subheader}>Weight</Text>
              <Icon name="plus" size={32} color={COLORS.white} />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.subheaderContainer}>
              <Text style={styles.subheader}>Steps</Text>
              <Icon name="plus" size={32} color={COLORS.white} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.dotsContainer}>
          <Icon name="circle" size={14} color={slide === 0 ? COLORS.darkGray : COLORS.blackOne} />
          <Icon name="circle" size={14} color={slide === 1 ? COLORS.darkGray : COLORS.blackOne} />
          <Icon name="circle" size={14} color={slide === 2 ? COLORS.darkGray : COLORS.blackOne} />
        </View>
        <View style={styles.subheaderContainer}>
          <Text style={styles.subheader}>Meals</Text>
        </View>
        <View style={styles.sectionContainer}>
          <TextInput
            value={mealName}
            placeholder="Meal Name..."
            placeholderTextColor={COLORS.gray}
            keyboardAppearance="dark"
            style={focused ? { ...styles.input, borderBottomColor: COLORS.primary } : { ...styles.input }}
            onChangeText={setMealName}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <TouchableOpacity style={styles.inputButton} activeOpacity={0.5} onPress={handlePress}>
            <Text style={styles.inputText}>Add Meal</Text>
          </TouchableOpacity>
        </View>
        {currentMeals.meals.map((meal: IMeal, i: number) => (
          <NutritionMeal key={meal.name} i={i} meal={meal} navigate={props} />
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
  nutritionContainer: {
    backgroundColor: COLORS.black,
  },
  sectionContainer: {
    width: windowWidth - 32,
    margin: 16,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  subheaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  subheader: {
    margin: 8,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  circlesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  input: {
    margin: 8,
    padding: 8,
    fontSize: 16,
    color: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  inputButton: {
    margin: 8,
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  inputText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Nutrition;
