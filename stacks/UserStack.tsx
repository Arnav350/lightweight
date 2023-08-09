import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/Ionicons";

import { GymStack } from "./GymStack";
import { NutritionStack } from "./NutritionStack";
import { ConnectStack } from "./ConnectStack";
import Compete from "../pages/user/compete/Compete";
import Profile from "../pages/user/profile/Profile";
import { COLORS } from "../constants/theme";

export type TTabParamsList = {
  GymStack: NavigatorScreenParams<TGymStackParamList>;
  NutritionStack: NavigatorScreenParams<TNutritionStackParamList>;
  Compete: undefined;
  ConnectStack: NavigatorScreenParams<TConnectStackParamList>;
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
          } else if (routeName === "ConnectStack") {
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
      <Tab.Screen name="ConnectStack" component={ConnectStack} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default UserStack;
