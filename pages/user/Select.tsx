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
          <ExploreRoutine name="Push" navigate={props} />
          <ExploreRoutine name="Pull" navigate={props} />
          <ExploreRoutine name="Legs" navigate={props} />
        </ScrollView>
        <Text style={styles.routine}>Arnold Split</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine name="Chest & Back" navigate={props} />
          <ExploreRoutine name="Shoulders & Arms" navigate={props} />
          <ExploreRoutine name="Legs" navigate={props} />
        </ScrollView>
        <Text style={styles.routine}>Full Body Split</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine name="Full Body 1" navigate={props} />
          <ExploreRoutine name="Full Body 2" navigate={props} />
          <ExploreRoutine name="Full Body 3" navigate={props} />
        </ScrollView>
        <Text style={styles.routine}>Upper Lower</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine name="Upper 1" navigate={props} />
          <ExploreRoutine name="Lower 1" navigate={props} />
          <ExploreRoutine name="Upper 2" navigate={props} />
          <ExploreRoutine name="Lower 2" navigate={props} />
        </ScrollView>
        <Text style={styles.routine}>Only Dumbbells</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine name="Dumbbell Upper" navigate={props} />
          <ExploreRoutine name="Dumbbell Lower" navigate={props} />
        </ScrollView>
        <Text style={styles.routine}>No Equipment</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine name="Home Upper" navigate={props} />
          <ExploreRoutine name="Home Lower" navigate={props} />
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
