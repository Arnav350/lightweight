import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { supabase } from "../../../supabase";
import { AuthContext } from "../../../hooks/useAuth";
import ConnectProfile from "../../../components/connect/ConnectProfile";
import { COLORS } from "../../../constants/theme";

type TNewProps = StackScreenProps<TConnectStackParamList, "New">;

interface IProfilePriority {
  priority: number;
  profile: IProfile;
}

function New({ navigation }: TNewProps) {
  const currentUser = useContext(AuthContext);

  const [input, setInput] = useState<string>("");
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<IProfile[]>([]);

  useEffect(() => {
    async function getSuggestedUsers() {
      const { data, error } = await supabase
        .from("followers")
        .select("priority, profile: profiles!follower_id(id, username, name, picture)")
        .match({ followee_id: currentUser?.id })
        .order("priority", { ascending: false })
        .returns<IProfilePriority[]>();

      if (error) {
        alert(error.message);
      } else {
        setProfiles(data.map((profilePriority) => profilePriority.profile));
      }
    }

    getSuggestedUsers();
  }, []);

  async function handlePress() {
    const { data, error } = await supabase
      .rpc("create_roo", {
        name: "testing",
        participant_ids: ["7ab1dcc7-5b14-4e82-b3bc-3d5b5b0dbaee", "f875f9ca-6fa8-42c0-a8a9-5f67497b49e5"],
      })
      .returns<IRoom>();

    if (error) {
      alert(error.message);
    } else {
      console.log(data);
    }
  }

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>New Chat</Text>
        <TouchableOpacity activeOpacity={0.3} onPress={handlePress}>
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
          data={profiles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ConnectProfile profile={item} setSelectedProfiles={setSelectedProfiles} />}
          style={styles.profilesContainer}
        />
        <TouchableOpacity activeOpacity={0.5} style={styles.createContainer} onPress={handlePress}>
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
