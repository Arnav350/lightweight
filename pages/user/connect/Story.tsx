import { useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Camera } from "expo-camera";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import StoryMedia from "../../../components/connect/StoryMedia";
import { COLORS } from "../../../constants/theme";

type TProps = StackScreenProps<TConnectStackParamList, "Story">;

const { width } = Dimensions.get("window");

function Story(props: TProps) {
  const { navigation } = props;

  const cameraRef = useRef<Camera | null>(null);

  //shouldnt be any
  const [medias, setMedias] = useState<any[]>([]);

  async function pickMedia() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      orderedSelection: true,
      //limit should be more than 8
      selectionLimit: 8,
      //needs to be 1 for gifs on android
      quality: 0.6,
    });

    const assetIds: (string | null | undefined)[] = medias.map((media) => media.asset.assetId);

    if (!result.canceled) {
      result.assets.forEach(async (asset) => {
        if (!assetIds.includes(asset.assetId)) {
          if (asset.type === "video") {
            const { uri } = await VideoThumbnails.getThumbnailAsync(asset.uri, { quality: 0.6 });
            setMedias((prevMedias) => [...prevMedias, { asset, uri }]);
          } else {
            setMedias((prevMedias) => [...prevMedias, { asset, uri: asset.uri }]);
          }
        }
      });
    }
  }

  async function recordMedia() {
    //this shouldnt be here
    // const { status } = await ImagePicker.requestCameraPermissionsAsync();
    // if (status !== "granted") {
    //   console.error("Permission to access media library denied");
    // }

    // let result = await ImagePicker.launchCameraAsync({
    //   allowsEditing: true,
    // });

    // if (!result.canceled) {
    //   console.log(result);
    // }

    const { status } = await Camera.getCameraPermissionsAsync();

    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      console.log("Photo taken at", result.uri);
    }
  }

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <Camera ref={cameraRef}>
        <View style={styles.headerContainer}>
          <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
            <Icon name="close" size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.header}>Add to Story</Text>
          <TouchableOpacity activeOpacity={0.3}>
            <Icon name="check" size={32} color={COLORS.primary} onPress={() => {}} />
          </TouchableOpacity>
        </View>
        <View style={styles.optionsRow}>
          <TouchableOpacity activeOpacity={0.5} style={styles.optionsButton} onPress={recordMedia}>
            <Icon name="camera-outline" size={40} color={COLORS.primary} />
            <Text style={styles.optionsText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.optionsButton} onPress={pickMedia}>
            <Icon name="image-multiple-outline" size={40} color={COLORS.primary} />
            <Text style={styles.optionsText}>Photos</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={medias}
          renderItem={({ item, index }) => <StoryMedia key={index} i={index} media={item} setMedias={setMedias} />}
          numColumns={3}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Choose a picture/video</Text>
              <Text style={styles.emptyMessage}>Select your photos or take a new one</Text>
            </View>
          }
          columnWrapperStyle={styles.storyColumn}
          style={styles.storyContainer}
        />
      </Camera>
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
    margin: 8,
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.white,
  },
  optionsRow: {
    flexDirection: "row",
    padding: 8,
    gap: 8,
    backgroundColor: COLORS.black,
  },
  optionsButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 4,
    borderRadius: 8,
    backgroundColor: COLORS.blackOne,
  },
  optionsText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
  storyContainer: {
    flex: 1,
    gap: 10,
    backgroundColor: COLORS.black,
  },
  storyColumn: {
    height: (width * 4) / 9,
  },
  emptyContainer: {
    margin: 16,
    gap: 4,
    alignItems: "center",
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  emptyMessage: {
    color: COLORS.gray,
    textAlign: "center",
    fontSize: 16,
  },
});

export default Story;
