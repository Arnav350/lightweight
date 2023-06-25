import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../../constants/theme";

function Compete() {
  return (
    <SafeAreaView edges={["top", "right", "left"]}>
      <Text>COMPETE</Text>
    </SafeAreaView>
  );
}

export default Compete;
