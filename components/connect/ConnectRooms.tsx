import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { supabase } from "../../supabase";
import { TConnectProps } from "../../pages/user/connect/Connect";
import ConnectRoom from "./ConnectRoom";
import { COLORS } from "../../constants/theme";
import { useIsFocused } from "@react-navigation/native";

interface IProps {
  navigate: TConnectProps;
  input: string;
}

function ConnectRooms({ navigate, input }: IProps) {
  const isFocused = useIsFocused();

  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    if (isFocused) {
      async function getRooms() {
        const { error, data } = await supabase
          .from("rooms")
          .select("*")
          .order("last_date", { ascending: false })
          .returns<IRoom[]>();

        if (error) {
          alert(error.message);
        } else {
          setRooms(data);
        }
      }

      getRooms();
    }
  }, [isFocused]);

  return (
    <FlatList
      data={rooms.filter(({ name }) => name.includes(input))}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ConnectRoom room={item} navigate={navigate} />}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
  },
});

export default ConnectRooms;
