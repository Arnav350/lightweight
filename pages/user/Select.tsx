import { useContext } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TGymStackParamList } from "../../stacks/UserStack";
import { WorkoutContext } from "../../hooks/useWorkout";
import { IRoutine } from "../workout/Workout";
import MyRoutine from "../../components/gym/MyRoutine";
import ExploreRoutine from "../../components/gym/ExploreRoutine";
import { COLORS } from "../../constants/theme";

type TProps = StackScreenProps<TGymStackParamList, "Select">;

function Select(props: TProps) {
  const { navigation } = props;

  const { routines, setRoutines } = useContext(WorkoutContext);

  return (
    <SafeAreaView style={styles.container}>
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
        {routines.map((routine: IRoutine, i: number) => (
          <MyRoutine key={i} routine={routine} />
        ))}
        <Text style={styles.subheading}>Explore Routines</Text>
        <Text style={styles.routine}>Push Pull Legs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine i={0} name="Push" navigate={props} />
          <ExploreRoutine i={1} name="Pull" navigate={props} />
          <ExploreRoutine i={2} name="Legs" navigate={props} />
        </ScrollView>
        <Text style={styles.routine}>Arnold Split</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine i={3} name="Chest & Back" navigate={props} />
          <ExploreRoutine i={4} name="Shoulders & Arms" navigate={props} />
          <ExploreRoutine i={5} name="Legs" navigate={props} />
        </ScrollView>
        <Text style={styles.routine}>Full Body Split</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine i={6} name="Full Body 1" navigate={props} />
          <ExploreRoutine i={7} name="Full Body 2" navigate={props} />
          <ExploreRoutine i={8} name="Full Body 3" navigate={props} />
        </ScrollView>
        <Text style={styles.routine}>Upper Lower</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine i={9} name="Upper 1" navigate={props} />
          <ExploreRoutine i={10} name="Lower 1" navigate={props} />
          <ExploreRoutine i={11} name="Upper 2" navigate={props} />
          <ExploreRoutine i={12} name="Lower 2" navigate={props} />
        </ScrollView>
        <Text style={styles.routine}>Only Dumbbells</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine i={13} name="Dumbbell Upper" navigate={props} />
          <ExploreRoutine i={14} name="Dumbbell Lower" navigate={props} />
        </ScrollView>
        <Text style={styles.routine}>No Equipment</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine i={15} name="Home Upper" navigate={props} />
          <ExploreRoutine i={16} name="Home Lower" navigate={props} />
        </ScrollView>
        <Text style={styles.name}></Text>
      </ScrollView>
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
