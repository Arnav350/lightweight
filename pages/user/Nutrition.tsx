import { useContext, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TNutritionProps } from "../../stacks/UserStack";
import { NutritionContext } from "../../hooks/useNutrition";
import Macro from "../../components/nutrition/Macro";
import Meal from "../../components/nutrition/Meal";
import { COLORS } from "../../constants/theme";

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

const windowWidth = Dimensions.get("window").width;

function Nutrition(props: TNutritionProps) {
  const { meals, setMeals } = useContext(NutritionContext);
  const [mealName, setMealName] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const [slide, setSlide] = useState<number>(0);

  async function handlePress() {
    setMeals([...meals, { name: mealName || "Meal Name", foods: [] }]);
    setMealName("");

    props.navigation.navigate("Repast", {
      i: meals.length,
      save: null,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
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
                <Macro
                  current={meals.reduce(
                    (total: number, meal: IMeal) =>
                      (total += meal.foods.reduce((total: number, { calories }) => (total += calories), 0)),
                    0
                  )}
                  total={30000}
                  unit="cal"
                  label="Calories"
                />
                <Macro
                  current={meals.reduce(
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
                <Macro
                  current={meals.reduce(
                    (total: number, meal: IMeal) =>
                      (total += meal.foods.reduce((total: number, { protein }) => (total += protein), 0)),
                    0
                  )}
                  total={180}
                  unit="g"
                  label="Protein"
                />

                <Macro
                  current={meals.reduce(
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
        {meals.map((meal: IMeal, i: number) => (
          <Meal key={i} i={i} meal={meal} navigate={props} />
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
