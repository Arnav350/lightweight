import { Dispatch, SetStateAction } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../constants/theme";

interface IProps {
  room: IRoom | null;
  setRoom: Dispatch<SetStateAction<IRoom | null>>;
  roomParticipants: IProfile[];
  roomImage: string;
  setShowInfo: Dispatch<SetStateAction<boolean>>;
}

function RoomInfo({ room, setRoom, roomImage, setShowInfo }: IProps) {
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
      <Text></Text>
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
});

export default RoomInfo;
