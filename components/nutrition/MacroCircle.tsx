import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { COLORS } from "../../constants/theme";

interface IProps {
  current: number;
  total: number;
  unit: string;
  label: string;
}

const size: 96 | 128 | 192 | 256 = 96;
const width = (size * 3) / 32;
const radius = (size - width) / 2;
const dash = radius * 2 * Math.PI;

function MacroCircle({ current, total, unit, label }: IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={current / total < 1 ? COLORS.black : COLORS.primary}
            strokeWidth={width}
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={current / total < 1 ? COLORS.primary : COLORS.white}
            strokeWidth={width}
            strokeDasharray={dash}
            strokeDashoffset={dash * (current / total < 1 ? 1 - current / total : total / current)}
            opacity={current / total < 1 ? 1 : 0.4}
          />
        </Svg>

        <Text style={styles.current}>{current}</Text>
        <Text style={styles.total}>
          / {total}
          {unit}
        </Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: size,
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: size,
    width: size,
  },
  svg: { transform: [{ rotate: "-90deg" }], position: "absolute" },
  current: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  total: {
    color: COLORS.white,
    fontSize: 12,
  },
  label: {
    marginTop: 8,
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center",
  },
});

export default MacroCircle;
