import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { supabase } from "../../../supabase";
import { AuthContext } from "../../../hooks/useAuth";
import { COLORS } from "../../../constants/theme";

type TProfileProps = StackScreenProps<TAccountStackParamList, "Profile">;

function Profile({ navigation }: TProfileProps) {
  const { currentProfile } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<string>("none");
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Profile</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="box" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.personalContainer}>
        <TouchableOpacity activeOpacity={0.5}>
          <Image
            source={profilePicture ? { uri: profilePicture } : require("../../../assets/logo.png")}
            style={styles.picture}
          />
          <View style={styles.iconContainer}>
            <Icon name="pencil-outline" size={36} color={COLORS.white} />
          </View>
        </TouchableOpacity>
        <TextInput
          placeholder={currentProfile?.name}
          placeholderTextColor={COLORS.gray}
          defaultValue={currentProfile?.name}
          keyboardAppearance="dark"
          style={focusedInput === "name" ? { ...styles.input, borderBottomColor: COLORS.white } : styles.input}
          onFocus={() => setFocusedInput("name")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          placeholder={currentProfile?.username}
          placeholderTextColor={COLORS.gray}
          defaultValue={currentProfile?.username}
          keyboardAppearance="dark"
          style={focusedInput === "username" ? { ...styles.input, borderBottomColor: COLORS.white } : styles.input}
          onFocus={() => setFocusedInput("username")}
          onBlur={() => setFocusedInput("none")}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder={"******"}
            placeholderTextColor={COLORS.gray}
            defaultValue={"******"}
            keyboardAppearance="dark"
            secureTextEntry={!showPassword}
            style={focusedInput === "password" ? { ...styles.input, borderBottomColor: COLORS.white } : styles.input}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput("none")}
          />
          <TouchableOpacity
            activeOpacity={0.3}
            style={styles.eyeContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Icon name="eye-off-outline" size={28} color={COLORS.gray} />
            ) : (
              <Icon name="eye-outline" size={28} color={COLORS.gray} />
            )}
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder={"Bio"}
          placeholderTextColor={COLORS.gray}
          defaultValue={"Bio"}
          keyboardAppearance="dark"
          multiline
          style={focusedInput === "bio" ? { ...styles.input, borderBottomColor: COLORS.white } : styles.input}
          onFocus={() => setFocusedInput("bio")}
          onBlur={() => setFocusedInput("none")}
        />
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
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
  personalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.black,
  },
  picture: {
    marginBottom: 8,
    height: 128,
    width: 128,
    borderRadius: 64,
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    bottom: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  input: {
    padding: 8,
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray,
    color: COLORS.white,
    fontSize: 18,
    textAlignVertical: "top",
  },
  passwordContainer: {
    width: "100%",
  },
  eyeContainer: {
    position: "absolute",
    top: 5,
    right: 8,
  },
});

export default Profile;
