import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "../../supabase";

function Profile() {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => supabase.auth.signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => await AsyncStorage.clear()}>
        <Text>Remove Data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default Profile;
