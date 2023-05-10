import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth } from "../firebase";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../constants/theme";

interface IErrors {
  email: string;
  password: string;
}

function SignUp() {
  const [focusedInput, setFocusedInput] = useState<string>("none");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handlePress() {
    if (!(!email || !password)) {
      alert("GOOD");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topTriangle}>
        <Text style={styles.topSlogan}>BE.</Text>
      </View>
      <View>
        <TextInput
          value={email}
          placeholder="Email"
          placeholderTextColor={COLORS.textTwo}
          keyboardAppearance="dark"
          style={
            focusedInput === "email"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onChangeText={setEmail}
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput("none")}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            placeholder="Password"
            placeholderTextColor={COLORS.textTwo}
            keyboardAppearance="dark"
            secureTextEntry={showPassword ? false : true}
            style={
              focusedInput === "password"
                ? { ...styles.input, borderBottomColor: COLORS.primary }
                : { ...styles.input }
            }
            onChangeText={setPassword}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput("none")}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Icon name="eye-off-outline" size={28} color={COLORS.textTwo} />
            ) : (
              <Icon name="eye-outline" size={28} color={COLORS.textTwo} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.bottomSign}>Sign Up</Text>
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
    borderTopWidth: 80,
    borderBottomWidth: 80,
  },
  bottomTriangle: {
    position: "absolute",
    right: 0,
    bottom: 0,
    borderColor: COLORS.primary,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderWidth: 120,
    borderTopWidth: 80,
    borderBottomWidth: 80,
  },
  topSlogan: {
    position: "absolute",
    top: -16,
    left: -72,
    color: COLORS.textOne,
    fontSize: 64,
    fontWeight: "bold",
  },
  bottomSlogan: {
    position: "absolute",
    top: -16,
    right: -72,
    color: COLORS.textOne,
    fontSize: 64,
    fontWeight: "bold",
  },
  error: {
    maxWidth: 240,
    color: "#ff0000",
    fontSize: 14,
  },
  input: {
    marginBottom: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.textTwo,
    color: COLORS.textOne,
    fontSize: 18,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    top: 4,
    right: 8,
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
    fontWeight: "600",
    textAlign: "center",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
  },
  bottomText: {
    color: COLORS.textTwo,
  },
  bottomSign: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});

export default SignUp;
