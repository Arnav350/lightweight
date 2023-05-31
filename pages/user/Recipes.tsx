import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { TNutritionProps } from "../../stacks/UserStack";

function Recipes({ navigation, route: { params } }: TNutritionProps) {
  return (
    <View>
      <Text>Recipes</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Recipes;
