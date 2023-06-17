import { ReactNode, createContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { User } from "@supabase/supabase-js";

interface IProviderChildren {
  children: ReactNode;
}

export const AuthContext = createContext<User | null | undefined>(null);

function AuthProvider({ children }: IProviderChildren) {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user || null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });
  }, []);

  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
