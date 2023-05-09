import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, FONTS } from "../constants/theme";

function SignUn() {
  const [focusedInput, setFocusedInput] = useState<string>("none");

  return (
    <View style={styles.container}>
      <View style={styles.topTriangle}>
        <Text style={styles.topSlogan}>BE.</Text>
      </View>

      <View>
        <TextInput
          placeholder="Username"
          keyboardAppearance="dark"
          placeholderTextColor={COLORS.textTwo}
          style={
            focusedInput === "username"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onFocus={() => setFocusedInput("username")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          placeholder="Email"
          keyboardAppearance="dark"
          placeholderTextColor={COLORS.textTwo}
          style={
            focusedInput === "email"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          placeholder="Password"
          keyboardAppearance="dark"
          placeholderTextColor={COLORS.textTwo}
          style={
            focusedInput === "password"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput("none")}
        />
        <TextInput
          placeholder="Confirm Password"
          keyboardAppearance="dark"
          placeholderTextColor={COLORS.textTwo}
          style={
            focusedInput === "confirm"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onFocus={() => setFocusedInput("confirm")}
          onBlur={() => setFocusedInput("none")}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Already have an account? </Text>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.bottomSign}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomTriangle}>
        <Text style={styles.bottomSlogan}>GREAT.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    height: "100%",
  },
  topTriangle: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: COLORS.primary,
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    borderWidth: 120,
  },
  bottomTriangle: {
    position: "absolute",
    right: 0,
    bottom: 0,
    borderColor: COLORS.primary,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderWidth: 120,
  },
  topSlogan: {
    position: "absolute",
    top: -16,
    left: -64,
    color: COLORS.textOne,
    fontSize: 64,
    fontWeight: "bold",
  },
  bottomSlogan: {
    position: "absolute",
    top: -16,
    right: -64,
    color: COLORS.textOne,
    fontSize: 64,
    fontWeight: "bold",
  },
  input: {
    marginTop: 8,
    marginBottom: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.textTwo,
    color: COLORS.textOne,
    fontSize: 18,
  },
  button: {
    marginTop: 16,
    marginBottom: 16,
    padding: 8,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.textOne,
    fontSize: 18,
    fontWeight: FONTS.xbold,
    textAlign: "center",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
  },
  bottomText: {
    color: COLORS.textTwo,
  },
  bottomButton: {},
  bottomSign: {
    color: COLORS.primary,
    fontWeight: FONTS.xbold,
  },
});

export default SignUn;
