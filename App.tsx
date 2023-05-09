import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import Nav from "./components/nav/Nav";

import SignUp from "./pages/SignUp";
import Workout from "./components/workout/Workout";

function App() {
  return (
    <NavigationContainer>
      <SignUp />
      {/* <Nav /> */}
      {/* <Workout /> */}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default App;
