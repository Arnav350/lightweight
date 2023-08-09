import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { TConnectProps } from "../../pages/user/connect/Connect";
import { COLORS } from "../../constants/theme";

interface IProps {
  room: IRoom;
  navigate: TConnectProps;
}

function ConnectRoom({ room, navigate: { navigation } }: IProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Room", { id: room.id })}>
      <Image source={room.image ? { uri: room.image } : require("../../assets/apple.png")} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{room.name || "room participants"}</Text>
          <Text style={styles.date}>{}</Text>
        </View>
        <Text numberOfLines={2} style={styles.message}>
          {room.last_message}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
  image: {
    margin: 8,
    height: 64,
    width: 64,
    borderRadius: 50,
  },
  textContainer: {
    padding: 8,
    flex: 1,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    color: COLORS.white,
    fontSize: 16,
  },
  date: {
    color: COLORS.gray,
    fontSize: 14,
  },
  message: {
    color: COLORS.gray,
    fontSize: 14,
  },
});

export default ConnectRoom;
