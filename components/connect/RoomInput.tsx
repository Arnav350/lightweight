import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as VideoThumbnails from "expo-video-thumbnails";
import { decode } from "base64-arraybuffer";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { Video } from "expo-av";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { supabase } from "../../supabase";
import { COLORS } from "../../constants/theme";

interface IProps {
  roomId: string;
}

function RoomInput({ roomId }: IProps) {
  const [permission, setPermission] = useState<boolean>(false);
  //shouldnt be any
  const [medias, setMedias] = useState<any[]>([]);

  //shouldnt be in this file
  useEffect(() => {
    async function status() {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermission(granted);
    }

    status();
  }, []);

  async function pickImg() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      orderedSelection: true,
      selectionLimit: 8,
      //needs to be 1 for gifs on android
      quality: 0.6,
    });

    setMedias([]);

    if (!result.canceled) {
      result.assets.forEach(async (asset) => {
        const ext = asset.uri.split(".").pop();
        const id = uuid();

        const base64 = await FileSystem.readAsStringAsync(asset.uri, { encoding: "base64" });

        const file = decode(base64);

        if (asset.type === "video") {
          const { uri } = await VideoThumbnails.getThumbnailAsync(asset.uri, { quality: 0.6 });
          setMedias((prevMedias) => [...prevMedias, { asset, uri }]);
        } else {
          setMedias((prevMedias) => [...prevMedias, { asset, uri: asset.uri }]);
        }
      });
    }
  }

  async function handleSend(text: string) {
    if (text.trim().length !== 0) {
      const { error } = await supabase.from("messages").insert({ content: text, room_id: roomId });

      if (error) {
        alert(error.message);
      }
    }

    medias.forEach(async ({ asset }) => {
      const ext = asset.uri.split(".").pop();
      const id = uuid();
      const base64 = await FileSystem.readAsStringAsync(asset.uri, { encoding: "base64" });
      const file = decode(base64);

      const images = await supabase.storage.from("images").upload(id, file, { contentType: `${asset.type}/${ext}` });

      if (images.error) {
        alert(images.error.message);
      }

      const messages = await supabase.from("messages").insert({ media: id, room_id: roomId });

      if (messages.error) {
        alert(messages.error.message);
      }
    });

    setMedias([]);
  }

  return (
    <View style={styles.container}>
      <Icon name="camera-outline" size={32} color={COLORS.primary} />
      <TextInput
        placeholder="Message..."
        placeholderTextColor={COLORS.gray}
        keyboardAppearance="dark"
        maxLength={2000}
        returnKeyType="send"
        blurOnSubmit
        multiline
        style={styles.input}
        onSubmitEditing={({ nativeEvent: { text } }) => handleSend(text)}
      />
      <Icon name="microphone-outline" size={32} color={COLORS.primary} />
      <Icon name="image-outline" size={32} color={COLORS.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: COLORS.black,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.blackOne,
    color: COLORS.white,
    fontSize: 16,
    textAlignVertical: "top",
  },
});

export default RoomInput;
