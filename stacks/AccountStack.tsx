import { createStackNavigator } from "@react-navigation/stack";

import Account from "../pages/user/account/Account";
import Settings from "../pages/user/account/Settings";
import Profile from "../pages/user/account/Profile";
import Notifications from "../pages/user/account/Notifications";
import Blocked from "../pages/user/account/Blocked";
import Units from "../pages/user/account/Units";
import Theme from "../pages/user/account/Theme";
import Permissions from "../pages/user/account/Permissions";
import About from "../pages/user/account/About";
import Followers from "../pages/user/account/Followers";

const Stack = createStackNavigator<TAccountStackParamList>();

export function AccountStack() {
  return (
    <Stack.Navigator initialRouteName="Account" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Blocked" component={Blocked} />
      <Stack.Screen name="Units" component={Units} />
      <Stack.Screen name="Theme" component={Theme} />
      <Stack.Screen name="Permissions" component={Permissions} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}
