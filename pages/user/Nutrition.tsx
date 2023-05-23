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
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { MealContext } from "../../hooks/useMeal";

import Macro from "../../components/nutrition/Macro";
import Meal from "../../components/nutrition/Meal";

import { TNutritionStackParamList } from "../../stacks/UserStack";

import { COLORS } from "../../constants/theme";

type TProps = StackScreenProps<TNutritionStackParamList>;

interface IMeal {
  name: string;
  foods: {
    name: string;
    calories: number;
    amount: number;
    amountType: string;
  }[];
}

const windowWidth = Dimensions.get("window").width;

function Nutrition(props: TProps) {
  const [mealName, setMealName] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const [slide, setSlide] = useState<number>(0);

  const { meals, setMeals } = useContext(MealContext);

  function handlePress() {
    setMeals([...meals, { name: mealName || "Meal Name", foods: [] }]);
    setMealName("");

    props.navigation.navigate("Repast", {
      i: meals.length,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.5}>
          <Icon name="chart-line" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Nutrition</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.nutritionContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) =>
            setSlide(event.nativeEvent.contentOffset.x / windowWidth)
          }
        >
          <View style={styles.sectionContainer}>
            <View style={styles.subheaderContainer}>
              <Text style={styles.subheader}>Macros</Text>
              <Icon name="plus" size={32} color={COLORS.white} />
            </View>
            <View style={styles.circlesContainer}>
              <Macro
                color="#d13636"
                current={10000}
                total={30000}
                unit="cal"
                label="Calories"
              />
              <Macro
                color="#d13636"
                current={50}
                total={60}
                unit="g"
                label="Protein"
              />
              <Macro
                color="#d13636"
                current={50}
                total={60}
                unit="g"
                label="Fat"
              />
              <Macro
                color="#d13636"
                current={50}
                total={60}
                unit="g"
                label="Carbs"
              />
              <Macro
                color="#d13636"
                current={50}
                total={60}
                unit="oz"
                label="Water"
              />
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
          <Icon
            name="circle"
            size={14}
            color={slide === 0 ? COLORS.darkGray : COLORS.blackOne}
          />
          <Icon
            name="circle"
            size={14}
            color={slide === 1 ? COLORS.darkGray : COLORS.blackOne}
          />
          <Icon
            name="circle"
            size={14}
            color={slide === 2 ? COLORS.darkGray : COLORS.blackOne}
          />
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
            style={
              focused
                ? { ...styles.input, borderBottomColor: COLORS.primary }
                : { ...styles.input }
            }
            onChangeText={setMealName}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <TouchableOpacity
            style={styles.inputButton}
            activeOpacity={0.5}
            onPress={handlePress}
          >
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
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
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
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
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
