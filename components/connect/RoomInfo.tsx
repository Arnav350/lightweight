import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../constants/theme";

interface IProps {
  setShowInfo: Dispatch<SetStateAction<boolean>>;
}

function RoomInfo({ setShowInfo }: IProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.3} onPress={() => setShowInfo(false)}>
        <Icon name="chevron-down" size={32} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={{ color: COLORS.white, fontSize: 32 }}>RoomInfo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    backgroundColor: COLORS.black,
  },
});

export default RoomInfo;
