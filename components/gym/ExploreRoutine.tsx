import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../constants/theme";

interface IProps {
  name: string;
}

function ExploreRoutine({ name }: IProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity activeOpacity={0.3}>
        <Icon name="plus" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 8,
    padding: 16,
    height: 80,
    width: 160,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  name: {
    flexShrink: 1,
    flexWrap: "wrap",
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ExploreRoutine;
