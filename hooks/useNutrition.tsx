import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IFood, IDay, IReminder, IMeasurement } from "../pages/user/nutrition/Nutrition";

interface IProviderChildren {
  children: ReactNode;
}

interface INutritionContext {
  currentMeals: IDay;
  setCurrentMeals: Dispatch<SetStateAction<IDay>>;
  meals: IDay[];
  setMeals: Dispatch<SetStateAction<IDay[]>>;
  recipes: IFood[];
  setRecipes: Dispatch<SetStateAction<IFood[]>>;
  histories: IFood[];
  setHistories: Dispatch<SetStateAction<IFood[]>>;
  reminders: IReminder[];
  setReminders: Dispatch<SetStateAction<IReminder[]>>;
  weights: IMeasurement[];
  setWeights: Dispatch<SetStateAction<IMeasurement[]>>;
}

export const NutritionContext = createContext<INutritionContext>({} as INutritionContext);

const initCurrentMeals: IDay = {
  date: 0,
  meals: [],
};

const init: [] = [];

function NutritionProvider({ children }: IProviderChildren) {
  const [currentMeals, setCurrentMeals] = useState<IDay>(initCurrentMeals);
  const [meals, setMeals] = useState<IDay[]>(init);
  const [recipes, setRecipes] = useState<IFood[]>(init);
  const [histories, setHistories] = useState<IFood[]>(init);
  const [reminders, setReminders] = useState<IReminder[]>(init);
  const [weights, setWeights] = useState<IMeasurement[]>(init);

  useEffect(() => {
    if (currentMeals !== initCurrentMeals) {
      AsyncStorage.setItem("@currentMeals", JSON.stringify(currentMeals));
    }
  }, [currentMeals]);

  useEffect(() => {
    if (meals !== init) {
      AsyncStorage.setItem("@meals", JSON.stringify(meals));
    }
  }, [meals]);

  useEffect(() => {
    if (recipes !== init) {
      AsyncStorage.setItem("@recipes", JSON.stringify(recipes));
    }
  }, [recipes]);

  useEffect(() => {
    if (histories !== init) {
      AsyncStorage.setItem("@histories", JSON.stringify(histories));
    }
  }, [histories]);

  useEffect(() => {
    if (reminders !== init) {
      AsyncStorage.setItem("@reminders", JSON.stringify(reminders));
    }
  }, [reminders]);

  useEffect(() => {
    if (weights !== init) {
      AsyncStorage.setItem("@weights", JSON.stringify(weights));
    }
  }, [weights]);

  useEffect(() => {
    AsyncStorage.multiGet(["@currentMeals", "@meals", "@recipes", "@histories", "@reminders", "@weights"]).then(
      (arrayJson) => {
        if (arrayJson[0][1]) {
          setCurrentMeals(JSON.parse(arrayJson[0][1]));
        }
        if (arrayJson[1][1]) {
          setMeals(JSON.parse(arrayJson[1][1]));
        }
        if (arrayJson[2][1]) {
          setRecipes(JSON.parse(arrayJson[2][1]));
        }
        if (arrayJson[3][1]) {
          setHistories(JSON.parse(arrayJson[3][1]));
        }
        if (arrayJson[4][1]) {
          setReminders(JSON.parse(arrayJson[4][1]));
        }
        if (arrayJson[5][1]) {
          setWeights(JSON.parse(arrayJson[5][1]));
        }
      }
    );
  }, []);

  return (
    <NutritionContext.Provider
      value={{
        currentMeals,
        setCurrentMeals,
        meals,
        setMeals,
        recipes,
        setRecipes,
        histories,
        setHistories,
        reminders,
        setReminders,
        weights,
        setWeights,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
}

export default NutritionProvider;
