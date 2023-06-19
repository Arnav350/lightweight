import { useContext } from "react";
import { CompositeScreenProps, NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenProps, createStackNavigator } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import AuthStack from "./stacks/AuthStack";
import UserStack, { TTabParamsList } from "./stacks/UserStack";
import WorkoutStack, { TWorkoutStackParamList } from "./stacks/WorkoutStack";
import AuthProvider, { AuthContext } from "./hooks/useAuth";
import WorkoutProvider from "./hooks/useWorkout";
import Add from "./pages/shared/Add";
import Loading from "./pages/auth/Loading";
import { COLORS } from "./constants/theme";

export type TRootStackParamList = {
  UserStack: NavigatorScreenParams<TTabParamsList>;
  WorkoutStack: NavigatorScreenParams<TWorkoutStackParamList>;
  Add: undefined;
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
        <Stack.Navigator initialRouteName="UserStack" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="UserStack" component={UserStack} />
          <Stack.Screen name="WorkoutStack" component={WorkoutStack} />
          <Stack.Screen name="Add" component={Add} />
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
      <WorkoutProvider>
        <SafeAreaProvider>
          <RootNavigator />
          <StatusBar backgroundColor={COLORS.blackTwo} />
        </SafeAreaProvider>
      </WorkoutProvider>
    </AuthProvider>
  );
}

export default App;
