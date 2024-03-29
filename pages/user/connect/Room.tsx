import { useContext, useEffect, useRef, useState } from "react";
import { FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { supabase } from "../../../supabase";
import { AuthContext } from "../../../hooks/useAuth";
import RoomMessage from "../../../components/connect/RoomMessage";
import RoomInfo from "../../../components/connect/RoomInfo";
import { COLORS } from "../../../constants/theme";
import RoomInput from "../../../components/connect/RoomInput";

export type TRoomProps = StackScreenProps<TConnectStackParamList, "Room">;

function Room(props: TRoomProps) {
  const {
    navigation,
    route: { params },
  } = props;
  const { currentProfile } = useContext(AuthContext);

  const [room, setRoom] = useState<IRoom | null>(null);
  const [roomParticipants, setRoomParticipants] = useState<IProfile[]>([]);
  const [roomImage, setRoomImage] = useState<string>(params.image);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    async function getRoom() {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .match({ id: params.roomId })
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
        .select("profile: profiles(*)")
        .match({ room_id: params.roomId })
        .returns<{ profile: IProfile }[]>();

      if (error) {
        alert(error.message);
      } else {
        setRoomParticipants(
          data.filter(({ profile }) => profile.id !== currentProfile?.id).map(({ profile }) => profile)
        );
      }
    }

    async function getMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .match({ room_id: params.roomId })
        .order("created_at", { ascending: false })
        .returns<IMessage[]>();

      if (error) {
        alert(error.message);
      } else {
        setMessages(data);
      }
    }

    getRoom();
    getRoomParticipants();
    getMessages();
  }, []);

  useEffect(() => {
    const sub = supabase
      .channel("messages")
      .on<IMessage>(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages", filter: `room_id=eq.${params.roomId}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setMessages((prevMessages) => [payload.new, ...prevMessages]);
          } else if (payload.eventType === "DELETE") {
            // setMessages((prevMessages) => prevMessages.filter((prevMessage) => prevMessage.id !== payload.old.id));
          } else if (payload.eventType === "UPDATE") {
            //UPDATE
            // setMessages((prevMessages) => prevMessages.map((prevMessage) => prevMessage.id === ))
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sub);
    };
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
      <FlatList
        data={messages}
        renderItem={({ item, index }) => <RoomMessage message={item} lastMessage={messages[index + 1] || item} />}
        keyExtractor={(item) => item.id}
        inverted
        style={styles.roomContainer}
      />
      <RoomInput roomId={params.roomId} />
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
    flexShrink: 1,
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  header: {
    //maybe dont use %
    margin: 8,
    maxWidth: "75%",
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.white,
  },
  roomContainer: {
    padding: 8,
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
