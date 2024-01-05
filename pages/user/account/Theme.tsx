import { StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

type TThemeProps = StackScreenProps<TAccountStackParamList, "Theme">;

function Theme({ navigation }: TThemeProps) {
  return (
    <View>
      <Text>Theme</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Theme;
