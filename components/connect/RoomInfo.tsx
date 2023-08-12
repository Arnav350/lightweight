import { Dispatch, SetStateAction } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TRoomProps } from "../../pages/user/connect/Room";
import RoomDropdown from "./RoomDropdown";
import { COLORS } from "../../constants/theme";

interface IProps {
  navigate: TRoomProps;
  room: IRoom | null;
  setRoom: Dispatch<SetStateAction<IRoom | null>>;
  roomParticipants: IProfile[];
  setRoomParticipants: Dispatch<SetStateAction<IProfile[]>>;
  roomImage: string;
  setShowInfo: Dispatch<SetStateAction<boolean>>;
}

function RoomInfo({ navigate, room, setRoom, roomParticipants, setRoomParticipants, roomImage, setShowInfo }: IProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.3} onPress={() => setShowInfo(false)}>
        <Icon name="chevron-down" size={32} color={COLORS.primary} />
      </TouchableOpacity>
      <Image source={roomImage ? { uri: roomImage } : require("../../assets/logo.png")} style={styles.image} />
      <Text numberOfLines={1} style={styles.name}>
        {room?.name}
      </Text>
      <Text>Edit Chat</Text>
      {roomParticipants.length !== 1 && (
        <View style={styles.dropdownContainer}>
          <RoomDropdown
            navigate={navigate}
            roomParticipants={roomParticipants}
            setRoomParticipants={setRoomParticipants}
            setShowInfo={setShowInfo}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    padding: 16,
    backgroundColor: COLORS.black,
  },
  image: {
    alignSelf: "center",
    height: 128,
    width: 128,
    borderRadius: 64,
  },
  name: {
    alignSelf: "center",
    maxWidth: "90%",
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
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
  dropdownContainer: {
    flex: 1,
    // height: 400,
  },
});

export default RoomInfo;
