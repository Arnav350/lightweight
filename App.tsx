import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Nav from "./components/nav/Nav";

import { COLORS } from "./constants/theme";

function App() {
  return (
    <NavigationContainer>
      <Nav />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default App;
