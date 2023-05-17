import { createStackNavigator } from "@react-navigation/stack";

import SignUp from "../../pages/SignUp";
import SignIn from "../../pages/SignIn";

type TStackParamList = {
  Signin: undefined;
  Signup: undefined;
};

const Stack = createStackNavigator<TStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Signin" component={SignIn} />
      <Stack.Screen name="Signup" component={SignUp} />
    </Stack.Navigator>
  );
}

export default AuthStack;
