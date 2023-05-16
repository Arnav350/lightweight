import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { User, onAuthStateChanged } from "firebase/auth";

interface IProviderChildren {
  children: React.ReactNode;
}

export const AuthContext = createContext<User | null>(null);

export function AuthProvider({ children }: IProviderChildren) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
    });

    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}
