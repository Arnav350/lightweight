import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { UserCredential } from "firebase/auth";

import SignIn from "../pages/auth/SignIn";
import Forgot from "../pages/auth/Forgot";
import SignUp from "../pages/auth/SignUp";
import Verification from "../pages/auth/Verification";
import { AuthContext } from "../hooks/useAuth";

export type TAuthStackParamList = {
  Signin: undefined;
  Forgot: undefined;
  Signup: undefined;
  Verification: { newUser: UserCredential };
};

const Stack = createStackNavigator<TAuthStackParamList>();

function AuthStack() {
  const currentUser = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName={currentUser?.emailVerified ? `Verification` : `Signin`}
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
