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
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Macro from "../../components/nutrition/Macro";
import Meal from "../../components/nutrition/Meal";

import { COLORS } from "../../constants/theme";

function Nutrition() {
  const [mealName, setMealName] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

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
        {/* <View style={styles.sectionContainer}>
          <View style={styles.subheaderContainer}>
            <Text style={styles.subheader}>Weight</Text>
            <Icon name="plus" size={32} color={COLORS.white} />
          </View>
        </View> */}
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
          <TouchableOpacity style={styles.inputButton}>
            <Text style={styles.inputText}>Add Meal</Text>
          </TouchableOpacity>
        </View>
        <Meal />
        <Meal />
        <Meal />
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
  sectionContainer: {
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
