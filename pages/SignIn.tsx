import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, FONTS } from "../constants/theme";

function SignIn() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Sign In</Text>
        <TextInput
          placeholder="Email"
          keyboardAppearance="dark"
          maxLength={20}
        />
        <TextInput
          placeholder="Password"
          keyboardAppearance="dark"
          maxLength={20}
        />
        <TouchableOpacity>
          <Text>Sign In</Text>
        </TouchableOpacity>
        <Text>
          Don't have an account?{" "}
          <TouchableOpacity>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </Text>
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
});

export default SignIn;
