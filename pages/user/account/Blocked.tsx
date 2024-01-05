import { StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

type TBlockedProps = StackScreenProps<TAccountStackParamList, "Blocked">;

function Blocked({ navigation }: TBlockedProps) {
  return (
    <View>
      <Text>Blocked</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Blocked;
