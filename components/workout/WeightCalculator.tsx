import { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { WorkoutContext } from "../../hooks/useWorkout";
import { COLORS } from "../../constants/theme";

function WeightCalculator() {
  const plateLbs: number[] = [55, 45, 35, 25, 10, 5, 2.5];
  const plateKgs: number[] = [25, 20, 15, 10, 5, 2.5, 1.25];
  const plateContainerStyles = [
    styles.plateContainerOne,
    styles.plateContainerTwo,
    styles.plateContainerThree,
    styles.plateContainerFour,
    styles.plateContainerFive,
    styles.plateContainerSix,
    styles.plateContainerSeven,
  ];

  const { settings, setSettings } = useContext(WorkoutContext);

  const [totalValue, setTotalValue] = useState<number>(0);
  const [barValue, setBarValue] = useState<number>(9);
  const [numberValues, setNumberValues] = useState<number[]>(Array(7).fill(0));
  const [plateValues, setPlateValues] = useState<boolean[]>(Array(7).fill(false));
  const [plateWeights, setPlateWeights] = useState(plateLbs);

  function handleTotalBlur() {
    let totalWeight = totalValue > barValue * 5 ? totalValue - barValue * 5 : 0;

    setNumberValues(
      plateWeights.map((plateWeight: number, i: number) => {
        if (plateValues[i] === true) {
          return 0;
        } else {
          const plateAmount = Math.floor(totalWeight / (plateWeight * 2));
          totalWeight %= plateWeight * 2;
          return plateAmount;
        }
      })
    );
  }

  function handleUnitPress() {
    if (plateWeights[0] === 55) {
      setPlateWeights(plateKgs);
      setBarValue((prevBarValue) => Math.round(prevBarValue / 2.2));
      setTotalValue((prevTotalValue) => Math.round(prevTotalValue / 2.2 / 2.5) * 2.5);
    } else {
      setPlateWeights(plateLbs);
      setBarValue((prevBarValue) => Math.round(prevBarValue * 2.2));
      setTotalValue((prevTotalValue) => Math.round((prevTotalValue * 2.2) / 5) * 5);
    }
  }

  function handlePlatePress(plateIndex: number) {
    setPlateValues((prevPlateValues) =>
      prevPlateValues.map((plateValue, i) => (i === plateIndex ? !plateValue : plateValue))
    );
  }

  function handleChange(numberAmount: number, i: number) {
    setNumberValues((prevNumberValues) =>
      prevNumberValues.map((prevNumberValue, j) => (j === i ? numberAmount : prevNumberValue))
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.calculatorContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => setSettings((prevSettings) => ({ ...prevSettings, showCalculator: false }))}
          >
            <Icon name="close" size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.header}>Plate Calculator</Text>
          <TouchableOpacity activeOpacity={0.3} onPress={handleUnitPress}>
            <Text style={styles.unit}>{plateWeights[0] === 55 ? "Lbs" : "Kgs"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <TextInput
            value={totalValue ? totalValue.toString() : ""}
            keyboardType="numeric"
            keyboardAppearance="dark"
            style={styles.total}
            onChangeText={(text) => setTotalValue(Number(text))}
            onBlur={handleTotalBlur}
          />
          <View style={styles.subtitlesContainer}>
            <Text style={styles.subtitle}>Bar</Text>
            <Text style={styles.subtitle}>Plates &#40;each side&#41;</Text>
          </View>
          <View style={styles.weightsContainer}>
            <View style={styles.barContainer}>
              <Slider
                value={barValue}
                maximumValue={plateWeights[0] === 55 ? 13 : 6}
                thumbStyle={styles.thumb}
                minimumTrackStyle={styles.minTrack}
                maximumTrackStyle={styles.maxTrack}
                onValueChange={(value) => setBarValue(Math.round(value[0]))}
                onSlidingComplete={handleTotalBlur}
              />
              <Text style={styles.bar}>
                {barValue * 5} {plateWeights[0] === 55 ? "lbs" : "kgs"}
              </Text>
            </View>
            <View style={styles.platesContainer}>
              {plateWeights.map((plateWeight: number, i: number) => (
                <View key={i} style={styles.weightContainer}>
                  <TouchableOpacity
                    activeOpacity={0.3}
                    style={
                      plateValues[i]
                        ? [styles.plateContainer, plateContainerStyles[i], { opacity: 0.3 }]
                        : [styles.plateContainer, plateContainerStyles[i]]
                    }
                    onPressIn={() => handlePlatePress(i)}
                    onPressOut={handleTotalBlur}
                  >
                    <Text
                      style={
                        [2, 4].includes(i)
                          ? { ...styles.weight, color: COLORS.black }
                          : i === 6
                          ? { ...styles.weight, fontSize: 11 }
                          : styles.weight
                      }
                    >
                      {plateWeight}
                    </Text>
                  </TouchableOpacity>
                  <TextInput
                    value={numberValues[i] ? numberValues[i].toString() : ""}
                    keyboardType="numeric"
                    keyboardAppearance="dark"
                    style={styles.number}
                    onChangeText={(text) => handleChange(Number(text), i)}
                    onBlur={() =>
                      setTotalValue(
                        plateWeights.reduce((total, plateWeight, i) => total + numberValues[i] * plateWeight * 2, 0) +
                          barValue * 5
                      )
                    }
                  />
                </View>
              ))}
            </View>
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
    backgroundColor: "#111111ee",
  },
  calculatorContainer: {
    margin: 16,
    padding: 8,
    backgroundColor: COLORS.black,
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  header: {
    marginHorizontal: 24,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  unit: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "500",
  },
  mainContainer: {
    padding: 8,
  },
  total: {
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
    color: COLORS.white,
    fontSize: 32,
    alignSelf: "center",
  },
  subtitlesContainer: {
    flexDirection: "row",
  },
  subtitle: {
    marginHorizontal: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  weightsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barContainer: {
    marginRight: 8,
  },
  thumb: {
    width: 8,
    backgroundColor: COLORS.gray,
    borderRadius: 0,
  },
  minTrack: {
    height: 6,
    backgroundColor: COLORS.gray,
    borderRadius: 0,
  },
  maxTrack: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 0,
  },
  bar: {
    width: 56,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
    overflow: "hidden",
  },
  platesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  weightContainer: {
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    width: 32,
  },
  plateContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  plateContainerOne: {
    marginVertical: 4,
    height: 32,
    width: 32,
    backgroundColor: "#f33",
  },
  plateContainerTwo: {
    marginVertical: 5,
    height: 30,
    width: 30,
    backgroundColor: "#33f",
  },
  plateContainerThree: {
    marginVertical: 5.5,
    height: 29,
    width: 29,
    backgroundColor: "#ee3",
  },
  plateContainerFour: {
    marginVertical: 6,
    height: 28,
    width: 28,
    backgroundColor: "#393",
  },
  plateContainerFive: {
    marginVertical: 7,
    height: 26,
    width: 26,
    backgroundColor: "#eee",
  },
  plateContainerSix: {
    marginVertical: 7.5,
    height: 25,
    width: 25,
    backgroundColor: "#999",
  },
  plateContainerSeven: {
    marginVertical: 8,
    height: 24,
    width: 24,
    backgroundColor: "#333",
  },
  weight: {
    color: COLORS.white,
    fontWeight: "500",
  },
  number: {
    width: 32,
    height: 20,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default WeightCalculator;
