import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TCompositeProps } from "../../../App";
import { supabase } from "../../../supabase";
import { AuthContext } from "../../../hooks/useAuth";
import AccountCalendar from "../../../components/account/AccountCalendar";
import { COLORS } from "../../../constants/theme";

type TConnectProps = CompositeScreenProps<StackScreenProps<TAccountStackParamList, "Account">, TCompositeProps>;

function Account(props: TConnectProps) {
  const { navigation } = props;

  const { currentProfile } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState<string>("");

  useEffect(() => {
    if (currentProfile?.picture) {
      async function getPicture() {
        if (currentProfile) {
          const { data, error } = await supabase.storage.from("profiles").download(currentProfile.id);

          if (error) {
            alert(error.message);
          } else {
            const fileReaderInstance = new FileReader();
            fileReaderInstance.readAsDataURL(data);
            fileReaderInstance.onload = () => {
              const base64data = fileReaderInstance.result;
              if (typeof base64data === "string") {
                setProfilePicture(base64data);
              }
            };
          }
        }
      }

      getPicture();
    }
  });

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="tree" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.textContainer}>
          <Icon name="chevron-down" size={32} color={COLORS.white} />
          <Text style={styles.header}>{currentProfile?.username}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.navigate("Settings")}>
          <Icon name="cog-outline" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.accountContainer}>
        <View style={styles.userContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={profilePicture ? { uri: profilePicture } : require("../../../assets/logo.png")}
              style={styles.picture}
            />
            <Text style={styles.name}>{currentProfile?.name}</Text>
            <Text style={styles.bio}>Wow!</Text>
          </View>
          <View style={styles.followersContainer}>
            <TouchableOpacity activeOpacity={0.3} style={styles.followerContainer}>
              <Text style={styles.number}>100</Text>
              <Text style={styles.follower}>Workouts</Text>
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <TouchableOpacity
              activeOpacity={0.3}
              style={styles.followerContainer}
              onPress={() => navigation.navigate("Followers", { page: "Followers" })}
            >
              <Text style={styles.number}>1000</Text>
              <Text style={styles.follower}>Followers</Text>
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <TouchableOpacity
              activeOpacity={0.3}
              style={styles.followerContainer}
              onPress={() => navigation.navigate("Followers", { page: "Followings" })}
            >
              <Text style={styles.number}>1000</Text>
              <Text style={styles.follower}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.workoutsContainer}>
          <AccountCalendar />
        </View>
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
  textContainer: {
    flexDirection: "row",
    margin: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
  accountContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  userContainer: {
    alignItems: "center",
    padding: 16,
  },
  profileContainer: {
    alignItems: "center",
    padding: 16,
  },
  picture: {
    marginBottom: 8,
    height: 128,
    width: 128,
    borderRadius: 64,
  },
  name: {
    marginVertical: 4,
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "600",
  },
  bio: {
    color: COLORS.white,
  },
  followersContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
  },
  followerContainer: {
    alignItems: "center",
  },
  number: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  follower: {
    color: COLORS.gray,
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: COLORS.darkGray,
  },
  workoutsContainer: {
    // backgroundColor: COLORS.primary,
  },
});

export default Account;
