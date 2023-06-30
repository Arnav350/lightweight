import { useContext } from "react";
import { Modal, ScrollView, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TCompositeProps } from "../../../App";
import { TGymStackParamList } from "../../../stacks/UserStack";
import { WorkoutContext } from "../../../hooks/useWorkout";
import { IRoutine } from "../../workout/Workout";
import MyRoutine from "../../../components/gym/MyRoutine";
import ExploreRoutine from "../../../components/gym/ExploreRoutine";
import RoutineOptions from "../../../components/gym/RoutineOptions";
import { COLORS } from "../../../constants/theme";

export type TSelectProps = CompositeScreenProps<StackScreenProps<TGymStackParamList, "Select">, TCompositeProps>;

function Select(props: TSelectProps) {
  const { navigation } = props;

  const { routines, settings } = useContext(WorkoutContext);

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Select Routine</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.selectContainer}>
        <Text style={styles.subheading}>My Routines</Text>
        {routines.slice(17).map((routine: IRoutine, i: number) => (
          <MyRoutine key={i} i={i + 17} routine={routine} navigate={props} />
        ))}
        <Text style={styles.subheading}>Explore Routines</Text>
        <Text style={styles.routine}>Push Pull Legs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          {["Push", "Pull", "Legs"].map((name, i) => (
            <ExploreRoutine key={i} i={i} name={name} navigate={props} />
          ))}
        </ScrollView>
        <Text style={styles.routine}>Arnold Split</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          {["Chest & Back", "Shoulders & Arms", "Legs"].map((name, i) => (
            <ExploreRoutine key={i} i={i + 3} name={name} navigate={props} />
          ))}
        </ScrollView>
        <Text style={styles.routine}>Full Body Split</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          {["Full Body 1", "Full Body 2", "Full Body 3"].map((name, i) => (
            <ExploreRoutine key={i} i={i + 6} name={name} navigate={props} />
          ))}
        </ScrollView>
        <Text style={styles.routine}>Upper Lower</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          {["Upper 1", "Lower 1", "Upper 2", "Lower 2"].map((name, i) => (
            <ExploreRoutine key={i} i={i + 9} name={name} navigate={props} />
          ))}
        </ScrollView>
        <Text style={styles.routine}>Only Dumbbells</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          {["Dumbbell Upper", "Dumbbell Lower"].map((name, i) => (
            <ExploreRoutine key={i} i={i + 13} name={name} navigate={props} />
          ))}
        </ScrollView>
        <Text style={styles.routine}>No Equipment</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          {["Home Upper", "Home Lower"].map((name, i) => (
            <ExploreRoutine key={i} i={i + 15} name={name} navigate={props} />
          ))}
        </ScrollView>
        <Text style={styles.name}></Text>
      </ScrollView>
      <Modal animationType="fade" transparent visible={settings.showOptions}>
        <RoutineOptions navigate={props} />
      </Modal>
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
    backgroundColor: COLORS.blackTwo,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
  selectContainer: {
    padding: 16,
    backgroundColor: COLORS.black,
  },
  subheading: {
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 18,
  },
  name: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  routine: {
    marginTop: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  exploresContainer: {
    flexDirection: "row",
    marginVertical: 16,
    marginHorizontal: -8,
  },
});

export default Select;
