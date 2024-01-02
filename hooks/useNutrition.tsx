import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { initCurrentMeals, initMacros } from "../constants/init";

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
  macros: IMacros;
  setMacros: Dispatch<SetStateAction<IMacros>>;
}

export const NutritionContext = createContext<INutritionContext>({} as INutritionContext);

const init: [] = [];

function NutritionProvider({ children }: IProviderChildren) {
  const [currentMeals, setCurrentMeals] = useState<IDay>(initCurrentMeals);
  const [meals, setMeals] = useState<IDay[]>(init);
  const [recipes, setRecipes] = useState<IFood[]>(init);
  const [histories, setHistories] = useState<IFood[]>(init);
  const [reminders, setReminders] = useState<IReminder[]>(init);
  const [weights, setWeights] = useState<IMeasurement[]>(init);
  const [macros, setMacros] = useState<IMacros>(initMacros);

  useEffect(() => {
    if (currentMeals !== initCurrentMeals) {
      AsyncStorage.setItem("@currentMeals", JSON.stringify(currentMeals));

      if (currentMeals.date.getTime() !== initCurrentMeals.date.getTime()) {
        setMeals((prevMeals) => [currentMeals, ...prevMeals]);
        setCurrentMeals({ ...initCurrentMeals });
      }
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
    if (macros !== initMacros) {
      AsyncStorage.setItem("@macros", JSON.stringify(macros));
    }
  }, [macros]);

  useEffect(() => {
    AsyncStorage.multiGet([
      "@currentMeals",
      "@meals",
      "@recipes",
      "@histories",
      "@reminders",
      "@weights",
      "@macros",
    ]).then((arrayJson) => {
      if (arrayJson[0][1]) {
        const tempCurrentMeals: IDay = JSON.parse(arrayJson[0][1]);
        setCurrentMeals({ ...tempCurrentMeals, date: new Date(tempCurrentMeals.date) });
        // setCurrentMeals(JSON.parse(arrayJson[0][1]));
      }
      if (arrayJson[1][1]) {
        const tempMeals: IDay[] = JSON.parse(arrayJson[1][1]);
        setMeals(tempMeals.map((tempMeal) => ({ ...tempMeal, date: new Date(tempMeal.date) })));
        // setMeals(JSON.parse(arrayJson[1][1]));
      }
      if (arrayJson[2][1]) {
        setRecipes(JSON.parse(arrayJson[2][1]));
      }
      if (arrayJson[3][1]) {
        setHistories(JSON.parse(arrayJson[3][1]));
      }
      if (arrayJson[4][1]) {
        const tempReminders: IReminder[] = JSON.parse(arrayJson[4][1]);
        setReminders(tempReminders.map((tempReminder) => ({ ...tempReminder, time: new Date(tempReminder.time) })));
        // setReminders(JSON.parse(arrayJson[4][1]));
      }
      if (arrayJson[5][1]) {
        const tempWeights: IMeasurement[] = JSON.parse(arrayJson[5][1]);
        setWeights(tempWeights.map((tempWeight) => ({ ...tempWeight, date: new Date(tempWeight.date) })));
        // setWeights(JSON.parse(arrayJson[5][1]));
      }
      if (arrayJson[6][1]) {
        setMacros(JSON.parse(arrayJson[6][1]));
      }
    });
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
        macros,
        setMacros,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
}

export default NutritionProvider;
