import { useContext, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TCompositeProps } from "../../../App";
import { supabase } from "../../../supabase";
import { AuthContext } from "../../../hooks/useAuth";
import ConnectRooms from "../../../components/connect/ConnectRooms";
import ConnectStories from "../../../components/connect/ConnectStories";
import { COLORS } from "../../../constants/theme";

export type TConnectProps = CompositeScreenProps<StackScreenProps<TConnectStackParamList, "Connect">, TCompositeProps>;

function Connect(props: TConnectProps) {
  const { navigation } = props;

  const currentUser = useContext(AuthContext);
  const [input, setInput] = useState<string>("");

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.navigate("Find")}>
          <Icon name="account-plus-outline" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Icon name="magnify" size={32} color={COLORS.darkGray} />
          <TextInput
            value={input}
            placeholder="Search..."
            placeholderTextColor={COLORS.gray}
            keyboardAppearance="dark"
            returnKeyType="search"
            style={styles.search}
            onChangeText={setInput}
          />
        </View>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.navigate("New")}>
          <Icon name="square-edit-outline" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.connectContainer}>
        {/* <ConnectStories navigate={props} /> */}
        <ConnectRooms navigate={props} input={input} />
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
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 16,
    padding: 8,
    backgroundColor: COLORS.black,
    borderRadius: 16,
  },
  search: {
    flex: 1,
    fontSize: 16,
    color: COLORS.white,
  },
  connectContainer: {
    backgroundColor: COLORS.black,
    height: "100%",
  },
});

export default Connect;
