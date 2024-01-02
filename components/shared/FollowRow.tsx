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

function FollowRow({ follower, profile }: IProps) {
  const { id, name, username, picture } = profile;
  const currentUser = useContext(AuthContext);
  const { followers, setFollowers, followees, setFollowees, mutuals, setMutuals, connecteds, setConnecteds } =
    useContext(ConnectContext);

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
      const { error } = await supabase
        .from("followers")
        .delete()
        .match({ followee_id: id, follower_id: currentUser?.id });

      if (error) {
        alert(error.message);
      } else {
        setFollowees((prevFollowees) => prevFollowees.filter((prevFollowee) => prevFollowee.profile.id !== id));

        if (mutuals.find((mutual) => mutual.profile.id === id)) {
          setFollowers((prevFollowers) =>
            prevFollowers.map((prevFollower) =>
              prevFollower.profile.id === id ? { ...prevFollower, follower: false } : prevFollower
            )
          );
          setMutuals((prevMutuals) => prevMutuals.filter((prevMutual) => prevMutual.profile.id !== id));
          setConnecteds((prevConnecteds) =>
            prevConnecteds.map((prevConnected) =>
              prevConnected.profile.id === id ? { ...prevConnected, follower: false } : prevConnected
            )
          );
        } else {
          setConnecteds((prevConnecteds) =>
            prevConnecteds.filter((prevConnecteds) => prevConnecteds.profile.id !== id)
          );
        }
      }
    } else {
      function findIndex(array: IFollower[]) {
        let index: number = 0;
        while (index < array.length && array[index].priority >= 300) {
          index++;
        }
        console.log(index);
        return index;
      }

      const { error } = await supabase
        .from("followers")
        .insert({ followee_id: id, follower_id: currentUser?.id, priority: 300 });

      if (error) {
        alert(error.message);
      } else {
        const followeesIndex = findIndex(followees);
        setFollowees((prevFollowees) =>
          prevFollowees.splice(followeesIndex, 0, { follower: true, priority: 300, profile })
        );

        if (followers.find((follower) => follower.profile.id === id)) {
          setFollowers((prevFollowers) =>
            prevFollowers.map((prevFollower) =>
              prevFollower.profile.id === id ? { ...prevFollower, follower: true } : prevFollower
            )
          );
          const mutualsIndex = findIndex(mutuals);
          setMutuals((prevMutuals) => prevMutuals.splice(mutualsIndex, 0, { follower: true, priority: 300, profile }));
          setConnecteds((prevConnecteds) =>
            prevConnecteds.map((prevConnected) =>
              prevConnected.profile.id === id ? { ...prevConnected, follower: true } : prevConnected
            )
          );
        } else {
          const connectedsIndex = findIndex(connecteds);
          setConnecteds((prevConnecteds) =>
            prevConnecteds.splice(connectedsIndex, 0, { follower: true, priority: 300, profile })
          );
        }
      }
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
