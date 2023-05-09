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

interface IErrors {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

const emailRegex: string =
  '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/';
const passwordRegex: string = "/^(?=.*[A-Z])(?=.*[!@#$%^&*]).$/";

function SignUp() {
  const [focusedInput, setFocusedInput] = useState<string>("none");

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  function handlePress() {
    if (username.trim() === "") {
      setErrors((errors) => ({ ...errors, username: "Username is required" }));
    } else if (username.length < 3) {
      setErrors((errors) => ({
        ...errors,
        username: "Username must be at least 3 characters",
      }));
    } else if (username.length > 20) {
      setErrors((errors) => ({
        ...errors,
        username: "Username must be at most 20 characters",
      }));
    } else {
      setErrors((errors) => ({ ...errors, username: "" }));
    }

    if (email.trim() === "") {
      setErrors((errors) => ({ ...errors, email: "Email is required" }));
    } else if (!email.match(emailRegex)) {
      setErrors((errors) => ({ ...errors, email: "Invalid email address" }));
    } else {
      setErrors((errors) => ({ ...errors, email: "" }));
    }

    if (password.trim() === "") {
      setErrors((errors) => ({ ...errors, password: "Password is required" }));
    } else if (password.length < 6) {
      setErrors((errors) => ({
        ...errors,
        password: "Password must be at least 6 characters",
      }));
    } else if (password.length > 20) {
      setErrors((errors) => ({
        ...errors,
        password: "Password must be at most 20 characters",
      }));
    } else if (!password.match(passwordRegex)) {
      setErrors((errors) => ({
        ...errors,
        password:
          "Password must contain a special character and uppercase letter",
      }));
    } else {
      setErrors((errors) => ({ ...errors, password: "" }));
    }

    if (confirm !== password) {
      setErrors((errors) => ({ ...errors, confirm: "Passwords do not match" }));
    } else {
      setErrors((errors) => ({ ...errors, confirm: "" }));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topTriangle}>
        <Text style={styles.topSlogan}>BE.</Text>
      </View>
      <View>
        <Text style={{ color: "#ff0000" }}>{errors.username}</Text>
        <TextInput
          placeholder="Username"
          keyboardAppearance="dark"
          placeholderTextColor={
            focusedInput === "username" ? COLORS.primary : COLORS.textTwo
          }
          style={
            focusedInput === "username"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onChangeText={setUsername}
          onFocus={() => setFocusedInput("username")}
          onBlur={() => setFocusedInput("none")}
        />
        <Text style={{ color: "#ff0000" }}>{errors.email}</Text>
        <TextInput
          placeholder="Email"
          keyboardAppearance="dark"
          placeholderTextColor={
            focusedInput === "email" ? COLORS.primary : COLORS.textTwo
          }
          style={
            focusedInput === "email"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onChangeText={setEmail}
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput("none")}
        />
        <Text style={{ color: "#ff0000" }}>{errors.password}</Text>
        <TextInput
          placeholder="Password"
          keyboardAppearance="dark"
          placeholderTextColor={
            focusedInput === "password" ? COLORS.primary : COLORS.textTwo
          }
          style={
            focusedInput === "password"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onChangeText={setPassword}
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput("none")}
        />
        <Text style={{ color: "#ff0000" }}>{errors.confirm}</Text>
        <TextInput
          placeholder="Confirm Password"
          keyboardAppearance="dark"
          placeholderTextColor={
            focusedInput === "confirm" ? COLORS.primary : COLORS.textTwo
          }
          style={
            focusedInput === "confirm"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onChangeText={setConfirm}
          onFocus={() => setFocusedInput("confirm")}
          onBlur={() => setFocusedInput("none")}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Create Account</Text>
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

export default SignUp;
