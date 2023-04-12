import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Log from "../components/gym/Log";

import { COLORS, FONTS, SPACES } from "../constants/theme";

function Gym() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="chart-line" size={FONTS.xxlarge} color={COLORS.primary} />
        <Text style={styles.header}>Workout</Text>
        <Icon name="plus" size={FONTS.xxlarge} color={COLORS.primary} />
      </View>
      <ScrollView style={styles.gymContainer}>
        <View style={styles.gymButtons}>
          <Icon.Button
            name="plus"
            size={FONTS.xlarge}
            color={COLORS.primary}
            style={styles.gymEmpty}
            onPress={() => {}}
          >
            <Text style={styles.gymSubtitles}>Start Empty Workout</Text>
          </Icon.Button>
          <View style={styles.gymRoutines}>
            <Icon.Button
              name="clipboard-plus-outline"
              size={FONTS.xlarge}
              color={COLORS.primary}
              style={styles.gymRoutine}
              onPress={() => {}}
            >
              <Text style={styles.gymSubtitles}>New Routine</Text>
            </Icon.Button>
            <Icon.Button
              name="bookmark-outline"
              size={FONTS.xlarge}
              color={COLORS.primary}
              style={styles.gymRoutine}
              onPress={() => {}}
            >
              <Text style={styles.gymSubtitles}>Select Routine</Text>
            </Icon.Button>
          </View>
        </View>
        <View style={styles.logContainer}>
          <Log />
          <Log />
          <Log />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACES.large,
    backgroundColor: COLORS.header,
  },
  header: {
    // padding: 8 0,
    fontSize: FONTS.xlarge,
    fontWeight: FONTS.bold,
    color: COLORS.textOne,
  },
  gymContainer: {},
  gymButtons: {
    padding: SPACES.large,
  },
  gymEmpty: {
    display: "flex",
    flexDirection: "row",
    padding: SPACES.large,
    backgroundColor: COLORS.box,
  },
  gymRoutines: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACES.medium,
  },
  gymRoutine: {
    padding: SPACES.large,
    backgroundColor: COLORS.box,
  },
  gymSubtitles: {
    color: COLORS.textOne,
    fontSize: FONTS.normal,
    fontWeight: FONTS.bold,
  },
  logContainer: {
    // padding: 0 16,
  },
});

export default Gym;
