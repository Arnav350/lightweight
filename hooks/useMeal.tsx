import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "./useAuth";
import { IMeal } from "../pages/user/Nutrition";

interface IProviderChildren {
  children: ReactNode;
}

interface IMealContext {
  meals: IMeal[];
  setMeals: Dispatch<SetStateAction<IMeal[]>>;
}

export const MealContext = createContext<IMealContext>({} as IMealContext);

const init = [
  {
    name: "Breakfast Breakfast Breakfast Breakfast Breakfast",
    foods: [
      {
        name: "Extra Virgin Olive Oil",
        calories: 460,
        protein: 20,
        fat: 20,
        carbs: 20,
        amount: 4,
        amountType: "tbsp",
      },
      {
        name: "Pizza",
        calories: 600,
        protein: 20,
        fat: 20,
        carbs: 20,
        amount: 2,
        amountType: "slices",
      },
    ],
  },
  {
    name: "Lunch",
    foods: [
      {
        name: "Eggs",
        calories: 380,
        protein: 20,
        fat: 20,
        carbs: 20,
        amount: 4,
        amountType: "eggs",
      },
      {
        name: "Ryse Chocolate Chip Peanut and Peanut Butter Protein Powder",
        calories: 600,
        protein: 20,
        fat: 20,
        carbs: 20,
        amount: 80,
        amountType: "grams",
      },
    ],
  },
  {
    name: "Dinner",
    foods: [
      {
        name: "Chicken",
        calories: 360,
        protein: 20,
        fat: 20,
        carbs: 20,
        amount: 60,
        amountType: "grams",
      },
      {
        name: "Mass Gainer",
        calories: 10000,
        protein: 20,
        fat: 20,
        carbs: 20,
        amount: 5000000,
        amountType: "mg",
      },
    ],
  },
];

export function MealProvider({ children }: IProviderChildren) {
  const [meals, setMeals] = useState<IMeal[]>(init);

  const currentUser = useContext(AuthContext);

  useEffect(() => {
    AsyncStorage.setItem(`@${currentUser?.id}:meals`, JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    AsyncStorage.getItem(`@${currentUser?.id}:meals`).then((jsonMeals) => {
      if (jsonMeals) {
        setMeals(JSON.parse(jsonMeals));
      }
    });
  }, []);

  return (
    <MealContext.Provider value={{ meals, setMeals }}>
      {children}
    </MealContext.Provider>
  );
}
