import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TSelectProps } from "../../pages/user/gym/Select";
import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  name: string;
  navigate: TSelectProps;
}

function ExploreRoutine({ i, name, navigate: { navigation } }: IProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={() => navigation.navigate("Routine", { i: i })}
    >
      <Text numberOfLines={2} style={styles.name}>
        {name}
      </Text>
      <Icon name="plus" size={24} color={COLORS.primary} />
    </TouchableOpacity>
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
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ExploreRoutine;
