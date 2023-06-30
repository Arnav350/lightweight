import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../constants/theme";

interface IProps {
  handlePress: () => void;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  text: string;
}

function ActionOptions({ handlePress, icon, text }: IProps) {
  return (
    <TouchableHighlight underlayColor={COLORS.gray} onPress={handlePress}>
      <View style={styles.optionContainer}>
        {icon && <Icon name={icon} size={32} color={icon === "close" ? COLORS.primary : COLORS.white} />}
        <Text style={[styles.option, icon === "close" && { color: COLORS.primary }]}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default ActionOptions;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackOne,
  },
  option: {
    marginLeft: 8,
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
});
