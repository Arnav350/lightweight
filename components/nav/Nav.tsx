import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";

import Gym from "../../pages/Gym";
import Nutrition from "../../pages/Nutrition";
import Connect from "../../pages/Connect";
import Profile from "../../pages/Profile";

const Tab = createBottomTabNavigator();

function Nav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName:
            | "barbell"
            | "barbell-outline"
            | "chatbox"
            | "chatbox-outline"
            | "fast-food"
            | "fast-food-outline"
            | "chatbox"
            | "chatbox-outline"
            | "person-circle"
            | "person-circle-outline" = "barbell";
          let routeName = route.name;

          if (routeName === "Workout") {
            iconName = focused ? "barbell" : "barbell-outline";
          } else if (routeName === "Nutrition") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (routeName === "Connect") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          } else if (routeName === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
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

export default Nav;
