import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IExercise, IWorkout, IRoutine } from "../pages/workout/Workout";
import { initCurrentWorkout } from "../constants/init";

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
  routines: IRoutine[];
  setRoutines: Dispatch<SetStateAction<IRoutine[]>>;
}

export const WorkoutContext = createContext<IWorkoutContext>({} as IWorkoutContext);

const initArray: [] = [];

function WorkoutProvider({ children }: IProviderChildren) {
  const [currentWorkout, setCurrentWorkout] = useState<IWorkout>(initCurrentWorkout);
  const [exercises, setExercises] = useState<IExercise[]>(initArray);
  const [workouts, setWorkouts] = useState<IWorkout[]>(initArray);
  const [routines, setRoutines] = useState<IRoutine[]>(initArray);

  useEffect(() => {
    if (currentWorkout !== initCurrentWorkout) {
      AsyncStorage.setItem(`@currentWorkout`, JSON.stringify(currentWorkout));
    }
  }, [currentWorkout]);

  useEffect(() => {
    if (exercises !== initArray) {
      AsyncStorage.setItem(`@exercises`, JSON.stringify(exercises));
    }
  }, [exercises]);

  useEffect(() => {
    if (workouts !== initArray) {
      AsyncStorage.setItem(`@workouts`, JSON.stringify(workouts));
    }
  }, [workouts]);

  useEffect(() => {
    if (routines !== initArray) {
      AsyncStorage.setItem(`@routines`, JSON.stringify(routines));
    }
  }, [routines]);

  useEffect(() => {
    AsyncStorage.multiGet([`@currentWorkout`, `@exercises`, `@workouts`, `@routines`]).then((arrayJson) => {
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

export default WorkoutProvider;
