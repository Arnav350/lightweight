import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { supabase } from "../../supabase";
import { AuthContext } from "../../hooks/useAuth";
import { ConnectContext } from "../../hooks/useConnect";
import { COLORS } from "../../constants/theme";

interface IProps {
  follower: boolean;
  profile: IProfile;
}

function FollowRow({ follower, profile: { id, name, username, picture } }: IProps) {
  const currentUser = useContext(AuthContext);
  const { setFollowers, setMutuals, setConnecteds } = useContext(ConnectContext);

  const [profilePicture, setProfilePicture] = useState<string>("");

  useEffect(() => {
    if (picture) {
      async function getPicture() {
        const { data, error } = await supabase.storage.from("profiles").download(id);

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

      getPicture();
    }
  });

  async function handleFollowPress() {
    if (follower) {
      const { data, error } = await supabase
        .from("followers")
        .delete()
        .match({ followee_id: currentUser?.id, follower_id: id });

      if (error) {
        alert(error.message);
      } else {
        //CHANGE FOLLOWERS MUTUALS AND CONNECTEDS IN CONNECTCONTEXT
      }
    } else {
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={profilePicture ? { uri: profilePicture } : require("../../assets/logo.png")}
          style={styles.picture}
        />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={follower ? { ...styles.followContainer, backgroundColor: COLORS.darkGray } : styles.followContainer}
        onPress={handleFollowPress}
      >
        <Text style={styles.follow}>{follower ? "Unfollow" : "Follow"}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  picture: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  textContainer: {},
  username: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.white,
  },
  name: {
    fontSize: 16,
    color: COLORS.gray,
  },
  followContainer: {
    marginRight: 8,
    paddingVertical: 4,
    width: 104,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  follow: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.white,
    textAlign: "center",
  },
});

export default FollowRow;
