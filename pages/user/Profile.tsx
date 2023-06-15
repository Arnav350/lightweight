import { useContext } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "../../supabase";
import { AuthContext } from "../../hooks/useAuth";
import { initExercises } from "../../constants/init";

function Profile() {
  const currentUser = useContext(AuthContext);

  async function handlePress() {
    try {
      await AsyncStorage.setItem(`@${currentUser?.id}:exercises`, JSON.stringify(initExercises));
      await AsyncStorage.multiRemove([
        `@${currentUser?.id}:currentWorkout`,
        `@${currentUser?.id}:workouts`,
        `@${currentUser?.id}:routines`,
        `@${currentUser?.id}:meals`,
        `@${currentUser?.id}:recipes`,
      ]);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => supabase.auth.signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => await AsyncStorage.clear()}>
        <Text>Remove Data</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress}>
        <Text>Set Init Data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default Profile;
