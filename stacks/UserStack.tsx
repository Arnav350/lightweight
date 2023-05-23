import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";

import { MealProvider } from "../hooks/useMeal";

import Gym from "../pages/user/Gym";
import Nutrition from "../pages/user/Nutrition";
import Repast from "../pages/user/Repast";
import Compete from "../pages/user/Compete";
import Connect from "../pages/user/Connect";
import Profile from "../pages/user/Profile";

import { COLORS } from "../constants/theme";
import { createStackNavigator } from "@react-navigation/stack";

export type TNutritionStackParamList = {
  Nutrition: undefined;
  Repast: { i: number };
};

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator<TNutritionStackParamList>();

function NutritionStack() {
  return (
    <MealProvider>
      <Stack.Navigator
        initialRouteName="Nutrition"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Nutrition" component={Nutrition} />
        <Stack.Screen name="Repast" component={Repast} />
      </Stack.Navigator>
    </MealProvider>
  );
}

function UserStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: COLORS.blackTwo,
          borderTopColor: COLORS.blackTwo,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName:
            | "barbell"
            | "barbell-outline"
            | "fast-food"
            | "fast-food-outline"
            | "trophy"
            | "trophy-outline"
            | "chatbox"
            | "chatbox-outline"
            | "person-circle"
            | "person-circle-outline" = "barbell";
          let routeName = route.name;

          if (routeName === "Workout") {
            iconName = focused ? "barbell" : "barbell-outline";
          } else if (routeName === "NutritionStack") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (routeName === "Compete") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (routeName === "Connect") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          } else if (routeName === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
      })}
    >
      <Tab.Screen
        name="Workout"
        component={Gym}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="NutritionStack"
        component={NutritionStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Compete"
        component={Compete}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Connect"
        component={Connect}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default UserStack;
