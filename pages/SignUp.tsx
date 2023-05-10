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
import { createUserWithEmailAndPassword } from "firebase/auth";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../constants/theme";

interface IErrors {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/;

function SignUp() {
  const [focusedInput, setFocusedInput] = useState<string>("none");

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [errors, setErrors] = useState<IErrors>({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  function handleUsernameBlur() {
    setFocusedInput("none");

    if (username.trim() === "") {
      setErrors({ ...errors, username: "Username is required" });
    } else if (username.length < 3) {
      setErrors({
        ...errors,
        username: "Username must be at least 3 characters",
      });
    } else if (username.length > 20) {
      setErrors({
        ...errors,
        username: "Username must be at most 20 characters",
      });
    } else {
      setErrors({ ...errors, username: "" });
    }
  }

  function handleEmailBlur() {
    setFocusedInput("none");

    if (email.trim() === "") {
      setErrors({ ...errors, email: "Email is required" });
    } else if (!email.match(emailRegex)) {
      setErrors({ ...errors, email: "Invalid email address" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  }

  function handlePasswordBlur() {
    setFocusedInput("none");

    if (password.trim() === "") {
      setErrors({ ...errors, password: "Password is required" });
    } else if (password.length < 6) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters",
      });
    } else if (password.length > 20) {
      setErrors({
        ...errors,
        password: "Password must be at most 20 characters",
      });
    } else if (!password.match(passwordRegex)) {
      setErrors({
        ...errors,
        password:
          "Password must contain a special character and uppercase letter",
      });
    } else {
      setErrors({ ...errors, password: "" });
    }
  }

  function handleConfirmBlur() {
    setFocusedInput("none");

    if (confirm.trim() === "") {
      setErrors({
        ...errors,
        confirm: "Confirm password is required",
      });
    } else if (confirm !== password) {
      setErrors({ ...errors, confirm: "Passwords do not match" });
    } else {
      setErrors({ ...errors, confirm: "" });
    }
  }

  function handlePress() {
    if (
      !(
        errors.username ||
        errors.email ||
        errors.password ||
        errors.confirm ||
        !username ||
        !email ||
        !password ||
        !confirm
      )
    ) {
      alert("GOOD");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topTriangle}>
        <View style={styles.layerTriangle}>
          <Text style={styles.firstTopText}>BE.</Text>
        </View>
        <Text style={styles.secondTopText}>BE.</Text>
      </View>
      <View>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.error}>{errors.username}</Text>
        <TextInput
          value={username}
          placeholder="Username"
          placeholderTextColor={COLORS.textTwo}
          keyboardAppearance="dark"
          style={
            focusedInput === "username"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onChangeText={setUsername}
          onFocus={() => setFocusedInput("username")}
          onBlur={handleUsernameBlur}
        />
        <Text style={styles.error}>{errors.email}</Text>
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
          onBlur={handleEmailBlur}
        />
        <Text style={styles.error}>{errors.password}</Text>
        <View>
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
            onBlur={handlePasswordBlur}
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
        <Text style={styles.error}>{errors.confirm}</Text>
        <TextInput
          value={confirm}
          placeholder="Confirm Password"
          placeholderTextColor={COLORS.textTwo}
          keyboardAppearance="dark"
          secureTextEntry={showPassword ? false : true}
          style={
            focusedInput === "confirm"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onChangeText={setConfirm}
          onFocus={() => setFocusedInput("confirm")}
          onBlur={handleConfirmBlur}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.bottomSign}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomTriangle}>
        <View style={styles.layerTriangle}>
          <Text style={styles.firstBottomText}>GREAT.</Text>
        </View>
        <Text style={styles.secondBottomText}>GREAT.</Text>
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
    top: -48,
    left: -72,
    width: 400,
    height: 160,
    transform: [{ rotate: "-30deg" }],
  },
  bottomTriangle: {
    position: "absolute",
    right: -72,
    bottom: -48,
    width: 400,
    height: 160,
    transform: [{ rotate: "-30deg" }],
  },
  layerTriangle: {
    height: "100%",
    backgroundColor: COLORS.primary,
    overflow: "hidden",
  },
  firstTopText: {
    position: "absolute",
    left: 96,
    bottom: -60,
    color: COLORS.background,
    fontSize: 96,
    fontWeight: "800",
    transform: [{ rotate: "30deg" }],
  },
  secondTopText: {
    position: "absolute",
    zIndex: -1,
    left: 96,
    bottom: -60,
    color: COLORS.primary,
    fontSize: 96,
    fontWeight: "800",
    transform: [{ rotate: "30deg" }],
  },
  firstBottomText: {
    position: "absolute",
    top: -60,
    right: 40,
    color: COLORS.background,
    fontSize: 96,
    fontWeight: "800",
    transform: [{ rotate: "30deg" }],
  },
  secondBottomText: {
    position: "absolute",
    zIndex: -1,
    top: -60,
    right: 40,
    color: COLORS.primary,
    fontSize: 96,
    fontWeight: "800",
    transform: [{ rotate: "30deg" }],
  },

  logo: {
    marginBottom: -24,
    height: 256,
    width: 256,
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
    justifyContent: "center",
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
