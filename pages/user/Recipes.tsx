import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { TNutritionProps } from "../../stacks/UserStack";

import { COLORS } from "../../constants/theme";

function Recipes({ navigation, route: { params } }: TNutritionProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Recipes</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.blackTwo,
    flex: 1,
  },
});

export default Recipes;
