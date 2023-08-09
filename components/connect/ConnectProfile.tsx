import { StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface IProps {
  profile: IProfile;
}

function ConnectProfile({ profile }: IProps) {
  return (
    <View>
      <Text>ConnectProfile</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ConnectProfile;
