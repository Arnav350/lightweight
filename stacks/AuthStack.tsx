import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../pages/auth/SignIn";
import Forgot from "../pages/auth/Forgot";
import SignUp from "../pages/auth/SignUp";
import Verification from "../pages/auth/Verification";

export type TAuthStackParamList = {
  Signin: undefined;
  Forgot: undefined;
  Signup: undefined;
  Verification: { email: string };
};

const Stack = createStackNavigator<TAuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Signin" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" component={SignIn} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
}

export default AuthStack;
