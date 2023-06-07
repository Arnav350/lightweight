import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "./useAuth";
import { IExercise, IWorkout } from "../pages/workout/Workout";

interface IProviderChildren {
  children: ReactNode;
}

interface IWorkoutContext {
  currentWorkout: IWorkout;
  setCurrentWorkout: Dispatch<SetStateAction<IWorkout>>;
  exercises: IExercise[];
  setExercises: Dispatch<SetStateAction<IExercise[]>>;
  workouts: IWorkout[];
  setWorkouts: Dispatch<SetStateAction<IWorkout[]>>;
  routines: IWorkout[];
  setRoutines: Dispatch<SetStateAction<IWorkout[]>>;
}

export const WorkoutContext = createContext<IWorkoutContext>({} as IWorkoutContext);

const initcw: IWorkout = {
  date: {
    month: "",
    day: "",
  },
  name: "Name",
  time: "",
  weight: 0,
  exercises: [],
};

const inite: IExercise[] = [
  {
    name: "Bench Press",
    equipment: "Barbell",
    muscle: "Chest",
    notes: "",
    sets: [
      { type: "W", weight: 0, reps: 0, notes: "" },
      { type: "N", weight: 0, reps: 0, notes: "" },
      { type: "N", weight: 0, reps: 0, notes: "" },
    ],
  },
  {
    name: "Smith Machine 45 Pound Plate Elevated Front Squat",
    equipment: "Barbell",
    muscle: "Quads",
    notes: "",
    sets: [
      { type: "N", weight: 0, reps: 0, notes: "" },
      { type: "N", weight: 0, reps: 0, notes: "" },
      { type: "D", weight: 0, reps: 0, notes: "" },
      { type: "N", weight: 0, reps: 0, notes: "" },
      { type: "N", weight: 0, reps: 0, notes: "" },
    ],
  },
  {
    name: "Bicep Curl",
    equipment: "Dumbbell",
    muscle: "Bicep",
    notes: "",
    sets: [
      { type: "N", weight: 0, reps: 0, notes: "" },
      { type: "S", weight: 0, reps: 0, notes: "" },
      { type: "S", weight: 0, reps: 0, notes: "" },
    ],
  },
];

const initw: IWorkout[] = [
  {
    date: {
      month: "June",
      day: "19",
    },
    name: "Workout Name",
    time: "1435612",
    weight: 234536,
    exercises: [
      {
        name: "Bench Press",
        equipment: "Barbell",
        muscle: "Chest",
        notes: "",
        sets: [
          { type: "W", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Smith Machine 45 Pound Plate Elevated Front Squat",
        equipment: "Barbell",
        muscle: "Quads",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "D", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
    ],
  },
  {
    date: {
      month: "June",
      day: "19",
    },
    name: "Workout Name",
    time: "1435612",
    weight: 234536,
    exercises: [
      {
        name: "Bench Press",
        equipment: "Barbell",
        muscle: "Chest",
        notes: "",
        sets: [
          { type: "W", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Smith Machine 45 Pound Plate Elevated Front Squat",
        equipment: "Barbell",
        muscle: "Quads",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "D", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
    ],
  },
  {
    date: {
      month: "June",
      day: "19",
    },
    name: "Workout Name",
    time: "1435612",
    weight: 234536,
    exercises: [
      {
        name: "Bench Press",
        equipment: "Barbell",
        muscle: "Chest",
        notes: "",
        sets: [
          { type: "W", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Smith Machine 45 Pound Plate Elevated Front Squat",
        equipment: "Barbell",
        muscle: "Quads",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "D", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Bicep",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
          { type: "S", weight: 0, reps: 0, notes: "" },
        ],
      },
    ],
  },
];

const initr: IWorkout[] = [];

export function WorkoutProvider({ children }: IProviderChildren) {
  const currentUser = useContext(AuthContext);

  const [currentWorkout, setCurrentWorkout] = useState<IWorkout>(initcw);
  const [exercises, setExercises] = useState<IExercise[]>(inite);
  const [workouts, setWorkouts] = useState<IWorkout[]>(initw);
  const [routines, setRoutines] = useState<IWorkout[]>(initr);

  useEffect(() => {
    if (currentWorkout !== initcw) {
      AsyncStorage.setItem(`@${currentUser?.id}:currentWorkout`, JSON.stringify(currentWorkout));
    }
  }, [currentWorkout]);

  useEffect(() => {
    if (exercises !== inite) {
      AsyncStorage.setItem(`@${currentUser?.id}:exercises`, JSON.stringify(exercises));
    }
  }, [exercises]);

  useEffect(() => {
    if (workouts !== initw) {
      AsyncStorage.setItem(`@${currentUser?.id}:workouts`, JSON.stringify(workouts));
    }
  }, [workouts]);

  useEffect(() => {
    if (routines !== initr) {
      AsyncStorage.setItem(`@${currentUser?.id}:routines`, JSON.stringify(routines));
    }
  }, [routines]);

  useEffect(() => {
    AsyncStorage.multiGet([
      `@${currentUser?.id}:currentWorkout`,
      `@${currentUser?.id}:exercises`,
      `@${currentUser?.id}:workouts`,
      `@${currentUser?.id}:routines`,
    ]).then((arrayJson) => {
      if (arrayJson[0][1]) {
        setCurrentWorkout(JSON.parse(arrayJson[0][1]));
      }
      if (arrayJson[1][1]) {
        setExercises(JSON.parse(arrayJson[1][1]));
      }
      if (arrayJson[2][1]) {
        setWorkouts(JSON.parse(arrayJson[2][1]));
      }
      if (arrayJson[3][1]) {
        setRoutines(JSON.parse(arrayJson[3][1]));
      }
    });
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout,
        setCurrentWorkout,
        exercises,
        setExercises,
        workouts,
        setWorkouts,
        routines,
        setRoutines,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
