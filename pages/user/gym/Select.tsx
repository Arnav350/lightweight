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
import RoutineActions from "../../../components/gym/RoutineActions";
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
          <MyRoutine key={routine.name} i={i + 17} routine={routine} navigate={props} />
        ))}
        <Text style={styles.subheading}>Explore Routines</Text>
        <Text style={styles.routine}>Push Pull Legs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          {routines.slice(0, 3).map((routine, i) => (
            <ExploreRoutine key={routine.name} i={i} name={routine.name} navigate={props} />
          ))}
        </ScrollView>
        <Text style={styles.routine}>Arnold Split</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          {routines.slice(3, 6).map((routine, i) => (
            <ExploreRoutine key={routine.name} i={i + 3} name={routine.name} navigate={props} />
          ))}
        </ScrollView>
        <Text style={styles.routine}>Full Body Split</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          {routines.slice(6, 9).map((routine, i) => (
            <ExploreRoutine key={routine.name} i={i + 6} name={routine.name} navigate={props} />
          ))}
        </ScrollView>
        <Text style={styles.routine}>Upper Lower</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          {routines.slice(9, 13).map((routine, i) => (
            <ExploreRoutine key={routine.name} i={i + 9} name={routine.name} navigate={props} />
          ))}
        </ScrollView>
        <Text style={styles.routine}>Only Dumbbells</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          {routines.slice(13, 15).map((routine, i) => (
            <ExploreRoutine key={routine.name} i={i + 13} name={routine.name} navigate={props} />
          ))}
        </ScrollView>
        <Text style={styles.routine}>No Equipment</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          {routines.slice(15, 17).map((routine, i) => (
            <ExploreRoutine key={routine.name} i={i + 15} name={routine.name} navigate={props} />
          ))}
        </ScrollView>
        <Text style={styles.name}></Text>
      </ScrollView>
      <Modal animationType="fade" transparent visible={settings.showOptions}>
        <RoutineActions navigate={props} />
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
