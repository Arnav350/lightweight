import { createStackNavigator } from "@react-navigation/stack";
import { UserCredential } from "firebase/auth";

import SignIn from "../../pages/SignIn";
import Forgot from "../../pages/Forgot";
import SignUp from "../../pages/SignUp";
import Verification from "../../pages/Verification";

export type TAuthStackParamList = {
  Signin: undefined;
  Forgot: undefined;
  Signup: undefined;
  Verification: { newUser: UserCredential };
};

const Stack = createStackNavigator<TAuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Signin" component={SignIn} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
}

export default AuthStack;
