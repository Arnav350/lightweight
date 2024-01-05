import { StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

type TPermissionsProps = StackScreenProps<TAccountStackParamList, "Permissions">;

function Permissions({ navigation }: TPermissionsProps) {
  return (
    <View>
      <Text>Permissions</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Permissions;
