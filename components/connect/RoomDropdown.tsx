import { Dispatch, SetStateAction, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TRoomProps } from "../../pages/user/connect/Room";
import RoomProfile from "./RoomProfile";
import { COLORS } from "../../constants/theme";

interface IProps {
  navigate: TRoomProps;
  roomParticipants: IProfile[];
  setRoomParticipants: Dispatch<SetStateAction<IProfile[]>>;
  setShowInfo: Dispatch<SetStateAction<boolean>>;
}

function RoomDropdown({ navigate, roomParticipants, setRoomParticipants, setShowInfo }: IProps) {
  const [participant, setParticipant] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {openDropdown ? (
        <TouchableOpacity activeOpacity={0.5} style={styles.searchContainer} onPress={() => setOpenDropdown(false)}>
          <View style={styles.inputContainer}>
            <Icon name="magnify" size={24} color={COLORS.gray} />
            <TextInput
              value={participant}
              placeholder="Enter user..."
              placeholderTextColor={COLORS.gray}
              style={styles.input}
              onChangeText={setParticipant}
            />
          </View>
          <Icon name="chevron-up" size={32} color={COLORS.white} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity activeOpacity={0.5} style={styles.profilesContainer} onPress={() => setOpenDropdown(true)}>
          <View style={styles.participantsContainer}>
            <Icon name="account-group" size={40} color={COLORS.white} />
            <View>
              <Text style={styles.length}>{roomParticipants.length} People</Text>
              <Text numberOfLines={1} style={styles.participants}>
                {roomParticipants.map((roomParticipant) => roomParticipant.name).join(", ")}
              </Text>
            </View>
          </View>
          <Icon name="chevron-down" size={32} color={COLORS.white} />
        </TouchableOpacity>
      )}
      {openDropdown && (
        <View>
          <FlatList
            data={roomParticipants.filter(({ name, username }) =>
              [name, username].some((str) => str.toLowerCase().includes(participant.toLowerCase()))
            )}
            renderItem={({ item }) => <RoomProfile navigate={navigate} profile={item} setShowInfo={setShowInfo} />}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.blackOne,
    paddingHorizontal: 16,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 4,
    fontSize: 16,
  },
  profilesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  participantsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    maxWidth: "80%",
  },
  length: {
    color: COLORS.white,
    fontSize: 18,
  },
  participants: {
    color: COLORS.gray,
    fontSize: 16,
  },
  list: {
    //use a % instead of 400
    maxHeight: 400,
    backgroundColor: COLORS.blackOne,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});

export default RoomDropdown;
