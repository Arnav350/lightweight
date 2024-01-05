import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../../constants/theme";

type TThemeProps = StackScreenProps<TAccountStackParamList, "Theme">;

function Theme({ navigation }: TThemeProps) {
  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Settings</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="box" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.themeContainer}></View>
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
  themeContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});

export default Theme;
