import { StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

type TAboutProps = StackScreenProps<TAccountStackParamList, "About">;

function About({ navigation }: TAboutProps) {
  return (
    <View>
      <Text>About</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default About;
