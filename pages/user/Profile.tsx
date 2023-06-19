import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "../../supabase";
import { initExercises } from "../../constants/init";

function Profile() {
  function handlePress() {
    AsyncStorage.setItem(`@exercises`, JSON.stringify(initExercises));
    AsyncStorage.multiRemove([`@currentWorkout`, `@workouts`, `@routines`, `@meals`, `@recipes`]);
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
      <TouchableOpacity
        onPress={async () => await AsyncStorage.getItem(`@exercises`).then((j) => j && console.log(JSON.parse(j)))}
      >
        <Text>Check Exercises</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default Profile;
