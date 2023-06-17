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

function NutritionProvider({ children }: IProviderChildren) {
  const currentUser = useContext(AuthContext);

  const [currentMeals, setCurrentMeals] = useState<IMeal[]>(init);
  const [recipes, setRecipes] = useState<IFood[]>(init);

  useEffect(() => {
    if (currentMeals !== init) {
      async () => {
        try {
          await AsyncStorage.setItem(`@${currentUser?.id}:currentMeals`, JSON.stringify(currentMeals));
        } catch (error) {
          alert(error);
        }
      };
    }
  }, [currentMeals]);

  useEffect(() => {
    if (recipes !== init) {
      async () => {
        try {
          await AsyncStorage.setItem(`@${currentUser?.id}:recipes`, JSON.stringify(recipes));
        } catch (error) {
          alert(error);
        }
      };
    }
  }, [recipes]);

  useEffect(() => {
    async () => {
      try {
        await AsyncStorage.multiGet([`@${currentUser?.id}:currentMeals`, `@${currentUser?.id}:recipes`]).then(
          (arrayJson) => {
            if (arrayJson[0][1]) {
              setCurrentMeals(JSON.parse(arrayJson[0][1]));
            }
            if (arrayJson[1][1]) {
              setRecipes(JSON.parse(arrayJson[1][1]));
            }
          }
        );
      } catch (error) {
        alert(error);
      }
    };
  }, []);

  return (
    <NutritionContext.Provider value={{ currentMeals, setCurrentMeals, recipes, setRecipes }}>
      {children}
    </NutritionContext.Provider>
  );
}

export default NutritionProvider;
