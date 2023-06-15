import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TCompositeProps } from "../../App";
import { TGymStackParamList } from "../../stacks/UserStack";
import { COLORS } from "../../constants/theme";

type TProps = CompositeScreenProps<StackScreenProps<TGymStackParamList, "Routine">, TCompositeProps>;

function Routine({ navigation }: TProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Routine</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="bird" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.routineContainer}>
        <TouchableOpacity activeOpacity={0.5} style={styles.startContainer}>
          <Text style={styles.start}>Start Routine</Text>
        </TouchableOpacity>
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
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
  routineContainer: {
    padding: 16,
  },
  startContainer: {
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  start: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Routine;
