import { StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

type TNotificationsProps = StackScreenProps<TAccountStackParamList, "Notifications">;

function Notifications({ navigation }: TNotificationsProps) {
  return (
    <View>
      <Text>Notifications</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Notifications;
