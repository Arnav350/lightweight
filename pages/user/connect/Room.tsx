import { useContext, useEffect, useState } from "react";
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { supabase } from "../../../supabase";
import { AuthContext } from "../../../hooks/useAuth";
import RoomInfo from "../../../components/connect/RoomInfo";
import { COLORS } from "../../../constants/theme";

export type TRoomProps = StackScreenProps<TConnectStackParamList, "Room">;

function Room(props: TRoomProps) {
  const {
    navigation,
    route: { params },
  } = props;
  const currentUser = useContext(AuthContext);

  const [room, setRoom] = useState<IRoom | null>(null);
  const [roomParticipants, setRoomParticipants] = useState<IProfile[]>([]);
  const [roomImage, setRoomImage] = useState<string>(params.image);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    async function getRoom() {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .match({ id: params.id })
        .returns<IRoom[]>()
        .limit(1)
        .single();

      if (error) {
        alert(error.message);
      } else {
        setRoom(data);
      }
    }

    async function getRoomParticipants() {
      const { data, error } = await supabase
        .from("room_participants")
        .select("profile: profiles(id, name, username, picture)")
        .match({ room_id: params.id })
        .returns<{ profile: IProfile }[]>();

      if (error) {
        alert(error.message);
      } else {
        setRoomParticipants(data.filter((datum) => datum.profile.id !== currentUser?.id).map((datum) => datum.profile));
      }
    }

    getRoom();
    getRoomParticipants();
  }, []);

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={styles.titleContainer} onPress={() => setShowInfo(true)}>
          <Image source={roomImage ? { uri: roomImage } : require("../../../assets/logo.png")} style={styles.image} />
          <Text numberOfLines={1} style={styles.header}>
            {room?.name || params.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="taco" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.roomContainer}></View>
      <View style={styles.inputContainer}>
        <Icon name="camera-outline" size={32} color={COLORS.primary} />
        <TextInput
          placeholder="Message..."
          placeholderTextColor={COLORS.gray}
          maxLength={2000}
          returnKeyType="send"
          blurOnSubmit
          multiline
          style={styles.input}
          onSubmitEditing={({ nativeEvent: { text } }) => console.log(text)}
        />
        <Icon name="microphone-outline" size={32} color={COLORS.primary} />
        <Icon name="image-outline" size={32} color={COLORS.primary} />
      </View>
      <Modal animationType="slide" transparent visible={showInfo}>
        <RoomInfo
          navigate={props}
          room={room}
          setRoom={setRoom}
          roomParticipants={roomParticipants}
          setRoomParticipants={setRoomParticipants}
          roomImage={roomImage}
          setShowInfo={setShowInfo}
        />
      </Modal>
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  header: {
    margin: 8,
    maxWidth: "75%",
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.white,
  },
  roomContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: COLORS.black,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.blackOne,
    color: COLORS.white,
    fontSize: 16,
    textAlignVertical: "top",
  },
});

export default Room;
