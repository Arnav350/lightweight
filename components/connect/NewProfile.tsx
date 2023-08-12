import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { supabase } from "../../supabase";
import { TRoomProps } from "../../pages/user/connect/Room";
import { COLORS } from "../../constants/theme";

interface IProps {
  profile: IProfile;
  setSelectedProfiles?: Dispatch<SetStateAction<IProfile[]>>;
  navigateRoom?: TRoomProps;
}

function NewProfile({ profile, setSelectedProfiles }: IProps) {
  const { id, name, username, picture } = profile;

  const [selected, setSelected] = useState<boolean>(false);
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

  function handlePress() {
    if (setSelectedProfiles) {
      if (selected) {
        setSelectedProfiles((prevSelectedProfiles) =>
          prevSelectedProfiles.filter((selectedProfile) => selectedProfile.id !== id)
        );
      } else {
        setSelectedProfiles((prevSelectedProfiles) => [...prevSelectedProfiles, profile]);
      }

      setSelected(!selected);
    } else if (true) {
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={handlePress}>
      <View style={styles.profileContainer}>
        <Image source={picture ? { uri: profilePicture } : require("../../assets/logo.png")} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>
      {setSelectedProfiles ? (
        <Icon name={selected ? "circle" : "circle-outline"} size={28} color={COLORS.primary} />
      ) : (
        <TouchableOpacity style={styles.followContainer} activeOpacity={0.5}>
          <Text style={styles.follow}>Follow</Text>
        </TouchableOpacity>
      )}
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
  },
  image: {
    marginRight: 8,
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: COLORS.white,
    fontSize: 16,
  },
  username: {
    color: COLORS.gray,
    fontSize: 14,
  },
  followContainer: {
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  follow: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default NewProfile;
