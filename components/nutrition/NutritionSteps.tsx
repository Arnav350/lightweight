import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../constants/theme";

const windowWidth = Dimensions.get("window").width;

function NutritionSteps() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Steps</Text>
        <Icon name="plus" size={32} color={COLORS.white} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 32,
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
});

export default NutritionSteps;
