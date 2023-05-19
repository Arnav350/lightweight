import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext, AuthProvider } from "./hooks/useAuth";

import Loading from "./pages/auth/Loading";
import UserStack from "./stacks/UserStack";
import AuthStack from "./stacks/AuthStack";

function RootNavigator() {
  const currentUser = useContext(AuthContext);

  if (currentUser === undefined) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {currentUser?.emailVerified ? <UserStack /> : <AuthStack />}
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
