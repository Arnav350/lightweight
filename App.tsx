import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext, AuthProvider } from "./hooks/useAuth";

import Loading from "./pages/auth/Loading";
import Workout from "./components/workout/Workout";
import UserStack from "./stacks/UserStack";
import AuthStack from "./stacks/AuthStack";

import { createStackNavigator } from "@react-navigation/stack";

export type TWorkoutStackParamList = {
  UserStack: undefined;
  Workout: undefined;
  Gym: undefined;
};

const Stack = createStackNavigator<TWorkoutStackParamList>();

function RootNavigator() {
  const currentUser = useContext(AuthContext);

  if (currentUser === undefined) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {currentUser ? (
        <Stack.Navigator
          initialRouteName="UserStack"
          screenOptions={{ headerShown: false }}
        >
          {/* <Stack.Screen name="UserStack" component={UserStack} /> */}
          <Stack.Screen name="Workout" component={Workout} />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
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
