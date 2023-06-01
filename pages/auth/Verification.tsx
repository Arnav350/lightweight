import React, { useContext, useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { TAuthStackParamList } from "../../stacks/AuthStack";

import { COLORS } from "../../constants/theme";

type TProps = StackScreenProps<TAuthStackParamList>;

function Verification({ navigation, route: { params } }: TProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Verification Link Sent!</Text>
        <Text style={styles.subheader}>
          We sent a confirmation email to {params?.email}. Check your email for a link to sign in.
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.text}>Didn't get an email?</Text>
        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Resend Email</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back to Sign Up</Text>
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
  headerContainer: {
    margin: 32,
  },
  header: {
    color: COLORS.white,
    fontSize: 48,
    fontWeight: "500",
  },
  subheader: {
    color: COLORS.white,
    fontSize: 16,
  },
  mainContainer: {
    margin: 32,
  },
  logo: {
    height: 192,
    width: 192,
    alignSelf: "center",
  },
  text: {
    margin: 8,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    paddingVertical: 16,
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Verification;
