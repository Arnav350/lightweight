import { StyleSheet, Text, TextInput, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../../constants/theme";

type TRoomProps = StackScreenProps<TConnectStackParamList, "Room">;

function Room({ navigation }: TRoomProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="camera-outline" size={32} color={COLORS.primary} />
        <TextInput
          placeholder="Message..."
          placeholderTextColor={COLORS.gray}
          maxLength={2000}
          returnKeyType="send"
          blurOnSubmit
          multiline
          style={styles.input}
          onSubmitEditing={({ nativeEvent: { text } }) => console.log(text)}
        />
        <Icon name="microphone-outline" size={32} color={COLORS.primary} />
        <Icon name="image-outline" size={32} color={COLORS.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blackTwo,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: COLORS.black,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.blackOne,
    color: COLORS.white,
    fontSize: 16,
    textAlignVertical: "top",
  },
});

export default Room;
