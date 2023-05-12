import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../constants/theme";

function Profile() {
  function handlePress() {
    signOut(auth)
      .then()
      .catch((error) => alert(error.message));
  }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handlePress}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Profile;
