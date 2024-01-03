import { useContext } from "react";
import { CompositeScreenProps, NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenProps, createStackNavigator } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import AuthStack from "./stacks/AuthStack";
import UserStack, { TTabParamsList } from "./stacks/UserStack";
import AuthProvider, { AuthContext } from "./hooks/useAuth";
import ConnectProvider from "./hooks/useConnect";
import WorkoutProvider from "./hooks/useWorkout";
import NutritionProvider from "./hooks/useNutrition";
import Workout from "./pages/workout/Workout";
import Exercises from "./pages/shared/Exercises";
import Loading from "./pages/auth/Loading";
import { COLORS } from "./constants/theme";

export type TRootStackParamList = {
  UserStack: NavigatorScreenParams<TTabParamsList>;
  Workout: undefined;
  Exercises: { i: number };
};

export type TCompositeProps = CompositeScreenProps<
  BottomTabScreenProps<TTabParamsList>,
  StackScreenProps<TRootStackParamList>
>;

const Stack = createStackNavigator<TRootStackParamList>();

function RootNavigator() {
  const { currentUser } = useContext(AuthContext);

  if (currentUser === undefined) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {currentUser ? (
        <Stack.Navigator initialRouteName="UserStack" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="UserStack" component={UserStack} />
          <Stack.Screen name="Workout" component={Workout} />
          <Stack.Screen name="Exercises" component={Exercises} />
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
      <ConnectProvider>
        <WorkoutProvider>
          <NutritionProvider>
            <SafeAreaProvider>
              <RootNavigator />
              <StatusBar backgroundColor={COLORS.blackTwo} />
            </SafeAreaProvider>
          </NutritionProvider>
        </WorkoutProvider>
      </ConnectProvider>
    </AuthProvider>
  );
}

export default App;
