import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { IExercise } from "../../pages/workout/Workout";
import { COLORS } from "../../constants/theme";

interface IProps {
  activity: IExercise;
}

function Activity({ activity: { name, equipment, muscle } }: IProps) {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.image} />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        <Text style={styles.specifier}>
          {muscle} - {equipment}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="plus" size={32} color={COLORS.white} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
  image: {
    marginVertical: 8,
    height: 64,
    width: 64,
    backgroundColor: COLORS.blackOne,
    borderRadius: 40,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    justifyContent: "center",
  },
  name: {
    width: "90%",
    marginBottom: 4,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
  specifier: {
    color: COLORS.gray,
    fontSize: 14,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    height: 40,
    width: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
});

export default Activity;
