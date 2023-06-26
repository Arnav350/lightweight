import { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import TimerPreset from "./TimerPreset";
import { COLORS } from "../../constants/theme";

interface IProps {
  setShowTimer: Dispatch<SetStateAction<boolean>>;
}

function WorkoutTimer({ setShowTimer }: IProps) {
  const [playing, setPlaying] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);
  const [time, setTime] = useState<number>(60);
  const [presets, setPresets] = useState<number[]>([60, 30, 200]);

  function handleLeftPress() {
    setKey((prevKey) => prevKey + 1);
    setPlaying(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity activeOpacity={0.3} onPress={() => setShowTimer(false)}>
            <Icon name="close" size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.header}>Timer</Text>
          <Icon name="penguin" size={32} color={COLORS.primary} />
        </View>
        <View style={styles.countdownContainer}>
          <CountdownCircleTimer
            key={key}
            isPlaying={playing}
            duration={time}
            colors={`#${COLORS.primary.slice(1)}`}
            trailColor={`#${COLORS.blackOne.slice(1)}`}
            size={280}
            strokeWidth={16}
            onComplete={() => setPlaying(false)}
          >
            {({ remainingTime }) => {
              const hours = Math.floor(remainingTime / 3600);
              const minutes = Math.floor((remainingTime % 3600) / 60);
              const seconds = remainingTime % 60;

              return (
                <Text style={styles.time}>
                  {hours ? `${hours}:` : ""}
                  {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              );
            }}
          </CountdownCircleTimer>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.leftContainer} onPress={handleLeftPress}>
            <Text style={styles.button}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightContainer} onPress={() => setPlaying(!playing)}>
            {playing ? <Text style={styles.button}>Pause</Text> : <Text style={styles.button}>Play</Text>}
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={styles.presetsContainer}>
          <TouchableOpacity activeOpacity={0.5} style={styles.presetContainer}>
            <Icon name="plus" size={32} color={COLORS.white} />
          </TouchableOpacity>
          {presets.map((preset, i) => (
            <TimerPreset key={i} preset={preset} setTime={setTime} />
          ))}
        </ScrollView>
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
  timerContainer: {
    margin: 16,
    padding: 8,
    backgroundColor: COLORS.black,
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  header: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  countdownContainer: {
    margin: 24,
    alignSelf: "center",
  },
  time: {
    color: COLORS.white,
    fontSize: 48,
    fontWeight: "600",
  },
  buttonsContainer: {
    margin: 8,
    flexDirection: "row",
    alignSelf: "center",
  },
  leftContainer: {
    padding: 16,
    width: 144,
    backgroundColor: COLORS.blackOne,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  rightContainer: {
    padding: 16,
    width: 144,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  button: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  presetsContainer: {
    marginVertical: 8,
    marginHorizontal: 4,
    maxHeight: 64,
  },
  presetContainer: {
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
    height: 64,
    width: 64,
    backgroundColor: COLORS.blackOne,
    borderRadius: 32,
  },
});

export default WorkoutTimer;
