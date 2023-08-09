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

  useEffect(() => {
    async function getSuggestedUsers() {
      const { data, error } = await supabase
        .from("followers")
        .select("priority, profile: profiles!follower_id(id, username, picture)")
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

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>New Chat</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="taco" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.newContainer}>
        <Text>To:</Text>
        <TextInput
          value={input}
          placeholder="Search..."
          placeholderTextColor={COLORS.gray}
          style={styles.input}
          onChangeText={setInput}
        />
        <Text>Suggested:</Text>
        <FlatList
          data={profiles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ConnectProfile profile={item} />}
        />
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
    backgroundColor: COLORS.black,
  },
  input: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default New;
