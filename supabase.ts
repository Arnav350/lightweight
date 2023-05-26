import "react-native-url-polyfill/auto";
import { getItemAsync, setItemAsync, deleteItemAsync } from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

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

const supabaseUrl = "https://llnxlslsakzdkpzgoqdg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsbnhsc2xzYWt6ZGtwemdvcWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4ODk2ODcsImV4cCI6MjAwMDQ2NTY4N30.xSqOCLSONNbGrpKdms1e6UwE2JMyhbEJGeqVOwSdPog";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
