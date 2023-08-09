import { createStackNavigator } from "@react-navigation/stack";

import Nutrition from "../pages/user/nutrition/Nutrition";
import Reminder from "../pages/user/nutrition/Reminder";
import Macro from "../pages/user/nutrition/Macro";
import Weight from "../pages/user/nutrition/Weight";
import Repast from "../pages/user/nutrition/Repast";
import Create from "../pages/user/nutrition/Create";
import Recipe from "../pages/user/nutrition/Recipe";
import Search from "../pages/user/nutrition/Search";

const Stack = createStackNavigator<TNutritionStackParamList>();

export function NutritionStack() {
  return (
    <Stack.Navigator initialRouteName="Nutrition" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Nutrition" component={Nutrition} />
      <Stack.Screen name="Reminder" component={Reminder} />
      <Stack.Screen name="Macro" component={Macro} />
      <Stack.Screen name="Weight" component={Weight} />
      <Stack.Screen name="Repast" component={Repast} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}
