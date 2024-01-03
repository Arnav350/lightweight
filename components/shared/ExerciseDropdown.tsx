import { Dispatch, SetStateAction, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "../../constants/theme";

interface IProps {
  data: string[];
  current: string;
  setCurrent: Dispatch<SetStateAction<string>>;
}

function ExerciseDropdown({ data, current, setCurrent }: IProps) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  function handlePress(item: string) {
    setCurrent(item);
    setOpenDropdown(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} style={styles.labelContainer} onPress={() => setOpenDropdown(true)}>
        <Text style={styles.text}>{current}</Text>
      </TouchableOpacity>
      {openDropdown && (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index} activeOpacity={0.5} onPress={() => handlePress(item)}>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
  },
  labelContainer: {
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
  text: {
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  list: {
    //use percent instead of 200
    position: "absolute",
    width: "100%",
    maxHeight: 200,
    backgroundColor: COLORS.blackOne,
    borderRadius: 8,
  },
});

export default ExerciseDropdown;
