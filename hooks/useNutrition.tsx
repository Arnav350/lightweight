import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IFood, IMeal } from "../pages/user/nutrition/Nutrition";

interface IProviderChildren {
  children: ReactNode;
}

interface INutritionContext {
  currentMeals: IMeal[];
  setCurrentMeals: Dispatch<SetStateAction<IMeal[]>>;
  recipes: IFood[];
  setRecipes: Dispatch<SetStateAction<IFood[]>>;
}

export const NutritionContext = createContext<INutritionContext>({} as INutritionContext);

const init: [] = [];

function NutritionProvider({ children }: IProviderChildren) {
  const [currentMeals, setCurrentMeals] = useState<IMeal[]>(init);
  const [recipes, setRecipes] = useState<IFood[]>(init);

  useEffect(() => {
    if (currentMeals !== init) {
      AsyncStorage.setItem(`@currentMeals`, JSON.stringify(currentMeals));
    }
  }, [currentMeals]);

  useEffect(() => {
    if (recipes !== init) {
      AsyncStorage.setItem(`@recipes`, JSON.stringify(recipes));
    }
  }, [recipes]);

  useEffect(() => {
    AsyncStorage.multiGet([`@currentMeals`, `@recipes`]).then((arrayJson) => {
      if (arrayJson[0][1]) {
        setCurrentMeals(JSON.parse(arrayJson[0][1]));
      }
      if (arrayJson[1][1]) {
        setRecipes(JSON.parse(arrayJson[1][1]));
      }
    });
  }, []);

  return (
    <NutritionContext.Provider value={{ currentMeals, setCurrentMeals, recipes, setRecipes }}>
      {children}
    </NutritionContext.Provider>
  );
}

export default NutritionProvider;
