import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/Ionicons";

import NutritionProvider from "../hooks/useNutrition";
import Gym from "../pages/user/gym/Gym";
import Progress from "../pages/user/gym/Progress";
import Design from "../pages/user/gym/Design";
import Select from "../pages/user/gym/Select";
import Routine from "../pages/user/gym/Routine";
import Nutrition from "../pages/user/nutrition/Nutrition";
import Reminder from "../pages/user/nutrition/Reminder";
import Macro from "../pages/user/nutrition/Macro";
import Weight from "../pages/user/nutrition/Weight";
import Repast from "../pages/user/nutrition/Repast";
import Create from "../pages/user/nutrition/Create";
import Recipes from "../pages/user/nutrition/Recipes";
import Search from "../pages/user/nutrition/Search";
import Compete from "../pages/user/compete/Compete";
import Connect from "../pages/user/connect/Connect";
import Profile from "../pages/user/profile/Profile";
import { COLORS } from "../constants/theme";

export type TGymStackParamList = {
  Gym: undefined;
  Progress: undefined;
  Design: { i: number };
  Select: undefined;
  Routine: { i: number };
};

const GStack = createStackNavigator<TGymStackParamList>();

function GymStack() {
  return (
    <GStack.Navigator initialRouteName="Gym" screenOptions={{ headerShown: false }}>
      <GStack.Screen name="Gym" component={Gym} />
      <GStack.Screen name="Progress" component={Progress} />
      <GStack.Screen name="Design" component={Design} />
      <GStack.Screen name="Select" component={Select} />
      <GStack.Screen name="Routine" component={Routine} />
    </GStack.Navigator>
  );
}

export type TNutritionStackParamList = {
  Nutrition: undefined;
  Reminder: undefined;
  Macro: undefined;
  Weight: undefined;
  Repast: { i: number; save: boolean | null };
  Create: { i: number; save: boolean };
  Recipes: { i: number; save: boolean | null };
  Search: { i: number; save: boolean | null };
};

const NStack = createStackNavigator<TNutritionStackParamList>();

function NutritionStack() {
  return (
    <NutritionProvider>
      <NStack.Navigator initialRouteName="Nutrition" screenOptions={{ headerShown: false }}>
        <NStack.Screen name="Nutrition" component={Nutrition} />
        <NStack.Screen name="Reminder" component={Reminder} />
        <NStack.Screen name="Macro" component={Macro} />
        <NStack.Screen name="Weight" component={Weight} />
        <NStack.Screen name="Repast" component={Repast} />
        <NStack.Screen name="Create" component={Create} />
        <NStack.Screen name="Recipes" component={Recipes} />
        <NStack.Screen name="Search" component={Search} />
      </NStack.Navigator>
    </NutritionProvider>
  );
}

export type TTabParamsList = {
  GymStack: NavigatorScreenParams<TGymStackParamList>;
  NutritionStack: NavigatorScreenParams<TNutritionStackParamList>;
  Compete: undefined;
  Connect: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TTabParamsList>();

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

          if (routeName === "GymStack") {
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
      <Tab.Screen name="GymStack" component={GymStack} options={{ headerShown: false }} />
      <Tab.Screen name="NutritionStack" component={NutritionStack} options={{ headerShown: false }} />
      <Tab.Screen name="Compete" component={Compete} options={{ headerShown: false }} />
      <Tab.Screen name="Connect" component={Connect} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default UserStack;
