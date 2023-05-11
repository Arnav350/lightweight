import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../constants/theme";

type TRootStackParamList = {
  Signin: undefined;
  Signup: undefined;
};

type TProps = StackScreenProps<TRootStackParamList>;

function SignUp(props: TProps) {
  const [focusedInput, setFocusedInput] = useState<string>("none");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handlePress() {
    if (!(!email || !password)) {
      signInWithEmailAndPassword(auth, email, password)
        .then()
        .catch((error) => {
          alert(error.message);
        });
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <TextInput
          value={email}
          placeholder="Email"
          placeholderTextColor={COLORS.gray}
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
            placeholderTextColor={COLORS.gray}
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
            activeOpacity={0.5}
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Icon name="eye-off-outline" size={28} color={COLORS.gray} />
            ) : (
              <Icon name="eye-outline" size={28} color={COLORS.gray} />
            )}
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.passwordForgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.button}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Don't have an account? </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate("Signup")}
          >
            <Text style={styles.bottomSign}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    backgroundColor: COLORS.black,
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
    left: 104,
    bottom: -48,
    color: COLORS.black,
    fontSize: 72,
    fontWeight: "800",
    transform: [{ rotate: "30deg" }],
  },
  secondTopText: {
    position: "absolute",
    zIndex: -1,
    left: 104,
    bottom: -48,
    color: COLORS.primary,
    fontSize: 72,
    fontWeight: "800",
    transform: [{ rotate: "30deg" }],
  },
  firstBottomText: {
    position: "absolute",
    top: -32,
    right: 64,
    color: COLORS.black,
    fontSize: 72,
    fontWeight: "800",
    transform: [{ rotate: "30deg" }],
  },
  secondBottomText: {
    position: "absolute",
    zIndex: -1,
    top: -32,
    right: 64,
    color: COLORS.primary,
    fontSize: 72,
    fontWeight: "800",
    transform: [{ rotate: "30deg" }],
  },
  logo: {
    height: 196,
    width: 196,
    alignSelf: "center",
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
    borderBottomColor: COLORS.gray,
    color: COLORS.white,
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
  passwordForgot: {
    color: COLORS.primary,
    fontWeight: "600",
    textAlign: "right",
  },
  button: {
    marginTop: 16,
    marginBottom: 16,
    padding: 8,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
  },
  bottomText: {
    color: COLORS.gray,
  },
  bottomSign: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});

export default SignUp;
