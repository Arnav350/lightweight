import { createStackNavigator } from "@react-navigation/stack";

import Gym from "../pages/user/gym/Gym";
import Progress from "../pages/user/gym/Progress";
import Design from "../pages/user/gym/Design";
import Select from "../pages/user/gym/Select";
import Routine from "../pages/user/gym/Routine";

const Stack = createStackNavigator<TGymStackParamList>();

export function GymStack() {
  return (
    <Stack.Navigator initialRouteName="Gym" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Gym" component={Gym} />
      <Stack.Screen name="Progress" component={Progress} />
      <Stack.Screen name="Design" component={Design} />
      <Stack.Screen name="Select" component={Select} />
      <Stack.Screen name="Routine" component={Routine} />
    </Stack.Navigator>
  );
}
