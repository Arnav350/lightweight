import { useState } from "react";
import {
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

import { TNutritionStackParamList } from "../../stacks/UserStack";

import { COLORS } from "../../constants/theme";

type TProps = StackScreenProps<TNutritionStackParamList>;

interface IHistory {
  name: string;
  calories: number;
  amount: number;
  amountType: string;
}

type IHistories = IHistory[];

function Repast(props: TProps) {
  const [mealName, setMealName] = useState<string>("Meal Name");
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.goBack()}
        >
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>{props.route.params?.mealName}</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.repastContainer}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity activeOpacity={0.5} style={styles.optionsButton}>
            <Icon name="barcode-scan" size={48} color={COLORS.primary} />
            <Text style={styles.optionsText}>Scan Barcode</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.optionsButton}>
            <Icon name="basket-outline" size={48} color={COLORS.primary} />
            <Text style={styles.optionsText}>My Foods</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.optionsButton}>
            <Icon name="timer-outline" size={48} color={COLORS.primary} />
            <Text style={styles.optionsText}>Quick Add</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.optionsButton}>
            <Icon name="magnify" size={48} color={COLORS.primary} />
            <Text style={styles.optionsText}>Search Food</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>History</Text>
          {histories.map((history: IHistory, i: number) => (
            <View key={i}>
              <Text>{history.name}</Text>
              <Text>
                {history.calories} cal - {history.amount} {history.amountType}
              </Text>
              {true ? (
                <TouchableOpacity activeOpacity={0.5}>
                  <Icon size={32} color={COLORS.white} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={0.5}>
                  <Icon size={32} color={COLORS.white} />
                </TouchableOpacity>
              )}
            </View>
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
  header: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
});

export default Repast;
