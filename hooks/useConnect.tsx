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
}

export const ConnectContext = createContext<IConnectContext>({} as IConnectContext);

const init: [] = [];

function ConnectProvider({ children }: IProviderChildren) {
  const currentUser = useContext(AuthContext);

  const [followers, setFollowers] = useState<IFollower[]>(init);
  const [followees, setFollowees] = useState<IFollower[]>(init);

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
    if (currentUser) {
      AsyncStorage.multiGet(["@followers", "@followees"]).then((arrayJson) => {
        if (arrayJson[0][1]) {
          setFollowers(JSON.parse(arrayJson[0][1]));
        }
        if (arrayJson[1][1]) {
          setFollowees(JSON.parse(arrayJson[1][1]));
        }
      });

      //should work with no internet
      async function getFollowees() {
        const { data, error } = await supabase
          .from("followers")
          .select("profile: profiles!followee_id(*), priority")
          .match({ follower_id: currentUser?.id })
          .order("priority")
          .returns<IFollower[]>();
        if (error) {
          alert(error.message);
        } else {
          setFollowees(data);
        }
      }

      async function getFollowers() {
        const { data, error } = await supabase
          .from("followers")
          .select("profile: profiles!follower_id(*), priority")
          .match({ followee_id: currentUser?.id })
          .order("priority")
          .returns<IFollower[]>();

        if (error) {
          alert(error.message);
        } else {
          setFollowers(data);
        }
      }

      getFollowees();
      getFollowers();
    }
  }, [currentUser]);

  return (
    <ConnectContext.Provider value={{ followers, setFollowers, followees, setFollowees }}>
      {children}
    </ConnectContext.Provider>
  );
}

export default ConnectProvider;
