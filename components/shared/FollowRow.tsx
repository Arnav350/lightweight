import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IProps {
  profile: IProfile;
}

function FollowRow({ profile: { id, name, username, picture } }: IProps) {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View>
        {/* <Image /> */}
        <View></View>
      </View>
      <TouchableOpacity activeOpacity={0.5}>
        <Text>Follow</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

export default FollowRow;
