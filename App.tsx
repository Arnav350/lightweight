import { useContext } from "react";
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenProps, createStackNavigator } from "@react-navigation/stack";

import AuthStack from "./stacks/AuthStack";
import UserStack, { TTabStackParamsList } from "./stacks/UserStack";
import { AuthContext, AuthProvider } from "./hooks/useAuth";
import { WorkoutProvider } from "./hooks/useWorkout";
import Loading from "./pages/auth/Loading";
import Add from "./pages/workout/Add";
import Workout from "./pages/workout/Workout";

export type TWorkoutStackParamList = {
  UserStack: NavigatorScreenParams<TTabStackParamsList>;
  Workout: undefined;
  Add: undefined;
};

export type TWorkoutProps = StackScreenProps<TWorkoutStackParamList>;

const Stack = createStackNavigator<TWorkoutStackParamList>();

function RootNavigator() {
  const currentUser = useContext(AuthContext);

  if (currentUser === undefined) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {currentUser ? (
        <Stack.Navigator initialRouteName="UserStack" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="UserStack" component={UserStack} />
          <WorkoutProvider>
            <Stack.Screen name="Workout" component={Workout} />
            <Stack.Screen name="Add" component={Add} />
          </WorkoutProvider>
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
