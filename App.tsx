import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext, AuthProvider } from "./hooks/useAuth";

import Loading from "./pages/Loading";
import UserStack from "./components/nav/UserStack";
import AuthStack from "./components/nav/AuthStack";

function RootNavigator() {
  const currentUser = useContext(AuthContext);

  if (currentUser === undefined) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {currentUser ? <UserStack /> : <AuthStack />}
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
