import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { COLORS } from "../constants/theme";

function Loading() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.blackOne,
  },
  logo: {
    height: 256,
    width: 256,
  },
});

export default Loading;
