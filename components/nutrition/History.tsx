import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../constants/theme";

interface IProps {
  history: {
    name: string;
    calories: number;
    amount: number;
    amountType: string;
  };
}

function History({ history }: IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{history.name}</Text>
        <Text style={styles.info}>
          {history.calories} cal - {history.amount} {history.amountType}
        </Text>
      </View>
      {true ? (
        <TouchableOpacity activeOpacity={0.5} style={styles.button}>
          <Icon name="plus" size={24} color={COLORS.white} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity activeOpacity={0.5} style={styles.button}>
          <Icon name="check" size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  textContainer: {
    padding: 8,
  },
  name: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
  info: {
    color: COLORS.gray,
    fontSize: 14,
  },
  button: {
    margin: 8,
    padding: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
  },
});

export default History;
