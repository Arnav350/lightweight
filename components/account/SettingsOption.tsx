import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TSettingsProps } from "../../pages/user/account/Settings";
import { COLORS } from "../../constants/theme";

interface IProps {
  icon: keyof typeof Icon.glyphMap;
  text: "Personal" | "Notifications" | "Blocked" | "Units" | "Theme" | "Permissions" | "About";
  props: TSettingsProps;
}

function SettingsOption({ icon, text, props: { navigation } }: IProps) {
  return (
    <TouchableOpacity activeOpacity={0.3} style={styles.container} onPress={() => navigation.navigate(text)}>
      <View style={styles.optionContainer}>
        <Icon name={icon} size={32} color={COLORS.white} />
        <Text style={styles.text}>{text}</Text>
      </View>
      <Icon name="chevron-right" size={32} color={COLORS.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
  },
});

export default SettingsOption;
