import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Log from "../components/gym/Log";

import { COLORS } from "../constants/theme";

function Gym() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.5}>
          <Icon name="chart-line" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Workout</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.gymContainer}>
        <View style={styles.gymButtons}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.gymRoutine}
            onPress={() => {}}
          >
            <Icon name="plus" size={24} color={COLORS.primary} />
            <Text style={styles.gymSubtitles}>Start Empty Workout</Text>
          </TouchableOpacity>

          <View style={styles.gymRoutines}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.gymRoutine}
              onPress={() => {}}
            >
              <Icon
                name="clipboard-plus-outline"
                size={24}
                color={COLORS.primary}
              />
              <Text style={styles.gymSubtitles}>New Routine</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.gymRoutine}
              onPress={() => {}}
            >
              <Icon name="bookmark-outline" size={24} color={COLORS.primary} />
              <Text style={styles.gymSubtitles}>Select Routine</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.logContainer}>
          <Log />
          <Log />
          <Log />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
  gymContainer: {
    backgroundColor: COLORS.black,
  },
  gymButtons: {
    padding: 16,
  },
  gymRoutine: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 16,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  gymRoutines: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 8,
  },
  gymSubtitles: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
  logContainer: {
    gap: 16,
    paddingRight: 16,
    paddingLeft: 16,
  },
});

export default Gym;
