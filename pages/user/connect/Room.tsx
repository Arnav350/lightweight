import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../../constants/theme";

type TRoomProps = StackScreenProps<TConnectStackParamList, "Room">;

function Room({ navigation, route: { params } }: TRoomProps) {
  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>{params.id}</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="taco" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.roomContainer}></View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blackTwo,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackTwo,
  },
  header: {
    margin: 8,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
  roomContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
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
