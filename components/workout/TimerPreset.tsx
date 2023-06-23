import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../../constants/theme";

interface IProps {
  preset: number;
  setTime: Dispatch<SetStateAction<number>>;
}

function TimerPreset({ preset, setTime }: IProps) {
  const minutes: number = Math.floor(preset / 60);
  const seconds: number = preset % 60;

  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.presetContainer} onPress={() => setTime(preset)}>
      <Text style={styles.preset}>
        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  presetContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    height: 64,
    width: 64,
    backgroundColor: COLORS.blackOne,
    borderRadius: 32,
  },
  preset: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default TimerPreset;
