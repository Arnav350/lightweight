import { createStackNavigator } from "@react-navigation/stack";

import Account from "../pages/user/account/Account";
import Settings from "../pages/user/account/Settings";
import Followers from "../pages/user/account/Followers";

const Stack = createStackNavigator<TAccountStackParamList>();

export function AccountStack() {
  return (
    <Stack.Navigator initialRouteName="Account" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
