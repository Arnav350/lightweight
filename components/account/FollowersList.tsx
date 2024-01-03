import { Dimensions, FlatList, StyleSheet } from "react-native";

import FollowRow from "../shared/FollowRow";

interface IProps {
  list: IFollower[];
}

const windowWidth = Dimensions.get("window").width;

function FollowersList({ list }: IProps) {
  return (
    <FlatList
      data={list}
      renderItem={({ item, index }) => <FollowRow key={index} follower={item.follower} profile={item.profile} />}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
});

export default FollowersList;
