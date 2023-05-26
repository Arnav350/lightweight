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

interface IProviderChildren {
  children: ReactNode;
}

interface IMeal {
  name: string;
  foods: {
    name: string;
    calories: number;
    amount: number;
    amountType: string;
  }[];
}

type TMeals = IMeal[];

interface IMealContext {
  meals: TMeals;
  setMeals: Dispatch<SetStateAction<TMeals>>;
}

export const MealContext = createContext<IMealContext>({} as IMealContext);

const init = [
  {
    name: "Breakfast Breakfast Breakfast Breakfast Breakfast",
    foods: [
      {
        name: "Extra Virgin Olive Oil",
        calories: 460,
        amount: 4,
        amountType: "tbsp",
      },
      {
        name: "Pizza",
        calories: 600,
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
        amount: 4,
        amountType: "eggs",
      },
      {
        name: "Ryse Chocolate Chip Peanut and Peanut Butter Protein Powder",
        calories: 600,
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
        amount: 60,
        amountType: "grams",
      },
      {
        name: "Mass Gainer",
        calories: 10000,
        amount: 5000000,
        amountType: "mg",
      },
    ],
  },
];

export function MealProvider({ children }: IProviderChildren) {
  const [meals, setMeals] = useState<TMeals>(init);

  const currentUser = useContext(AuthContext);

  useEffect(() => {
    AsyncStorage.getItem(`@${currentUser?.id}:meals`).then((jsonMeals) => {
      if (jsonMeals) {
        setMeals(JSON.parse(jsonMeals));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(`@${currentUser?.id}:meals`, JSON.stringify(meals));
  }, [meals]);

  return (
    <MealContext.Provider value={{ meals, setMeals }}>
      {children}
    </MealContext.Provider>
  );
}
