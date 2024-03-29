import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "../supabase";
import { AuthContext } from "./useAuth";

interface IProviderChildren {
  children: ReactNode;
}

interface IConnectContext {
  followers: IFollower[];
  setFollowers: Dispatch<SetStateAction<IFollower[]>>;
  followees: IFollower[];
  setFollowees: Dispatch<SetStateAction<IFollower[]>>;
  mutuals: IFollower[];
  setMutuals: Dispatch<SetStateAction<IFollower[]>>;
  connecteds: IFollower[];
  setConnecteds: Dispatch<SetStateAction<IFollower[]>>;
}

export const ConnectContext = createContext<IConnectContext>({} as IConnectContext);

const init: [] = [];

function ConnectProvider({ children }: IProviderChildren) {
  const { currentUser } = useContext(AuthContext);

  const [followers, setFollowers] = useState<IFollower[]>(init);
  const [followees, setFollowees] = useState<IFollower[]>(init);
  const [mutuals, setMutuals] = useState<IFollower[]>(init);
  const [connecteds, setConnecteds] = useState<IFollower[]>(init);

  useEffect(() => {
    if (followers !== init) {
      AsyncStorage.setItem("@followers", JSON.stringify(followers));
    }
  }, [followers]);

  useEffect(() => {
    if (followees !== init) {
      AsyncStorage.setItem("@followees", JSON.stringify(followees));
    }
  }, [followees]);

  useEffect(() => {
    if (mutuals !== init) {
      AsyncStorage.setItem("@mutuals", JSON.stringify(mutuals));
    }
  }, [mutuals]);

  useEffect(() => {
    if (connecteds !== init) {
      AsyncStorage.setItem("@connecteds", JSON.stringify(connecteds));
    }
  }, [connecteds]);

  useEffect(() => {
    if (currentUser) {
      AsyncStorage.multiGet(["@followers", "@followees", "@mutuals", "@connecteds"]).then((arrayJson) => {
        if (arrayJson[0][1]) {
          setFollowers(JSON.parse(arrayJson[0][1]));
        }
        if (arrayJson[1][1]) {
          setFollowees(JSON.parse(arrayJson[1][1]));
        }
        if (arrayJson[2][1]) {
          setMutuals(JSON.parse(arrayJson[2][1]));
        }
        if (arrayJson[3][1]) {
          setConnecteds(JSON.parse(arrayJson[3][1]));
        }
      });

      async function getConnecteds() {
        let tempFollowees: IFollower[] = [];
        const followeesData = await supabase
          .from("followers")
          .select("profile: profiles!followee_id(*), priority")
          .match({ follower_id: currentUser?.id })
          .order("priority", { ascending: false })
          .returns<{ priority: number; profile: IProfile }[]>();

        if (followeesData.error) {
          alert(followeesData.error.message);
        } else {
          tempFollowees = followeesData.data.map((followeeData) => ({ ...followeeData, follower: true }));

          const followersData = await supabase
            .from("followers")
            .select("profile: profiles!follower_id(*), priority")
            .match({ followee_id: currentUser?.id })
            .order("priority", { ascending: false })
            .returns<{ priority: number; profile: IProfile }[]>();

          if (followersData.error) {
            alert(followersData.error.message);
          } else {
            const tempMutuals: IFollower[] = [];
            const tempConnecteds: IFollower[] = [...tempFollowees];

            const tempFollowers: IFollower[] = followersData.data.map((followerData) => {
              if (tempFollowees.find((tempFollowee) => (tempFollowee.profile.id = followerData.profile.id))) {
                tempMutuals.push({ ...followerData, follower: true });
                return { ...followerData, follower: true };
              } else {
                tempConnecteds.push({ ...followerData, follower: false });
                return { ...followerData, follower: false };
              }
            });

            setFollowees(tempFollowees);
            setFollowers(tempFollowers);
            setMutuals(tempMutuals);
            setConnecteds(tempConnecteds);
          }
        }
      }

      getConnecteds();
    }
  }, [currentUser]);

  return (
    <ConnectContext.Provider
      value={{ followers, setFollowers, followees, setFollowees, mutuals, setMutuals, connecteds, setConnecteds }}
    >
      {children}
    </ConnectContext.Provider>
  );
}

export default ConnectProvider;
