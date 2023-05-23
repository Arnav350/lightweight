import { useContext, useState } from "react";
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
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { MealContext } from "../../hooks/useMeal";

import { TNutritionStackParamList } from "../../stacks/UserStack";
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

interface IMeal {
  name: string;
  foods: {
    name: string;
    calories: number;
    amount: number;
    amountType: string;
  }[];
}

function Repast({ navigation, route }: TProps) {
  const { meals, setMeals } = useContext(MealContext);

  const [mealName, setMealName] = useState<string>(
    route.params && route.params.i < meals.length
      ? meals[route.params.i].name
      : ""
  );

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

  function handleBlur() {
    setMeals(
      meals.map((meal: IMeal, i: number) =>
        !route.params || i == route.params.i
          ? { ...meal, name: mealName }
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
        <View style={styles.historyContainer}>
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
  historyContainer: {
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
