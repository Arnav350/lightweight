import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "../../../supabase";
import { ConnectContext } from "../../../hooks/useConnect";
import { exploreRoutines, initCurrentMeals, initExercises, initMacros, initPresets } from "../../../constants/init";

interface IProps {
  text: string;
  function: () => void;
}

function Button(props: IProps) {
  return (
    <TouchableOpacity style={{ padding: 8 }} onPress={props.function}>
      <Text>{props.text}</Text>
    </TouchableOpacity>
  );
}

function Account() {
  const { followers, followees, setFollowees, mutuals, setMutuals, connecteds, setConnecteds } =
    useContext(ConnectContext);

  function handlePress() {
    AsyncStorage.setItem("@exercises", JSON.stringify(initExercises));
    AsyncStorage.setItem("@presets", JSON.stringify(initPresets));
    AsyncStorage.setItem("@routines", JSON.stringify(exploreRoutines));
    AsyncStorage.setItem("@currentMeals", JSON.stringify(initCurrentMeals));
    AsyncStorage.setItem("@macros", JSON.stringify(initMacros));
    AsyncStorage.multiRemove([
      "@currentWorkout",
      "@workouts",
      "@resumeWorkout",
      "@meals",
      "@recipes",
      "@histories",
      "@reminders",
      "@weights",
      "@followers",
      "@followees",
      "@mutuals",
      "@connecteds",
    ]);
  }

  async function handleMePress() {
    if (followees.find((followee) => followee.profile.id === "7ab1dcc7-5b14-4e82-b3bc-3d5b5b0dbaee")) {
      const { error } = await supabase.from("followers").delete().match({
        followee_id: "7ab1dcc7-5b14-4e82-b3bc-3d5b5b0dbaee",
        follower_id: "78fd29da-f994-467c-a2bc-b847bac14b00",
      });

      if (error) {
        alert(error.message);
      } else {
        setFollowees((prevFollowees) =>
          prevFollowees.filter((prevFollowee) => prevFollowee.profile.id !== "7ab1dcc7-5b14-4e82-b3bc-3d5b5b0dbaee")
        );

        if (mutuals.find((mutual) => mutual.profile.id === "7ab1dcc7-5b14-4e82-b3bc-3d5b5b0dbaee")) {
          setMutuals((prevMutuals) =>
            prevMutuals.filter((prevMutual) => prevMutual.profile.id !== "7ab1dcc7-5b14-4e82-b3bc-3d5b5b0dbaee")
          );
        } else {
          setConnecteds((prevConnecteds) =>
            prevConnecteds.filter(
              (prevConnecteds) => prevConnecteds.profile.id !== "7ab1dcc7-5b14-4e82-b3bc-3d5b5b0dbaee"
            )
          );
        }
      }
    } else {
      const { error } = await supabase.from("followers").insert({
        followee_id: "7ab1dcc7-5b14-4e82-b3bc-3d5b5b0dbaee",
        follower_id: "78fd29da-f994-467c-a2bc-b847bac14b00",
        priority: 300,
      });

      function findIndex(array: IFollower[]) {
        let index: number = 0;
        while (index < array.length && array[index].priority >= 300) {
          index++;
        }
        return index;
      }

      if (error) {
        alert(error.message);
      } else {
        const followeesIndex = findIndex(followees);
        const profile: IProfile = {
          id: "7ab1dcc7-5b14-4e82-b3bc-3d5b5b0dbaee",
          name: "brian",
          username: "brian",
          picture: true,
        };

        if (connecteds.find((connected) => connected.profile.id === "7ab1dcc7-5b14-4e82-b3bc-3d5b5b0dbaee")) {
          setFollowees((prevFollowees) => [
            ...prevFollowees.slice(0, followeesIndex),
            { follower: true, priority: 300, profile },
            ...prevFollowees.slice(followeesIndex),
          ]);

          const mutualsIndex = findIndex(mutuals);
          setMutuals((prevMutuals) => [
            ...prevMutuals.slice(0, mutualsIndex),
            { follower: true, priority: 300, profile },
            ...prevMutuals.slice(mutualsIndex),
          ]);
        } else {
          setFollowees((prevFollowees) => [
            ...prevFollowees.slice(0, followeesIndex),
            { follower: false, priority: 300, profile },
            ...prevFollowees.slice(followeesIndex),
          ]);

          const connectedsIndex = findIndex(connecteds);
          setConnecteds((prevConnecteds) => [
            ...prevConnecteds.slice(0, connectedsIndex),
            { follower: false, priority: 300, profile },
            ...prevConnecteds.slice(connectedsIndex),
          ]);
        }
      }
    }
  }

  function handleFollowPress() {
    console.log("-------");
    console.log(followees);
    console.log(followers);
    console.log(mutuals);
    console.log(connecteds);
  }

  return (
    <SafeAreaView edges={["top", "right", "left"]}>
      <Button text="Sign Out" function={() => {}} />
      <Button text="Remove Data" function={async () => await AsyncStorage.clear()} />
      <Button text="Sent Init Data" function={handlePress} />
      <Button
        text="Check BarbellRow"
        function={async () =>
          await AsyncStorage.getItem("@exercises")
            .then((j) => (j ? console.log(JSON.parse(j)[0].sets) : console.log(j)))
            .catch((error) => console.log(error))
        }
      />
      <Button
        text="Check Routines"
        function={async () =>
          await AsyncStorage.getItem("@routines")
            .then((j) => (j ? console.log(JSON.parse(j)) : console.log(j)))
            .catch((error) => console.log(error))
        }
      />
      <Button
        text="Check ResumeWorkout"
        function={async () =>
          await AsyncStorage.getItem("@resumeWorkout")
            .then((j) => (j ? console.log(JSON.parse(j)) : console.log(j)))
            .catch((error) => console.log(error))
        }
      />
      <Button
        text="Check CurrentWorkout"
        function={async () =>
          await AsyncStorage.getItem("@currentWorkout")
            .then((j) => (j ? console.log(JSON.parse(j)) : console.log(j)))
            .catch((error) => console.log(error))
        }
      />
      <Button text="Un/Follow Brian" function={handleMePress} />
      <Button text="Check Follow" function={handleFollowPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default Account;
