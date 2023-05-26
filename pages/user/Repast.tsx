import { useContext, useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { MealContext } from "../../hooks/useMeal";
import { TNutritionStackParamList } from "../../stacks/UserStack";
import Food from "../../components/nutrition/Food";
import History from "../../components/nutrition/History";

import { COLORS } from "../../constants/theme";

type TProps = StackScreenProps<TNutritionStackParamList>;

interface IHistory {
  name: string;
  calories: number;
  amount: number;
  amountType: string;
}

type IHistories = IHistory[];

interface IFood {
  name: string;
  calories: number;
  amount: number;
  amountType: string;
}

interface IMeal {
  name: string;
  foods: IFood[];
}

function Repast({ navigation, route }: TProps) {
  const isFocused = useIsFocused();

  const { meals, setMeals } = useContext(MealContext);

  useEffect(() => {
    setMealName(
      route.params && route.params.i < meals.length
        ? meals[route.params.i].name
        : ""
    );
  }, [isFocused]);

  const [mealName, setMealName] = useState<string>("");

  const [histories, setHistories] = useState<IHistories>([
    {
      name: "Extra Virgin Olive Oil",
      calories: 460,
      amount: 4,
      amountType: "tbsp",
    },
    {
      name: "Pizza",
      calories: 600,
      amount: 2,
      amountType: "slices",
    },
  ]);

  async function handleBlur() {
    setMealName(mealName || "Meal Name");

    setMeals(
      meals.map((meal: IMeal, i: number) =>
        !route.params || i == route.params.i
          ? { ...meal, name: mealName || "Meal Name" }
          : meal
      )
    );
  }

  function handlePress() {
    Alert.alert(
      "Delete Meal?",
      `Are you sure you want to delete "${
        route.params && meals[route.params.i].name
      }"`,
      [
        {
          text: "Delete",
          onPress: () => {
            setMeals(
              meals.filter(
                (__, i: number) => !route.params || i !== route.params.i
              )
            );
            navigation.goBack();
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            value={mealName}
            placeholder="Meal Name"
            keyboardAppearance="dark"
            numberOfLines={1}
            style={styles.header}
            onChangeText={setMealName}
            onBlur={handleBlur}
          />
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
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
            <TouchableOpacity activeOpacity={0.5} style={styles.optionsButton}>
              <Icon name="cart-outline" size={48} color={COLORS.primary} />
              <Text style={styles.optionsText}>My Foods</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.optionsRow}>
            <TouchableOpacity activeOpacity={0.5} style={styles.optionsButton}>
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
          {(route.params && route.params.i < meals.length
            ? meals[route.params.i].foods
            : []
          ).map((food: any, i: number) => (
            <Food key={i} food={food} />
          ))}
        </View>
        <View style={styles.foodsContainer}>
          <Text style={styles.subheader}>History</Text>
          {histories.map((history: IHistory, i: number) => (
            <History key={i} history={history} />
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
