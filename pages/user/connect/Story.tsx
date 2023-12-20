import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../../constants/theme";
import { StackScreenProps } from "@react-navigation/stack";

type TProps = StackScreenProps<TConnectStackParamList, "Story">;

function Story(props: TProps) {
  const { navigation } = props;

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="close" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Add to Story</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="check" size={32} color={COLORS.primary} onPress={() => {}} />
        </TouchableOpacity>
      </View>
      <View style={styles.optionsRow}>
        <TouchableOpacity activeOpacity={0.5} style={styles.optionsButton}>
          <Icon name="camera-outline" size={40} color={COLORS.primary} />
          <Text style={styles.optionsText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={styles.optionsButton}>
          <Icon name="image-multiple-outline" size={40} color={COLORS.primary} />
          <Text style={styles.optionsText}>Photos</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={["1", "2"]}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Text>{item}</Text>
          </View>
        )}
        style={styles.storyContainer}
      />
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
  },
  header: {
    margin: 8,
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.white,
  },
  optionsRow: {
    flexDirection: "row",
    padding: 8,
    gap: 8,
    backgroundColor: COLORS.black,
  },
  optionsButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 4,
    borderRadius: 8,
    backgroundColor: COLORS.blackOne,
  },
  optionsText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
  storyContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});

export default Story;
