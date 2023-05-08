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
        <Text>SignIn</Text>
        <TextInput
          placeholder="Username"
          keyboardAppearance="dark"
          maxLength={20}
        />
        <Text>
          Don't have an account?{" "}
          <TouchableOpacity>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity>
          <Text>Sign In</Text>
        </TouchableOpacity>
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
