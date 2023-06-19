import { createStackNavigator } from "@react-navigation/stack";

import Workout from "../pages/workout/Workout";
import Add from "../pages/shared/Add";

export type TWorkoutStackParamList = {
  Workout: undefined;
};

const Stack = createStackNavigator<TWorkoutStackParamList>();

function WorkoutStack() {
  return (
    <Stack.Navigator initialRouteName="Workout" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Workout" component={Workout} />
    </Stack.Navigator>
  );
}

export default WorkoutStack;
