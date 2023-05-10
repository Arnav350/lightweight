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
        <TouchableOpacity>
          <Icon name="chart-line" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Workout</Text>
        <TouchableOpacity>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.gymContainer}>
        <View style={styles.gymButtons}>
          <Icon.Button
            name="plus"
            size={24}
            color={COLORS.primary}
            style={styles.gymEmpty}
            onPress={() => {}}
          >
            <Text style={styles.gymSubtitles}>Start Empty Workout</Text>
          </Icon.Button>
          <View style={styles.gymRoutines}>
            <Icon.Button
              name="clipboard-plus-outline"
              size={24}
              color={COLORS.primary}
              style={styles.gymRoutine}
              onPress={() => {}}
            >
              <Text style={styles.gymSubtitles}>New Routine</Text>
            </Icon.Button>
            <Icon.Button
              name="bookmark-outline"
              size={24}
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
    </SafeAreaView>
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
    padding: 16,
    backgroundColor: COLORS.header,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.textOne,
  },
  gymContainer: {},
  gymButtons: {
    padding: 16,
  },
  gymEmpty: {
    display: "flex",
    flexDirection: "row",
    padding: 16,
    backgroundColor: COLORS.box,
  },
  gymRoutines: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  gymRoutine: {
    padding: 16,
    backgroundColor: COLORS.box,
  },
  gymSubtitles: {
    color: COLORS.textOne,
    fontSize: 16,
    fontWeight: "500",
  },
  logContainer: {
    paddingRight: 16,
    paddingLeft: 16,
  },
});

export default Gym;
