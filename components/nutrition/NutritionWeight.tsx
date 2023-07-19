import { useContext, useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { NutritionContext } from "../../hooks/useNutrition";
import { IMeasurement, TNutritionProps } from "../../pages/user/nutrition/Nutrition";
import { COLORS } from "../../constants/theme";

interface IProps {
  navigate: TNutritionProps;
}

const windowDimensions = Dimensions.get("window");

function NutritionWeight({ navigate: { navigation } }: IProps) {
  const { weights, setWeights } = useContext(NutritionContext);

  const [input, setInput] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  function handleChange(event: DateTimePickerEvent, date: Date | undefined) {
    setShowPicker(false);
    if (event.type === "set" && date) {
      setDate(date);
    }
  }

  //TWO VALUES SAME DAY IS BACKWARDS
  function findIndex(arr: IMeasurement[], val: Date) {
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
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Weight</Text>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.navigate("Weight")}>
          <Icon name="square-edit-outline" size={32} color={COLORS.white} />
        </TouchableOpacity>
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
                data: weights.length !== 0 ? weights.map((weight) => weight.data) : [1, 3, 5],
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
            placeholder={weights.length > 0 ? weights[weights.length - 1].data.toString() : "0"}
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
            <RNDateTimePicker
              value={date}
              maximumDate={new Date()}
              accentColor={COLORS.primary}
              themeVariant="dark"
              // positiveButton={{ textColor: COLORS.primary }}
              // negativeButton={{ textColor: COLORS.primary }}
              onChange={(event, date) => handleChange(event, date)}
              style={{
                width: 80,
              }}
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
    minWidth: 48,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default NutritionWeight;
