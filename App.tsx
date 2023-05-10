import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Nav from "./components/nav/Nav";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Workout from "./components/workout/Workout";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signin"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Signin" component={SignIn} />
        <Stack.Screen name="Signup" component={SignUp} />
      </Stack.Navigator>
      {/* <Nav /> */}
    </NavigationContainer>
  );
}

export default App;
