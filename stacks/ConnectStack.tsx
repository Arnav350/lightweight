import { createStackNavigator } from "@react-navigation/stack";

import Connect from "../pages/user/connect/Connect";
import Story from "../pages/user/connect/Story";
import New from "../pages/user/connect/New";
import Room from "../pages/user/connect/Room";
import Profile from "../pages/user/connect/Profile";

const Stack = createStackNavigator<TConnectStackParamList>();

export function ConnectStack() {
  return (
    <Stack.Navigator initialRouteName="Connect" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Connect" component={Connect} />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen name="New" component={New} />
      <Stack.Screen name="Room" component={Room} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
