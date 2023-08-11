import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { supabase } from "../../supabase";
import { TConnectProps } from "../../pages/user/connect/Connect";
import { COLORS } from "../../constants/theme";

interface IProps {
  room: IRoom;
  navigate: TConnectProps;
}

function ConnectRoom({ room: { id, name, image, last_message, last_date }, navigate: { navigation } }: IProps) {
  const [roomImage, setRoomImage] = useState<string>("");

  useEffect(() => {
    if (image) {
      async function getPicture() {
        const { data, error } = await supabase.storage.from("rooms").download(id);

        if (error) {
          alert(error.message);
        } else {
          const fileReaderInstance = new FileReader();
          fileReaderInstance.readAsDataURL(data);
          fileReaderInstance.onload = () => {
            const base64data = fileReaderInstance.result;
            if (typeof base64data === "string") {
              setRoomImage(base64data);
            }
          };
        }
      }

      getPicture();
    }
  });

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={() => navigation.navigate("Room", { id, name, image: roomImage })}
    >
      <Image source={image ? { uri: roomImage } : require("../../assets/logo.png")} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{last_date}</Text>
        </View>
        <Text numberOfLines={2} style={styles.message}>
          {last_message}
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
    borderRadius: 32,
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
