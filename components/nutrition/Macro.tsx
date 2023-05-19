import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { COLORS } from "../../constants/theme";

interface IProps {
  color: string;
  current: number;
  total: number;
  unit: string;
  label: string;
}

const size: 96 | 128 | 192 | 256 = 96;
const width = (size * 3) / 32;
const radius = (size - width) / 2;
const dash = radius * 2 * Math.PI;

function Macro(props: IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={COLORS.black}
            strokeWidth={width}
            strokeDasharray={dash}
            strokeDashoffset={dash * 0}
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={props.color}
            strokeWidth={width}
            strokeDasharray={dash}
            strokeDashoffset={dash * (1 - props.current / props.total)}
          />
        </Svg>

        <Text style={styles.current}>{props.current}</Text>
        <Text style={styles.total}>
          / {props.total}
          {props.unit}
        </Text>
      </View>
      <Text style={styles.label}>{props.label}</Text>
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

export default Macro;
