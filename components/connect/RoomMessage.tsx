import { useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AuthContext } from "../../hooks/useAuth";
import { COLORS } from "../../constants/theme";

interface IProps {
  message: IMessage;
  lastMessage: IMessage;
}

function RoomMessage({ message: { id, created_at, content, media, profile_id, room_id }, lastMessage }: IProps) {
  const date: string = useMemo(() => {
    const roomDate = new Date(created_at);
    const todayDate = new Date(new Date().setHours(0, 0, 0, 0));

    if (todayDate.getTime() - roomDate.getTime() < 6.048e8) {
      if (todayDate.getTime() - roomDate.getTime() < 8.64e7) {
        if (todayDate.getTime() <= roomDate.getTime()) {
          return roomDate.toLocaleTimeString("default", { hour: "numeric", minute: "numeric" });
        } else {
          return "Yesterday";
        }
      } else {
        return roomDate.toLocaleDateString("default", { weekday: "long" }).split(",")[0];
      }
    } else {
      return roomDate.toLocaleDateString();
    }
  }, [created_at]);

  const spacing: number = useMemo(() => {
    const roomDate = new Date(created_at);
    const lastDate = new Date(lastMessage.created_at);

    if (roomDate.toLocaleDateString() === lastDate.toLocaleDateString()) {
      if (roomDate.getTime() - lastDate.getTime() < 60000) {
        return 1;
      } else {
        return 8;
      }
    } else {
      return 0;
    }
  }, [lastMessage.created_at]);

  const { currentProfile } = useContext(AuthContext);

  //shouldnt be any
  const [currentMedia, setCurrentMedia] = useState<any>("");

  return (
    <View style={{ marginTop: spacing }}>
      {!spacing && <Text style={styles.spacer}>{date}</Text>}
      <View
        style={
          currentProfile?.id === profile_id
            ? [styles.container, { alignSelf: "flex-end", backgroundColor: COLORS.primary }]
            : styles.container
        }
      >
        <Text style={styles.content}>
          {content}
          <Text style={styles.space}>{date}</Text>
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  spacer: {
    marginVertical: 16,
    color: COLORS.gray,
    fontWeight: "500",
    textAlign: "center",
  },
  container: {
    alignSelf: "flex-start",
    padding: 8,
    maxWidth: "80%",
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  content: {
    color: COLORS.white,
    fontSize: 16,
  },
  space: {
    opacity: 0,
    fontSize: 15,
  },
  date: {
    marginTop: -12,
    marginBottom: -4,
    //#eeea
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "300",
    alignSelf: "flex-end",
  },
});

export default RoomMessage;
