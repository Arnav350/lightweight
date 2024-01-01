import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { supabase } from "../../../supabase";
import { AuthContext } from "../../../hooks/useAuth";
import { ConnectContext } from "../../../hooks/useConnect";
import NewProfile from "../../../components/connect/NewProfile";
import { COLORS } from "../../../constants/theme";

type TNewProps = StackScreenProps<TConnectStackParamList, "New">;

function New({ navigation }: TNewProps) {
  const currentUser = useContext(AuthContext);
  const { followers } = useContext(ConnectContext);

  const [input, setInput] = useState<string>("");
  // const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<IProfile[]>([]);

  // useEffect(() => {
  //   async function getSuggestedUsers() {
  //     const { data, error } = await supabase
  //       .from("followers")
  //       .select("priority, profile: profiles!follower_id(*)")
  //       .match({ followee_id: currentUser?.id })
  //       .order("priority", { ascending: false })
  //       .returns<IFollower[]>();

  //     if (error) {
  //       alert(error.message);
  //     } else {
  //       setProfiles(data.map((profilePriority) => profilePriority.profile));
  //     }
  //   }

  //   getSuggestedUsers();
  // }, []);

  async function handlePress() {
    const username = await supabase
      .from("profiles")
      .select("username")
      .match({ id: currentUser?.id })
      .returns<{ username: string }[]>()
      .limit(1)
      .single();

    if (username.error) {
      alert(username.error.message);
      return;
    }

    const name =
      selectedProfiles.length > 1
        ? `${username.data.username}, ${selectedProfiles.map((selectedProfile) => selectedProfile.name).join(", ")}`
        : `${username.data.username} & ${selectedProfiles[0].name}`;

    const { data, error } = await supabase
      .rpc("create_room", {
        name,
        participant_ids: selectedProfiles.map((selectedProfile) => selectedProfile.id),
      })
      .returns<IRoom>();

    if (error) {
      alert(error.message);
    } else {
      navigation.navigate("Room", { roomId: data.id, name: data.name, image: "" });
    }
  }

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>New Chat</Text>
        <TouchableOpacity
          activeOpacity={0.3}
          disabled={selectedProfiles.length === 0}
          style={selectedProfiles.length === 0 && { opacity: 0.6 }}
          onPress={handlePress}
        >
          <Icon name="check" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.newContainer}>
        <Text style={styles.subheader}>To:</Text>
        <TextInput
          value={input}
          placeholder="Search..."
          placeholderTextColor={COLORS.gray}
          style={styles.input}
          onChangeText={setInput}
        />
        <Text style={styles.subheader}>Suggested:</Text>
        <FlatList
          // data={profiles}
          data={followers.map((follower) => follower.profile)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NewProfile profile={item} setSelectedProfiles={setSelectedProfiles} />}
          style={styles.profilesContainer}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          disabled={selectedProfiles.length === 0}
          style={selectedProfiles.length === 0 ? [styles.createContainer, { opacity: 0.6 }] : styles.createContainer}
          onPress={handlePress}
        >
          <Text style={styles.create}>Create Chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blackTwo,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackTwo,
  },
  header: {
    margin: 8,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
  newContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.black,
  },
  subheader: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  input: {
    margin: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.blackOne,
    color: COLORS.white,
    fontSize: 16,
  },
  profilesContainer: {
    marginVertical: 8,
  },
  createContainer: {
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  create: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default New;
