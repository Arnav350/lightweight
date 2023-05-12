import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext, AuthProvider } from "./hooks/useAuth";

import Tabs from "./components/nav/Tabs";
import Stacks from "./components/nav/Stacks";

function RootNavigator() {
  const currentUser = useContext(AuthContext);

  return (
    <NavigationContainer>
      {currentUser ? <Tabs /> : <Stacks />}
    </NavigationContainer>
  );
}

function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

export default App;
