import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../constants/theme";

function Nutrition() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Icon name="chart-line" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Nutrition</Text>
        <TouchableOpacity>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLORS.black,
  },
  headerContainer: {
    display: "flex",
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
});

export default Nutrition;
