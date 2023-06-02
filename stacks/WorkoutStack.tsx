import { StackScreenProps, createStackNavigator } from "@react-navigation/stack";

import { WorkoutProvider } from "../hooks/useWorkout";

import Workout from "../pages/workout/Workout";
import Add from "../pages/workout/Add";

export type TWorkoutStackParamList = {
  Workout: undefined;
  Add: undefined;
};

export type TWorkoutProps = StackScreenProps<TWorkoutStackParamList>;

const Stack = createStackNavigator<TWorkoutStackParamList>();

function WorkoutStack() {
  return (
    <WorkoutProvider>
      <Stack.Navigator initialRouteName="Workout" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Workout" component={Workout} />
        <Stack.Screen name="Add" component={Add} />
      </Stack.Navigator>
    </WorkoutProvider>
  );
}

export default WorkoutStack;
