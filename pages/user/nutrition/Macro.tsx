import { useContext, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { NutritionContext } from "../../../hooks/useNutrition";
import MacroMeal from "../../../components/nutrition/MacroMeal";
import { COLORS } from "../../../constants/theme";

type TMacroProps = StackScreenProps<TNutritionStackParamList, "Macro">;

function Macro({ navigation }: TMacroProps) {
  const { meals, setMeals, macros, setMacros } = useContext(NutritionContext);

  const [currentMacros, setCurrentMacros] = useState<IMacros>(
    macros.percent
      ? {
          ...macros,
          protein: +((macros.protein * 400) / macros.calories).toFixed(),
          fat: +((macros.fat * 900) / macros.calories).toFixed(),
          carbs: +((macros.carbs * 400) / macros.calories).toFixed(),
        }
      : macros
  );
  const [focusedInput, setFocusedInput] = useState<string>("none");
  const [err, setErr] = useState<boolean>(false);

  function handlePress() {
    if (currentMacros.percent) {
      if (currentMacros.protein + currentMacros.fat + currentMacros.carbs === 100) {
        setMacros({
          ...currentMacros,
          protein: Math.round((currentMacros.protein * currentMacros.calories) / 400),
          fat: Math.round((currentMacros.fat * currentMacros.calories) / 900),
          carbs: Math.round((currentMacros.carbs * currentMacros.calories) / 400),
        });
        navigation.goBack();
      } else {
        setErr(true);
      }
    } else {
      if (currentMacros.protein * 4 + currentMacros.fat * 9 + currentMacros.carbs * 4 === currentMacros.calories) {
        setMacros(currentMacros);
        navigation.goBack();
      } else {
        setErr(true);
      }
    }
  }

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Macros</Text>
        <TouchableOpacity activeOpacity={0.3} onPress={handlePress}>
          <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.macroContainer}>
        {err &&
          (currentMacros.percent ? (
            <Text style={styles.error}>Percents must add up to 100%</Text>
          ) : (
            <Text style={styles.error}>Macros must add up to {currentMacros.calories}</Text>
          ))}
        <View
          style={
            focusedInput === "calories"
              ? { ...styles.fieldContainer, borderBottomColor: COLORS.primary }
              : styles.fieldContainer
          }
        >
          <Text style={styles.label}>Calories: </Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={currentMacros.calories ? currentMacros.calories.toString() : ""}
              placeholder={macros.calories.toString()}
              placeholderTextColor={COLORS.gray}
              keyboardAppearance="dark"
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={(text: string) =>
                setCurrentMacros((prevCurrentMacros) => ({ ...prevCurrentMacros, calories: Number(text) }))
              }
              onFocus={() => setFocusedInput("calories")}
              onBlur={() => setFocusedInput("none")}
            />
            <Text style={styles.suffix}>cal</Text>
          </View>
        </View>
        <View
          style={
            focusedInput === "protein"
              ? { ...styles.fieldContainer, borderBottomColor: COLORS.primary }
              : styles.fieldContainer
          }
        >
          <Text style={styles.label}>Protein: </Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={currentMacros.protein ? currentMacros.protein.toString() : ""}
              placeholder={macros.protein.toString()}
              placeholderTextColor={COLORS.gray}
              keyboardAppearance="dark"
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={(text: string) =>
                setCurrentMacros((prevCurrentMacros) => ({ ...prevCurrentMacros, protein: Number(text) }))
              }
              onFocus={() => setFocusedInput("protein")}
              onBlur={() => setFocusedInput("none")}
            />
            <Text style={styles.suffix}> {currentMacros.percent ? "%" : " g"}</Text>
          </View>
        </View>
        <View
          style={
            focusedInput === "fat"
              ? { ...styles.fieldContainer, borderBottomColor: COLORS.primary }
              : styles.fieldContainer
          }
        >
          <Text style={styles.label}>Fat: </Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={currentMacros.fat ? currentMacros.fat.toString() : ""}
              placeholder={macros.fat.toString()}
              placeholderTextColor={COLORS.gray}
              keyboardAppearance="dark"
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={(text: string) =>
                setCurrentMacros((prevCurrentMacros) => ({ ...prevCurrentMacros, fat: Number(text) }))
              }
              onFocus={() => setFocusedInput("fat")}
              onBlur={() => setFocusedInput("none")}
            />
            <Text style={styles.suffix}> {currentMacros.percent ? "%" : " g"}</Text>
          </View>
        </View>
        <View
          style={
            focusedInput === "carbs"
              ? { ...styles.fieldContainer, borderBottomColor: COLORS.primary }
              : styles.fieldContainer
          }
        >
          <Text style={styles.label}>Carbs: </Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={currentMacros.carbs ? currentMacros.carbs.toString() : ""}
              placeholder={macros.carbs.toString()}
              placeholderTextColor={COLORS.gray}
              keyboardAppearance="dark"
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={(text: string) =>
                setCurrentMacros((prevCurrentMacros) => ({ ...prevCurrentMacros, carbs: Number(text) }))
              }
              onFocus={() => setFocusedInput("carbs")}
              onBlur={() => setFocusedInput("none")}
            />
            <Text style={styles.suffix}> {currentMacros.percent ? "%" : " g"}</Text>
          </View>
        </View>
        {currentMacros.percent ? (
          <Text style={styles.calculation}>
            {currentMacros.protein}% + {currentMacros.fat}% + {currentMacros.carbs}% ={" "}
            {currentMacros.protein + currentMacros.fat + currentMacros.carbs}%
          </Text>
        ) : (
          <Text style={styles.calculation}>
            {currentMacros.protein}g <Text style={styles.multiplier}>x 4</Text> + {currentMacros.fat}g{" "}
            <Text style={styles.multiplier}>x 9</Text> + {currentMacros.carbs}g{" "}
            <Text style={styles.multiplier}>x 4</Text> ={" "}
            {currentMacros.protein * 4 + currentMacros.fat * 9 + currentMacros.carbs * 4}cal
          </Text>
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.optionsContainer}
          onPress={() =>
            setCurrentMacros((prevCurrentMacros) => ({ ...prevCurrentMacros, percent: !prevCurrentMacros.percent }))
          }
        >
          <View
            style={
              currentMacros.percent
                ? [styles.optionContainer, { backgroundColor: COLORS.primary }]
                : styles.optionContainer
            }
          >
            <Text style={styles.option}>Percent</Text>
          </View>
          <View
            style={
              currentMacros.percent
                ? styles.optionContainer
                : [styles.optionContainer, { backgroundColor: COLORS.primary }]
            }
          >
            <Text style={styles.option}>Grams</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.subheader}>Meals</Text>
        <FlatList
          data={meals}
          renderItem={({ item }) => <MacroMeal key={item.date.toString()} day={item} />}
          style={styles.mealsContainer}
        />
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
    margin: 8,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  save: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "500",
  },
  macroContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    padding: 16,
  },
  error: {
    color: "#f00",
  },
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
  label: {
    color: COLORS.white,
    fontSize: 18,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 8,
    color: COLORS.white,
    fontSize: 16,
    textAlign: "right",
  },
  suffix: {
    color: COLORS.gray,
    fontSize: 16,
  },
  calculation: {
    marginBottom: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  multiplier: {
    color: COLORS.gray,
  },
  optionsContainer: {
    flexDirection: "row",
    width: 192,
    borderRadius: 8,
    backgroundColor: COLORS.blackOne,
    overflow: "hidden",
  },
  optionContainer: {
    paddingVertical: 8,
    width: 96,
  },
  option: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
  subheader: {
    marginVertical: 16,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  mealsContainer: {
    marginVertical: -4,
  },
});

export default Macro;
