import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../constants/theme";
import EditPresets from "./EditPresets";

interface IProps {
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  presets: number[];
  setPresets: Dispatch<SetStateAction<number[]>>;
}

function EditTimer({ setShowEdit, presets, setPresets }: IProps) {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  function handlePress() {
    if (minutes || seconds) {
      setPresets((prevPresets) => [minutes * 60 + seconds, ...prevPresets]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.editContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity activeOpacity={0.3} onPress={() => setShowEdit(false)}>
            <Icon name="chevron-left" size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.header}>Edit Timers</Text>
          <Icon name="cookie" size={32} color={COLORS.primary} />
        </View>
        <View style={styles.newContainer}>
          <TouchableOpacity activeOpacity={0.3} style={styles.plusContainer} onPress={handlePress}>
            <Icon name="plus" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <TextInput
            value={minutes ? minutes.toString() : ""}
            keyboardType="numeric"
            keyboardAppearance="dark"
            maxLength={3}
            style={styles.minutes}
            onChangeText={(text) => setMinutes(Number(text))}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            value={seconds ? seconds.toString() : ""}
            keyboardType="numeric"
            keyboardAppearance="dark"
            maxLength={2}
            style={styles.seconds}
            onChangeText={(text) => setSeconds(Number(text))}
          />
        </View>
        {presets.map((preset, i) => (
          <EditPresets key={i} i={i} preset={preset} setPresets={setPresets} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111111ee",
  },
  editContainer: {
    margin: 16,
    backgroundColor: COLORS.black,
    borderRadius: 16,
    overflow: "hidden",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  header: {
    marginHorizontal: 24,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  newContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderTopWidth: 1,
    borderTopColor: COLORS.darkGray,
  },
  plusContainer: {
    marginHorizontal: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 24,
  },
  minutes: {
    paddingHorizontal: 2,
    width: 32,
    backgroundColor: COLORS.darkGray,
    borderRadius: 4,
    color: COLORS.white,
    fontSize: 16,
    textAlign: "right",
  },
  seconds: {
    paddingHorizontal: 2,
    width: 32,
    backgroundColor: COLORS.darkGray,
    borderRadius: 4,
    color: COLORS.white,
    fontSize: 16,
    textAlign: "left",
  },
  colon: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default EditTimer;
