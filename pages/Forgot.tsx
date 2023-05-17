import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { TAuthStackParamList } from "../components/nav/AuthStack";

import { COLORS } from "../constants/theme";

type TProps = StackScreenProps<TAuthStackParamList>;

function Forgot(props: TProps) {
  const [email, setEmail] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  function handlePress() {}

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      <KeyboardAvoidingView style={styles.formContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <TextInput
          value={email}
          placeholder="Enter Email"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          style={
            focused
              ? { ...styles.input, borderBottomColor: COLORS.primary }
              : { ...styles.input }
          }
          onChangeText={setEmail}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.button}
          onPress={handlePress}
        >
          <Text style={styles.text}>Send Email</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => props.navigation.goBack()}
      >
        <Text style={styles.text}>Back to Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.blackOne,
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
  button: {
    marginVertical: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  text: {
    paddingVertical: 16,
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Forgot;
