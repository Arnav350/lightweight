import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";

import Gym from "./pages/Gym";
import Workout from "./components/workout/Workout";

function App() {
  return (
    <SafeAreaView style={{ backgroundColor: "#111" }}>
      {/* <Gym /> */}
      <Workout />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
