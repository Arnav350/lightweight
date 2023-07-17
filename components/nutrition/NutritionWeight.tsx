import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../constants/theme";

interface IMeasurement {
  data: number;
  date: Date;
}

const windowDimensions = Dimensions.get("window");

function NutritionWeight() {
  const date1 = new Date(2023, 6, 19);
  const date2 = new Date(2023, 7, 1);
  const date3 = new Date();

  const [weights, setWeights] = useState<IMeasurement[]>([
    { data: 140, date: date1 },
    { data: 145, date: date2 },
    { data: 152, date: date3 },
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Weight</Text>
        <Icon name="plus" size={32} color={COLORS.white} />
      </View>
      <View style={styles.weightContainer}>
        <LineChart
          data={{
            labels: weights.map((weight) => `${weight.date.getMonth()} ${weight.date.getDate()}`),
            datasets: [
              {
                data: weights.map((weight) => weight.data),
              },
            ],
          }}
          width={windowDimensions.width - 64}
          height={windowDimensions.height / 4}
          chartConfig={{
            backgroundGradientFrom: COLORS.primary,
            backgroundGradientTo: COLORS.primary,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: COLORS.primary,
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowDimensions.width - 32,
    margin: 16,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  header: {
    margin: 8,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  weightContainer: {
    padding: 8,
  },
});

export default NutritionWeight;
