import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Set from "./Set";

import { COLORS, FONTS, SPACES } from "../../constants/theme";

interface IProps {
  name: string;
}

interface ISet {
  label?: "W" | "D";
  weight: number;
  reps: number;
  notes?: string;
}

type ISets = ISet[];

function Exercise() {
  const [prevSets, setPrevSets] = useState<ISets>([
    { label: "W", weight: 200, reps: 10, notes: "notes" },
    { weight: 300, reps: 8 },
    { label: "D", weight: 400, reps: 6 },
  ]);

  const [sets, setSets] = useState<ISets>([
    { label: "W", weight: 200, reps: 10, notes: "notes" },
    { weight: 300, reps: 8 },
    { label: "D", weight: 400, reps: 6 },
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>Hello</Text>
        <Icon
          name="dots-horizontal"
          size={FONTS.xlarge}
          color={COLORS.textOne}
        />
      </View>
      <View style={styles.exerciseSubtitles}>
        <Text style={styles.exerciseSubtitle}>Set</Text>
        <Text style={styles.exerciseSubtitle}>Weight</Text>
        <Text style={styles.exerciseSubtitle}>Reps</Text>
        <Text style={styles.exerciseSubtitle}>Notes</Text>
      </View>
      <View style={styles.setsContainer}>
        {prevSets.map((prevSet: ISet, i: number) => (
          <Set key={i} />
        ))}
      </View>
      <Text style={styles.exerciseButton}>+ Add Set</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 12 8,
    backgroundColor: COLORS.box,
    borderRadius: 16,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: COLORS.textOne,
  },
  topText: {
    color: COLORS.textOne,
    fontSize: FONTS.large,
  },
  exerciseSubtitles: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    // padding: 4 8,
  },
  exerciseSubtitle: {
    color: COLORS.textOne,
  },
  setsContainer: {
    // padding: 4 8,
  },
  exerciseButton: {
    marginTop: 4,
    // padding: 4 8,
    borderTopWidth: 2,
    borderTopColor: COLORS.textTwo,
    color: COLORS.textOne,
  },
});

export default Exercise;
