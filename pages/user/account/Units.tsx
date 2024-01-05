import { StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

type TUnitsProps = StackScreenProps<TAccountStackParamList, "Units">;

function Units({ navigation }: TUnitsProps) {
  return (
    <View>
      <Text>Units</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Units;
