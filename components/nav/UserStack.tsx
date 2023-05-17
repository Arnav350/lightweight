import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";

import Gym from "../../pages/Gym";
import Nutrition from "../../pages/Nutrition";
import Compete from "../../pages/Compete";
import Connect from "../../pages/Connect";
import Profile from "../../pages/Profile";

import { COLORS } from "../../constants/theme";

const Tab = createBottomTabNavigator();

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
          } else if (routeName === "Nutrition") {
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
        name="Nutrition"
        component={Nutrition}
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
