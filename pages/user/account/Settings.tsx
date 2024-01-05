import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../../constants/theme";
import SettingsOption from "../../../components/account/SettingsOption";

type TSettingsProps = StackScreenProps<TAccountStackParamList, "Settings">;

function Settings(props: TSettingsProps) {
  const { navigation } = props;

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
      <ScrollView style={styles.settingsContainer}>
        <Text style={styles.title}>Account</Text>
        <SettingsOption icon="account-outline" text="Personal" />
        <SettingsOption icon="bell-outline" text="Notifications" />
        <SettingsOption icon="block-helper" text="Blocked" />
        <Text style={styles.title}>Preferences</Text>
        <SettingsOption icon="dumbbell" text="Units" />
        <SettingsOption icon="image-outline" text="Theme" />
        <Text style={styles.title}>Support</Text>
        <SettingsOption icon="cellphone" text="Permissions" />
        <SettingsOption icon="information-outline" text="About" />
      </ScrollView>
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
  settingsContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  title: {
    marginTop: 16,
    color: COLORS.gray,
    fontSize: 20,
    fontWeight: "300",
    textAlign: "center",
  },
});

export default Settings;
