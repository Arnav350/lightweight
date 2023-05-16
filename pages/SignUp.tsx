import { useEffect, useState } from "react";
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

import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../constants/theme";

type TRootStackParamList = {
  Signin: undefined;
  Signup: undefined;
};

type TProps = StackScreenProps<TRootStackParamList>;

interface IErrors {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/;

function SignUp(props: TProps) {
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

  useEffect(() => {
    if (
      !(
        errors.username ||
        errors.email ||
        errors.password ||
        errors.confirm ||
        !username
      )
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          setDoc(doc(db, "users", user.user.uid), {
            uid: user.user.uid,
            displayName: username,
            email,
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [errors]);

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.error}>{errors.username}</Text>
        <TextInput
          value={username}
          placeholder="Username"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          style={
            focusedInput === "username"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onChangeText={setUsername}
          onFocus={() => setFocusedInput("username")}
          onBlur={() => setFocusedInput("none")}
        />
        <Text style={styles.error}>{errors.email}</Text>
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
        <Text style={styles.error}>{errors.password}</Text>
        <View>
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
        </View>
        <Text style={styles.error}>{errors.confirm}</Text>
        <TextInput
          value={confirm}
          placeholder="Confirm Password"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          secureTextEntry={showPassword ? false : true}
          style={
            focusedInput === "confirm"
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onChangeText={setConfirm}
          onFocus={() => setFocusedInput("confirm")}
          onBlur={() => setFocusedInput("none")}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.button}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <Text style={styles.or}>OR</Text>
        </View>
        <View style={styles.logosContainer}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              source={require("../assets/apple.png")}
              style={styles.apple}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              source={require("../assets/google.png")}
              style={styles.google}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Already have an account? </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate("Signin")}
        >
          <Text style={styles.bottomSign}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: COLORS.blackTwo,
    height: "100%",
  },
  header: {
    margin: 32,
    marginBottom: -32,
    color: COLORS.white,
    fontSize: 48,
    fontWeight: "500",
  },
  formContainer: {
    padding: 32,
  },
  logo: {
    marginBottom: -24,
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
    width: 120,
    marginBottom: 24,
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
