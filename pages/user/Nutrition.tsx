import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Macro from "../../components/nutrition/Macro";

import { COLORS } from "../../constants/theme";

function Nutrition() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Icon name="chart-line" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Nutrition</Text>
        <TouchableOpacity>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.nutritionContainer}>
        <View style={styles.macrosContainer}>
          <Text style={styles.subheader}>Macros</Text>
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
        <View>
          <Text>Weight</Text>
        </View>
        <View>
          <Text>Meals</Text>
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
    display: "flex",
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
  macrosContainer: {
    margin: 16,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
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
});

export default Nutrition;
