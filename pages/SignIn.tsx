import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
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

import { TAuthStackParamList } from "../components/nav/AuthStack";

import { COLORS } from "../constants/theme";

type TProps = StackScreenProps<TAuthStackParamList>;

function SignUp(props: TProps) {
  const [focusedInput, setFocusedInput] = useState<string>("none");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  async function handlePress() {
    if (!(!email || !password)) {
      await signInWithEmailAndPassword(auth, email, password)
        .then()
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Sign In</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
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
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate("Forgot")}
          >
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
        <View style={styles.orContainer}>
          <Text style={styles.or}>OR</Text>
        </View>
        <View style={styles.logosContainer}>
          {Platform.OS === "ios" && (
            <TouchableOpacity style={styles.logoContainer}>
              <Image
                source={require("../assets/apple.png")}
                style={styles.apple}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              source={require("../assets/google.png")}
              style={styles.google}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Don't have an account? </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate("Signup")}
        >
          <Text style={styles.bottomSign}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.blackTwo,
  },
  header: {
    margin: 32,
    color: COLORS.white,
    fontSize: 48,
    fontWeight: "500",
  },
  formContainer: {
    padding: 32,
  },
  logo: {
    height: 192,
    width: 192,
    alignSelf: "center",
  },
  input: {
    marginVertical: 8,
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
    top: 12,
    right: 8,
  },
  passwordForgot: {
    color: COLORS.primary,
    fontWeight: "500",
    textAlign: "right",
  },
  button: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  orContainer: {
    width: 120,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
    alignSelf: "center",
  },
  or: {
    top: 10,
    paddingRight: 10,
    paddingLeft: 10,
    width: 40,
    backgroundColor: COLORS.blackTwo,
    color: COLORS.gray,
    alignSelf: "center",
  },
  logosContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  logoContainer: {
    marginHorizontal: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    borderRadius: 8,
  },
  apple: {
    marginRight: 2,
    marginLeft: 2,
    height: 32,
    width: 27,
  },
  google: {
    height: 32,
    width: 31,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomText: {
    color: COLORS.gray,
  },
  bottomSign: {
    color: COLORS.primary,
    fontWeight: "500",
  },
});

export default SignUp;
