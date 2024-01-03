import { useContext, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../../../hooks/useAuth";
import { ConnectContext } from "../../../hooks/useConnect";
import FollowersList from "../../../components/account/FollowersList";
import { COLORS } from "../../../constants/theme";

type TFollowersProps = StackScreenProps<TAccountStackParamList, "Followers">;

const windowWidth = Dimensions.get("window").width;

function Followers(props: TFollowersProps) {
  const {
    navigation,
    route: { params },
  } = props;

  const { currentProfile } = useContext(AuthContext);
  const { followers, followees, mutuals } = useContext(ConnectContext);

  const scrollRef = useRef<ScrollView>(null);

  const [page, setPage] = useState<"Followers" | "Followings" | "Mutuals">(params.page);
  const [input, setInput] = useState<string>("");

  function handlePress(text: "Followers" | "Followings" | "Mutuals") {
    setPage(text);

    switch (text) {
      case "Followers":
        scrollRef.current?.scrollTo({ x: 0 });
        return;
      case "Followings":
        scrollRef.current?.scrollTo({ x: windowWidth });
        return;
      case "Mutuals":
        scrollRef.current?.scrollTo({ x: 2 * windowWidth });
        return;
    }
  }

  function handleScroll(targetOffset: number) {
    switch (targetOffset / windowWidth) {
      case 0:
        setPage("Followers");
        return;
      case 1:
        setPage("Followings");
        return;
      case 2:
        setPage("Mutuals");
        return;
    }
  }

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>{currentProfile?.username}</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="pig" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.followersContainer}>
        <View style={styles.titlesContainer}>
          <TouchableOpacity
            activeOpacity={0.3}
            style={
              page === "Followers"
                ? { ...styles.titleContainer, borderBottomColor: COLORS.white }
                : styles.titleContainer
            }
            onPress={() => handlePress("Followers")}
          >
            <Text style={page === "Followers" ? { ...styles.title, color: COLORS.white } : styles.title}>
              Followers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            style={
              page === "Followings"
                ? { ...styles.titleContainer, borderBottomColor: COLORS.white }
                : styles.titleContainer
            }
            onPress={() => handlePress("Followings")}
          >
            <Text style={page === "Followings" ? { ...styles.title, color: COLORS.white } : styles.title}>
              Followings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            style={
              page === "Mutuals" ? { ...styles.titleContainer, borderBottomColor: COLORS.white } : styles.titleContainer
            }
            onPress={() => handlePress("Mutuals")}
          >
            <Text style={page === "Mutuals" ? { ...styles.title, color: COLORS.white } : styles.title}>Mutuals</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Icon name="magnify" size={32} color={COLORS.darkGray} />
          <TextInput
            value={input}
            placeholder="Search users"
            placeholderTextColor={COLORS.gray}
            keyboardAppearance="dark"
            style={styles.input}
            onChangeText={setInput}
          />
        </View>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScrollEndDrag={({ nativeEvent }) => handleScroll(nativeEvent.targetContentOffset?.x || 0)}
        >
          <FollowersList
            list={followers.filter(
              ({ profile }) =>
                profile.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
                profile.username.toLocaleLowerCase().includes(input.toLocaleLowerCase())
            )}
          />
          <FollowersList
            list={followees.filter(
              ({ profile }) =>
                profile.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
                profile.username.toLocaleLowerCase().includes(input.toLocaleLowerCase())
            )}
          />
          <FollowersList
            list={mutuals.filter(
              ({ profile }) =>
                profile.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
                profile.username.toLocaleLowerCase().includes(input.toLocaleLowerCase())
            )}
          />
        </ScrollView>
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
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.white,
  },
  followersContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  titlesContainer: {
    flexDirection: "row",
  },
  titleContainer: {
    flex: 1 / 2,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.darkGray,
  },
  title: {
    color: COLORS.gray,
    fontSize: 18,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    marginVertical: 12,
    marginHorizontal: 16,
    padding: 4,
    gap: 4,
    backgroundColor: COLORS.blackOne,
    borderRadius: 4,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
  },
});

export default Followers;
