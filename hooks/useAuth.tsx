import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

import { supabase } from "../supabase";

interface IProviderChildren {
  children: ReactNode;
}

interface IAuthContext {
  currentUser: User | null | undefined;
  currentProfile: IProfile | null;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: IProviderChildren) {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  const [currentProfile, setCurrentProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user || null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });
  }, []);

  useEffect(() => {
    async function getCurrentProfile() {
      if (currentUser) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .match({ id: currentUser?.id })
          .returns<IProfile[]>()
          .limit(1)
          .single();

        if (error) {
          alert(error.message);
        } else {
          setCurrentProfile(data);
        }
      }
    }

    getCurrentProfile();
  }, [currentUser]);

  return <AuthContext.Provider value={{ currentUser, currentProfile }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
