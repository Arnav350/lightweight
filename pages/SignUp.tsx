import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

import { COLORS, FONTS } from "../constants/theme";

function SignUn() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Sign Up</Text>
        <TouchableOpacity>
          <Text>Avatar</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Username"
          keyboardAppearance="dark"
          maxLength={20}
        />
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
        <TextInput
          placeholder="Confirm Password"
          keyboardAppearance="dark"
          maxLength={20}
        />
        <Text>
          Already have an account?{" "}
          <TouchableOpacity>
            <Text>Sign Ip</Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity>
          <Text>Sign Un</Text>
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

export default SignUn;
