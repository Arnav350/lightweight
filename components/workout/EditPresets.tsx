import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  preset: number;
  setPresets: Dispatch<SetStateAction<number[]>>;
}

function EditPresets({ i, preset, setPresets }: IProps) {
  const minutes: number = Math.floor(preset / 60);
  const seconds: number = preset % 60;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.3}
        style={styles.minusContainer}
        onPress={() => setPresets((prevPresets) => prevPresets.filter((_prevPreset, j) => j !== i))}
      >
        <Icon name="minus" size={24} color={COLORS.white} />
      </TouchableOpacity>
      <Text style={styles.text}>
        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
  minusContainer: {
    marginHorizontal: 8,
    backgroundColor: "#d33",
    borderRadius: 24,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default EditPresets;
