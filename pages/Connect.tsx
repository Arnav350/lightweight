import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface IStory {
  uuid: string;
  image: string;
  name: string;
  seen?: boolean;
}

type IStories = IStory[];

interface IContact {
  uuid: string;
  image: string;
  name: string;
  date: string;
  last: string;
  seen?: boolean;
}

type IContacts = IContact[];

function Connect() {
  const [stories, setStories] = useState<IStories>([
    {
      uuid: "b5257839-4471-4843-982b-ed1ffa0ec999",
      image: "https://picsum.photos/200/300",
      name: "Arnav Patel",
    },
    {
      uuid: "95d7651d-7a66-48f3-96a4-470188713e06",
      image: "https://picsum.photos/200/300",
      name: "Arnav Patel",
      seen: true,
    },
    {
      uuid: "603a3ff4-b414-4dbb-ae25-bc97063c053b",
      image: "https://picsum.photos/200/300",
      name: "Arnav Patel",
    },
    {
      uuid: "e330a427-18ce-4ea4-a92d-6ba9e2840d13",
      image: "https://picsum.photos/200/300",
      name: "Arnav Patel",
    },
    {
      uuid: "967343c9-6845-48bf-8239-2109a199d40c",
      image: "https://picsum.photos/200/300",
      name: "Arnav Patel",
    },
  ]);

  const [contacts, setContacts] = useState<IContacts>([
    {
      uuid: "4a83facc-7511-46be-8c79-6d3fa3196b4f",
      image: "https://picsum.photos/400",
      name: "Arnav Patel",
      date: "4:32 PM",
      last: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta amet quasi vero dolorum obcaecati nostrum? Ipsa natus tempore hic debitis dolorem cum ut saepe ullam, nostrum, quia sapiente consequuntur eligendi?",
    },
    {
      uuid: "b78eea13-890f-4175-a6ac-330dc270cf44",
      image: "https://picsum.photos/200",
      name: "Arnav Patel",
      date: "8:56 AM",
      last: "Lorem ipsum dolor sit",
      seen: true,
    },
    {
      uuid: "ed6a220a-4eaf-4345-a9fa-70c36d2cb49e",
      image: "https://picsum.photos/200",
      name: "Arnav Patel",
      date: "Yesterday",
      last: "Lorem ipsum dolor sit",
      seen: true,
    },
    {
      uuid: "0584a5a7-4b4a-41f9-a874-06b4e42e502c",
      image: "https://picsum.photos/200",
      name: "Arnav Patel",
      date: "Apr 3rd",
      last: "Lorem ipsum dolor sit",
      seen: true,
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.containerSearch}>
          <Icon name="magnify" size={32} color="#444" />
          <TextInput
            placeholder="Search user"
            placeholderTextColor="#888"
            style={styles.search}
          />
        </View>
      </View>
      <View>
        <ScrollView style={styles.containerStories} horizontal>
          <TouchableOpacity style={styles.story}>
            <View>
              <Icon name="plus" size={48} color="#444" />
            </View>
            <Text style={styles.storyText}>Add story</Text>
          </TouchableOpacity>
          {stories.map((story: IStory) => (
            <TouchableOpacity style={styles.story} key={story.uuid}>
              <Image source={{ uri: story.image }} style={styles.storyImage} />
              <Text style={styles.storyText}>{story.name}</Text>
              {story.seen && (
                <Icon
                  name="replay"
                  size={48}
                  color="#eee"
                  style={{ position: "absolute" }}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.contact}>
              {item.seen ? (
                <Icon name="circle" size={32} color="#487" />
              ) : (
                <Icon name="circle" size={32} color="transparent" />
              )}
              <Image source={{ uri: item.image }} style={styles.contactImage} />
              <View style={styles.contactText}>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{item.name}</Text>
                  <Text style={styles.contactDate}>{item.date}</Text>
                </View>
                <Text numberOfLines={2} style={styles.contactLast}>
                  {item.last}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.containerContacts}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  containerTop: {
    alignItems: "center",
    padding: 16,
    width: "100%",
    backgroundColor: "#111",
  },
  containerSearch: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    padding: 8,
    backgroundColor: "black",
    borderRadius: 18,
  },
  search: {
    fontSize: 16,
    color: "#eee",
  },
  containerStories: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  story: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    height: 88,
    width: 88,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#487",
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
  },
  containerContacts: {},
  contact: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  contactImage: {
    margin: 8,
    height: 64,
    width: 64,
    borderRadius: 50,
  },
  contactText: {
    padding: 8,
    flex: 1,
  },
  contactInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contactName: {
    color: "#eee",
    fontSize: 16,
  },
  contactDate: {
    color: "#eeea",
    fontSize: 14,
  },
  contactLast: {
    color: "#eeea",
    fontSize: 14,
  },
  // padding: (top: any, right: any, bottom: any, left: any) => ({
  //   paddingTop: top,
  //   paddingRight: right ?? top,
  //   paddingBottom: bottom ?? top,
  //   paddingLeft: left ?? right ?? top,
  // }),
});

export default Connect;
