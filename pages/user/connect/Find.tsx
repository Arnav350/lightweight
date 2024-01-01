import { useContext, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { ConnectContext } from "../../../hooks/useConnect";
import FollowRow from "../../../components/shared/FollowRow";
import { COLORS } from "../../../constants/theme";

type TFindProps = StackScreenProps<TConnectStackParamList, "Find">;

function Find({ navigation }: TFindProps) {
  const [input, setInput] = useState<string>("");
  const { followees, followers, connecteds } = useContext(ConnectContext);
  // const followeeIds = useMemo(() => followees.map((followee) => followee.profile.id), [followees]);
  // const nonMutuals = useMemo(
  //   () => [...followers, ...followers.filter((follower) => !followeeIds.includes(follower.profile.id))],
  //   [followees, followers]
  // );

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Icon name="magnify" size={32} color={COLORS.darkGray} />
          <TextInput
            value={input}
            placeholder="Search users..."
            placeholderTextColor={COLORS.gray}
            keyboardAppearance="dark"
            returnKeyType="search"
            style={styles.search}
            onChangeText={setInput}
          />
        </View>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="cat" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={connecteds}
        renderItem={({ item, index }) => <FollowRow key={index} profile={item.profile} />}
        style={styles.findContainer}
      />
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
  findContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});

export default Find;
