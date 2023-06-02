import { useContext } from "react";
import { CompositeScreenProps, NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenProps, createStackNavigator } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import AuthStack from "./stacks/AuthStack";
import UserStack, { TTabParamsList } from "./stacks/UserStack";
import WorkoutStack, { TWorkoutStackParamList } from "./stacks/WorkoutStack";
import { AuthContext, AuthProvider } from "./hooks/useAuth";
import { WorkoutProvider } from "./hooks/useWorkout";
import Loading from "./pages/auth/Loading";

export type TRootStackParamList = {
  UserStack: NavigatorScreenParams<TTabParamsList>;
  WorkoutStack: NavigatorScreenParams<TWorkoutStackParamList>;
};

export type TCompositeProps = CompositeScreenProps<
  BottomTabScreenProps<TTabParamsList>,
  StackScreenProps<TRootStackParamList>
>;

const Stack = createStackNavigator<TRootStackParamList>();

function RootNavigator() {
  const currentUser = useContext(AuthContext);

  if (currentUser === undefined) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {currentUser ? (
        <WorkoutProvider>
          <Stack.Navigator initialRouteName="UserStack" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UserStack" component={UserStack} />
            <Stack.Screen name="WorkoutStack" component={WorkoutStack} />
          </Stack.Navigator>
        </WorkoutProvider>
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
