import "react-native-url-polyfill/auto";
import { getItemAsync, setItemAsync, deleteItemAsync } from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

import { SUPABASE_URL, SUPABASE_KEY } from "@env";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    deleteItemAsync(key);
  },
};

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
