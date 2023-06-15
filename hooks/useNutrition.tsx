import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "./useAuth";
import { IFood, IMeal } from "../pages/user/Nutrition";

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

export function NutritionProvider({ children }: IProviderChildren) {
  const currentUser = useContext(AuthContext);

  const [currentMeals, setCurrentMeals] = useState<IMeal[]>(init);
  const [recipes, setRecipes] = useState<IFood[]>(init);

  useEffect(() => {
    if (currentMeals !== init) {
      AsyncStorage.setItem(`@${currentUser?.id}:currentMeals`, JSON.stringify(currentMeals));
    }
  }, [currentMeals]);

  useEffect(() => {
    if (recipes !== init) {
      AsyncStorage.setItem(`@${currentUser?.id}:recipes`, JSON.stringify(recipes));
    }
  }, [recipes]);

  useEffect(() => {
    AsyncStorage.multiGet([`@${currentUser?.id}:currentMeals`, `@${currentUser?.id}:recipes`]).then((arrayJson) => {
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
