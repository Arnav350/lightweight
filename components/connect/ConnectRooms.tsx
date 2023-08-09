import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { supabase } from "../../supabase";
import { TConnectProps } from "../../pages/user/connect/Connect";
import ConnectRoom from "./ConnectRoom";
import { COLORS } from "../../constants/theme";

interface IProps {
  navigate: TConnectProps;
}

function ConnectRooms({ navigate }: IProps) {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <FlatList
      data={rooms}
      keyExtractor={(item) => item.id}
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