import { StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

type TPersonalProps = StackScreenProps<TAccountStackParamList, "Personal">;

function Personal({ navigation }: TPersonalProps) {
  return (
    <View>
      <Text>Personal</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Personal;
