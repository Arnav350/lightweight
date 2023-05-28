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

import { COLORS } from "../../constants/theme";

function Add() {
  const [exerciseName, setExerciseName] = useState<string>("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.5}>
          <Icon name="close" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Add Exercise</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.inputContainer}>
          <Icon name="magnify" size={24} color={COLORS.gray} />
          <TextInput
            value={exerciseName}
            placeholder="Search exercise"
            placeholderTextColor={COLORS.gray}
            keyboardAppearance="dark"
            style={styles.input}
            onChangeText={setExerciseName}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity activeOpacity={0.5} style={styles.buttonContainer}>
            <Text style={styles.button}>Any Equipment</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.buttonContainer}>
            <Text style={styles.button}>Any Muscle</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.exercisesContainer}></ScrollView>
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
  optionsContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: COLORS.black,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  input: {
    marginLeft: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 4,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  button: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  exercisesContainer: {
    backgroundColor: COLORS.black,
  },
});

export default Add;
