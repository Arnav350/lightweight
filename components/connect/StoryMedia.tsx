import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { Dispatch, SetStateAction } from "react";
import { COLORS } from "../../constants/theme";

const { width } = Dimensions.get("window");

interface IProps {
  i: number;
  //shouldnt be any
  media: any;
  setMedias: Dispatch<SetStateAction<any[]>>;
}

function StoryMedia({ i, media, setMedias }: IProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: media.uri }} resizeMode="contain" style={styles.image} />
      <View style={styles.iconsContainer}>
        <Icon name={media.asset.type === "image" ? "camera-outline" : "video-outline"} size={24} color={COLORS.white} />
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => setMedias((prevMedias) => prevMedias.filter((_, index) => i !== index))}
        >
          <Icon name="trash-can-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
    width: width / 3,
  },
  image: {
    flex: 1,
  },
  iconsContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    width: "100%",
  },
});

export default StoryMedia;
