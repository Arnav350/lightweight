import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IProviderChildren {
  children: ReactNode;
}

interface IConnectContext {
  followers: IFollower[];
  setFollowers: Dispatch<SetStateAction<IFollower[]>>;
  followings: IFollower[];
  setFollowings: Dispatch<SetStateAction<IFollower[]>>;
}

export const ConnectContext = createContext<IConnectContext>({} as IConnectContext);

const init: [] = [];

function ConnectProvider({ children }: IProviderChildren) {
  const [followers, setFollowers] = useState<IFollower[]>(init);
  const [followings, setFollowings] = useState<IFollower[]>(init);

  return (
    <ConnectContext.Provider value={{ followers, setFollowers, followings, setFollowings }}>
      {children}
    </ConnectContext.Provider>
  );
}

export default ConnectProvider;
