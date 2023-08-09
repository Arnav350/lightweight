import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../constants/theme";

function ConnectStories() {
  return (
    <ScrollView style={styles.storiesContainer} horizontal>
      <TouchableOpacity style={styles.story}>
        <View>
          <Icon name="plus" size={48} color={COLORS.darkGray} />
        </View>
        <Text style={styles.storyText}>Add story</Text>
      </TouchableOpacity>
      {/* {stories.map((story: IStory, i: number) => (
        <TouchableOpacity style={styles.story} key={i}>
          <Image source={{ uri: story.image }} style={styles.storyImage} />
          <Text style={styles.storyText}>{story.name}</Text>
          {story.seen && <Icon name="replay" size={48} color="#eee" style={{ position: "absolute" }} />}
        </TouchableOpacity>
      ))} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  storiesContainer: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: COLORS.black,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
  story: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    height: 88,
    width: 88,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  storyImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  storyText: {
    position: "absolute",
    top: 92,
    fontSize: 14,
    textAlign: "center",
    color: COLORS.white,
  },
});

export default ConnectStories;
