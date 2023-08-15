import { useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AuthContext } from "../../hooks/useAuth";
import { COLORS } from "../../constants/theme";

interface IProps {
  message: IMessage;
}

function RoomMessage({ message: { id, created_at, content, media, profile_id, room_id } }: IProps) {
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

  const currentUser = useContext(AuthContext);

  //shouldnt be any
  const [currentMedia, setCurrentMedia] = useState<any>("");

  return (
    <View
      style={
        currentUser?.id === profile_id
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
  );
}

const styles = StyleSheet.create({
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
