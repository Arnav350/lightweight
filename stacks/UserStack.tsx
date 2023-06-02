import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackScreenProps, createStackNavigator } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/Ionicons";

import { WorkoutProvider } from "../hooks/useWorkout";
import { NutritionProvider } from "../hooks/useNutrition";
import Gym from "../pages/user/Gym";
import Select from "../pages/user/Select";
import Nutrition from "../pages/user/Nutrition";
import Repast from "../pages/user/Repast";
import Create from "../pages/user/Create";
import Recipes from "../pages/user/Recipes";
import Compete from "../pages/user/Compete";
import Connect from "../pages/user/Connect";
import Profile from "../pages/user/Profile";
import { TWorkoutStackParamList } from "../App";

import { COLORS } from "../constants/theme";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";

export type TGymStackParamList = {
  Gym: undefined;
  Select: undefined;
};

export type TGymProps = StackScreenProps<TGymStackParamList>;

const GStack = createStackNavigator<TGymStackParamList>();

function GymStack() {
  return (
    <WorkoutProvider>
      <GStack.Navigator initialRouteName="Gym" screenOptions={{ headerShown: false }}>
        <GStack.Screen name="Gym" component={Gym} />
        <GStack.Screen name="Select" component={Select} />
      </GStack.Navigator>
    </WorkoutProvider>
  );
}

export type TNutritionStackParamList = {
  Nutrition: undefined;
  Repast: { i: number; save: boolean | null };
  Create: { i: number; save: boolean };
  Recipes: { i: number; save: boolean | null };
};

export type TNutritionProps = StackScreenProps<TNutritionStackParamList>;

const NStack = createStackNavigator<TNutritionStackParamList>();

function NutritionStack() {
  return (
    <NutritionProvider>
      <NStack.Navigator initialRouteName="Nutrition" screenOptions={{ headerShown: false }}>
        <NStack.Screen name="Nutrition" component={Nutrition} />
        <NStack.Screen name="Repast" component={Repast} />
        <NStack.Screen name="Create" component={Create} />
        <NStack.Screen name="Recipes" component={Recipes} />
      </NStack.Navigator>
    </NutritionProvider>
  );
}

export type TTabStackParamsList = {
  GymStack: NavigatorScreenParams<TGymStackParamList>;
  NutritionStack: NavigatorScreenParams<TNutritionStackParamList>;
  Compete: undefined;
  Connect: undefined;
  Profile: undefined;
};

export type TCompositeParamList = CompositeScreenProps<
  BottomTabScreenProps<TTabStackParamsList>,
  StackScreenProps<TWorkoutStackParamList>
>;

const Tab = createBottomTabNavigator<TTabStackParamsList>();

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
