import { createStackNavigator } from "@react-navigation/stack";

import Connect from "../pages/user/connect/Connect";
import New from "../pages/user/connect/New";
import Room from "../pages/user/connect/Room";

const Stack = createStackNavigator<TConnectStackParamList>();

export function ConnectStack() {
  return (
    <Stack.Navigator initialRouteName="Connect" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Connect" component={Connect} />
      <Stack.Screen name="New" component={New} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}