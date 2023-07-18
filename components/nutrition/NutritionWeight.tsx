import { useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../constants/theme";

interface IMeasurement {
  data: number;
  date: Date;
}

const windowDimensions = Dimensions.get("window");

function NutritionWeight() {
  const date1 = new Date(2023, 5, 19);
  const date2 = new Date(2023, 6, 1);
  const date3 = new Date();

  const [input, setInput] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [weights, setWeights] = useState<IMeasurement[]>([
    { data: 140, date: date1 },
    { data: 145, date: date2 },
    { data: 152, date: date3 },
  ]);

  function handleChange(event: DateTimePickerEvent, date: Date | undefined) {
    setShowPicker(false);
    if (event.type === "set" && date) {
      setDate(date);
    }

    // setWeights(weights.slice().sort((a: IMeasurement, b: IMeasurement) => a.date.getTime() - b.date.getTime()));
  }

  const findIndex = (arr: IMeasurement[], val: Date) => {
    let low = 0,
      high = arr.length;
    while (low < high) {
      let mid = (low + high) >>> 1;
      if (arr[mid].date < val) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Weight</Text>
        <Icon name="square-edit-outline" size={32} color={COLORS.white} />
      </View>
      <View style={styles.weightContainer}>
        <LineChart
          data={{
            labels: weights.map(
              (weight) =>
                `${weight.date.toLocaleDateString("default", { month: "short" })} ${weight.date.toLocaleDateString(
                  "default",
                  { day: "2-digit" }
                )}`
            ),
            datasets: [
              {
                data: weights.map((weight) => weight.data),
              },
            ],
          }}
          width={windowDimensions.width - 64}
          height={windowDimensions.height / 4}
          chartConfig={{
            backgroundGradientFrom: COLORS.blackOne,
            backgroundGradientTo: COLORS.blackOne,
            decimalPlaces: 0,
            color: (opacity = 1) => COLORS.primary + ("0" + Math.floor(opacity * 255).toString(16)).slice(-2),
            labelColor: () => COLORS.white,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: COLORS.blackOne,
            },
            propsForBackgroundLines: {
              stroke: COLORS.white + "30",
            },
          }}
        />
        <View style={styles.rowContainer}>
          <Text style={styles.enter}>Enter Weight:</Text>
          <TextInput
            value={input}
            placeholder={weights[weights.length - 1].data.toString()}
            placeholderTextColor={COLORS.darkGray}
            keyboardType="numeric"
            keyboardAppearance="dark"
            style={focused ? [styles.input, { borderBottomColor: COLORS.primary }] : styles.input}
            onChangeText={setInput}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {Platform.OS === "android" && (
            <TouchableOpacity activeOpacity={0.3} onPress={() => setShowPicker(true)}>
              <TextInput
                value={`${date.toLocaleDateString("default", { month: "short" })} ${date.toLocaleDateString("default", {
                  day: "2-digit",
                })}, ${date.getFullYear()}`}
                editable={false}
                style={styles.input}
              />
            </TouchableOpacity>
          )}
          {(Platform.OS === "ios" || showPicker) && (
            <DateTimePicker
              value={date}
              maximumDate={new Date()}
              accentColor={COLORS.primary}
              themeVariant="dark"
              // positiveButton={{ textColor: COLORS.primary }}
              // negativeButton={{ textColor: COLORS.primary }}
              onChange={(event, date) => handleChange(event, date)}
            />
          )}
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() =>
              setWeights((prevWeights) => {
                const index = findIndex(prevWeights, date);
                return [
                  ...prevWeights.slice(0, index),
                  { data: Number(input) || weights[weights.length - 1].data, date },
                  ...prevWeights.slice(index),
                ];
              })
            }
          >
            <Icon name="check" size={28} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowDimensions.width - 32,
    margin: 16,
    padding: 8,
    backgroundColor: COLORS.blackOne,
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  header: {
    margin: 8,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "500",
  },
  weightContainer: {
    padding: 8,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  enter: {
    color: COLORS.white,
    fontSize: 16,
  },
  input: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default NutritionWeight;
