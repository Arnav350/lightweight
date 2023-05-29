import { Dispatch, SetStateAction, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Dropdown from "./Dropdown";
import { IActivity } from "../../pages/workout/Add";

import { COLORS } from "../../constants/theme";

interface IProps {
  equipments: string[];
  muscles: string[];
  activities: IActivity[];
  setActivities: Dispatch<SetStateAction<IActivity[]>>;
  setShowNew: Dispatch<SetStateAction<boolean>>;
}

function New({
  equipments,
  muscles,
  activities,
  setActivities,
  setShowNew,
}: IProps) {
  const [activityName, setActivityName] = useState<string>("");

  const [currentEquipment, setCurrentEquipment] =
    useState<string>("Any Equipment");
  const [currentMuscle, setCurrentMuscle] = useState<string>("Any Muscle");

  function handlePress() {
    setActivities([
      ...activities,
      {
        name: activityName,
        equipment: currentEquipment,
        muscle: currentMuscle,
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.newContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setShowNew(false)}
          >
            <Icon name="close" size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.header}>New Exercise</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={activityName}
          placeholder="Exercise name"
          placeholderTextColor={COLORS.gray}
          keyboardAppearance="dark"
          style={styles.input}
          onChangeText={setActivityName}
        />
        <View style={styles.dropdownsContainer}>
          <View style={styles.dropdownContainer}>
            <Text style={styles.subheader}>Equipment:</Text>
            <Dropdown
              data={equipments}
              current={currentEquipment}
              setCurrent={setCurrentEquipment}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.subheader}>Muscle:</Text>
            <Dropdown
              data={muscles}
              current={currentMuscle}
              setCurrent={setCurrentMuscle}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000bb",
  },
  newContainer: {
    padding: 12,
    backgroundColor: COLORS.black,
    borderRadius: 16,
    width: 320,
    height: 208,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
  save: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "500",
  },
  input: {
    marginVertical: 8,
    marginHorizontal: 4,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  dropdownsContainer: {
    marginTop: 8,
    flexDirection: "row",
  },
  dropdownContainer: {
    flex: 1,
    height: 80,
  },
  subheader: {
    marginBottom: 8,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default New;
