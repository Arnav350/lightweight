import { useContext } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TNutritionStackParamList } from "../../../stacks/UserStack";
import { NutritionContext } from "../../../hooks/useNutrition";
import { IMeasurement } from "./Nutrition";
import { COLORS } from "../../../constants/theme";

type TWeightProps = StackScreenProps<TNutritionStackParamList, "Weight">;

const windowDimensions = Dimensions.get("window");

function Weight({ navigation }: TWeightProps) {
  const { weights, setWeights } = useContext(NutritionContext);

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Edit Weights</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="notebook" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.weightContainer}>
        <LineChart
          data={{
            labels: weights.map(
              (weight) =>
                `${weight.date.toLocaleDateString("default", { month: "short" })} ${weight.date.toLocaleDateString(
                  "default",
                  { day: "2-digit" }
                )}`
            ),
            datasets: [
              {
                data: weights.length !== 0 ? weights.map((weight) => weight.data) : [1, 3, 5],
              },
            ],
          }}
          width={windowDimensions.width - 32}
          height={windowDimensions.height / 4}
          chartConfig={{
            backgroundGradientFrom: COLORS.blackOne,
            backgroundGradientTo: COLORS.blackOne,
            decimalPlaces: 0,
            color: (opacity = 1) => COLORS.primary + ("0" + Math.floor(opacity * 255).toString(16)).slice(-2),
            labelColor: () => COLORS.white,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: COLORS.blackOne,
            },
            propsForBackgroundLines: {
              stroke: COLORS.white + "30",
            },
          }}
          style={styles.chart}
        />
        <TouchableOpacity activeOpacity={0.5} style={styles.addContainer} onPress={() => navigation.goBack()}>
          <Text style={styles.add}>Add Weight</Text>
        </TouchableOpacity>
        <Text style={styles.subheader}>Entries</Text>
        <View style={styles.weightsContainer}>
          {weights.map((weight: IMeasurement, i: number) => (
            <View key={i} style={styles.measurementContainer}>
              <View>
                <Text style={styles.data}>{weight.data} lbs</Text>
                <Text style={styles.date}>{weight.date.toLocaleDateString()}</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.3}
                style={styles.trashContainer}
                onPress={() => setWeights((prevWeights) => prevWeights.filter((_prevWeight, j: number) => j !== i))}
              >
                <Icon name="trash-can-outline" size={32} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
  weightContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.black,
  },
  chart: {
    marginBottom: 8,
    borderRadius: 8,
  },
  addContainer: {
    marginBottom: 16,
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
  subheader: {
    marginBottom: 16,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  weightsContainer: {
    gap: 8,
  },
  measurementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  data: {
    color: COLORS.white,
    fontSize: 18,
  },
  date: {
    color: COLORS.gray,
    fontSize: 16,
  },
  trashContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
});

export default Weight;
