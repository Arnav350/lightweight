import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AuthContext } from "../../hooks/useAuth";
import { COLORS } from "../../constants/theme";

interface IProps {
  message: IMessage;
}

function RoomMessage({ message }: IProps) {
  const currentUser = useContext(AuthContext);

  //shouldnt be any
  const [media, setMedia] = useState<any>("");

  return (
    <View
      style={
        currentUser?.id === message.profile_id
          ? [styles.container, { alignSelf: "flex-end", backgroundColor: COLORS.primary }]
          : styles.container
      }
    >
      <Text style={styles.content}>{message.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  content: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default RoomMessage;
