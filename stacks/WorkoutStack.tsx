import { createStackNavigator } from "@react-navigation/stack";

import Workout from "../pages/workout/Workout";
import Add from "../pages/workout/Add";

export type TWorkoutStackParamList = {
  Workout: undefined;
  Add: undefined;
};

const Stack = createStackNavigator<TWorkoutStackParamList>();

function WorkoutStack() {
  return (
    <Stack.Navigator initialRouteName="Workout" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Workout" component={Workout} />
      <Stack.Screen name="Add" component={Add} />
    </Stack.Navigator>
  );
}

export default WorkoutStack;
