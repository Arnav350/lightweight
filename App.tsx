import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import Nav from "./components/nav/Nav";

import SignIn from "./pages/SignIn";

function App() {
  return (
    <NavigationContainer>
      <SignIn />
      {/* <Nav /> */}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default App;
