import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { User, onAuthStateChanged } from "firebase/auth";

interface IProviderChildren {
  children: ReactNode;
}

export const AuthContext = createContext<User | null | undefined>(null);

export function AuthProvider({ children }: IProviderChildren) {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}
