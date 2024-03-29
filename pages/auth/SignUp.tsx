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
import { StackScreenProps } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { supabase } from "../../supabase";
import { TAuthStackParamList } from "../../stacks/AuthStack";
import { exploreRoutines, initExercises, initPresets } from "../../constants/init";
import { COLORS } from "../../constants/theme";

type TProps = StackScreenProps<TAuthStackParamList>;

interface IErrors {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

const emailRegex: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/;

function SignUp({ navigation }: TProps) {
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

  async function handlePress() {
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
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
          },
        },
      });

      if (error) {
        alert(error.message);
      } else {
        navigation.navigate("Verification", { email });

        AsyncStorage.setItem("@exercises", JSON.stringify(initExercises));
        AsyncStorage.setItem("@routines", JSON.stringify(exploreRoutines));
        AsyncStorage.setItem("@presets", JSON.stringify(initPresets));
      }
    }
  }

  function handleUsernameBlur() {
    setFocusedInput("none");

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
  }

  function handleEmailBlur() {
    setFocusedInput("none");

    if (email.trim() === "") {
      setErrors((errors) => ({ ...errors, email: "Email is required" }));
    } else if (!email.match(emailRegex)) {
      setErrors((errors) => ({ ...errors, email: "Invalid email address" }));
    } else {
      setErrors((errors) => ({ ...errors, email: "" }));
    }
  }

  function handlePasswordBlur() {
    setFocusedInput("none");

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
        password: "Password must contain a special character and uppercase letter",
      }));
    } else {
      setErrors((errors) => ({ ...errors, password: "" }));
    }
  }

  function handleConfirmBlur() {
    setFocusedInput("none");

    if (confirm.trim() === "") {
      setErrors((errors) => ({
        ...errors,
        confirm: "Confirm password is required",
      }));
    } else if (confirm !== password) {
      setErrors((errors) => ({ ...errors, confirm: "Passwords do not match" }));
    } else {
      setErrors((errors) => ({ ...errors, confirm: "" }));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.formContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.error}>{errors.username}</Text>
        <TextInput
          value={username}
          placeholder="Username"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          style={focusedInput === "username" ? { ...styles.input, borderBottomColor: COLORS.primary } : styles.input}
          onChangeText={setUsername}
          onFocus={() => setFocusedInput("username")}
          onBlur={handleUsernameBlur}
        />
        <Text style={styles.error}>{errors.email}</Text>
        <TextInput
          value={email}
          placeholder="Email"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          style={focusedInput === "email" ? { ...styles.input, borderBottomColor: COLORS.primary } : styles.input}
          onChangeText={setEmail}
          onFocus={() => setFocusedInput("email")}
          onBlur={handleEmailBlur}
        />
        <Text style={styles.error}>{errors.password}</Text>
        <View>
          <TextInput
            value={password}
            placeholder="Password"
            placeholderTextColor={COLORS.gray}
            keyboardAppearance="dark"
            secureTextEntry={!showPassword}
            style={focusedInput === "password" ? { ...styles.input, borderBottomColor: COLORS.primary } : styles.input}
            onChangeText={setPassword}
            onFocus={() => setFocusedInput("password")}
            onBlur={handlePasswordBlur}
          />
          <TouchableOpacity activeOpacity={0.3} style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Icon name="eye-off-outline" size={28} color={COLORS.gray} />
            ) : (
              <Icon name="eye-outline" size={28} color={COLORS.gray} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.error}>{errors.confirm}</Text>
        <TextInput
          value={confirm}
          placeholder="Confirm Password"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          secureTextEntry={!showPassword}
          style={focusedInput === "confirm" ? { ...styles.input, borderBottomColor: COLORS.primary } : styles.input}
          onChangeText={setConfirm}
          onFocus={() => setFocusedInput("confirm")}
          onBlur={handleConfirmBlur}
        />
        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <Text style={styles.or}>OR</Text>
        </View>
        <View style={styles.logosContainer}>
          {Platform.OS === "ios" && (
            <TouchableOpacity style={styles.logoContainer}>
              <Image source={require("../../assets/apple.png")} style={styles.apple} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.logoContainer}>
            <Image source={require("../../assets/google.png")} style={styles.google} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Already have an account? </Text>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Signin")}>
          <Text style={styles.bottomSign}>Sign In</Text>
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
    marginTop: 32,
    marginLeft: 32,
    color: COLORS.white,
    fontSize: 48,
    fontWeight: "500",
  },
  formContainer: {
    paddingHorizontal: 32,
  },
  logo: {
    marginBottom: -24,
    height: 192,
    width: 192,
    alignSelf: "center",
  },
  error: {
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
  eyeButton: {
    position: "absolute",
    top: 4,
    right: 8,
  },
  passwordForgot: {
    color: COLORS.primary,
    fontWeight: "500",
    textAlign: "right",
  },
  button: {
    marginTop: 16,
    marginBottom: 8,
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
    marginBottom: 24,
    width: 120,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
    alignSelf: "center",
  },
  or: {
    top: 10,
    paddingHorizontal: 10,
    width: 40,
    backgroundColor: COLORS.blackTwo,
    color: COLORS.gray,
    alignSelf: "center",
  },
  logosContainer: {
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
    marginHorizontal: 2,
    height: 32,
    width: 27,
  },
  google: {
    height: 32,
    width: 31,
  },
  bottomContainer: {
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
