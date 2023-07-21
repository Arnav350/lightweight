import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IExercise, IWorkout, IRoutine, IWorkoutSettings } from "../pages/workout/Workout";
import { initCurrentRoutine, initCurrentWorkout } from "../constants/init";

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
  currentRoutine: IRoutine;
  setCurrentRoutine: Dispatch<SetStateAction<IRoutine>>;
  routines: IRoutine[];
  setRoutines: Dispatch<SetStateAction<IRoutine[]>>;
  settings: IWorkoutSettings;
  setSettings: Dispatch<SetStateAction<IWorkoutSettings>>;
}

export const WorkoutContext = createContext<IWorkoutContext>({} as IWorkoutContext);

const initArray: [] = [];

const initSettings: IWorkoutSettings = {
  showOptions: false,
  showType: false,
  showCalculator: false,
  i: 0,
  j: 0,
};

function WorkoutProvider({ children }: IProviderChildren) {
  const [currentWorkout, setCurrentWorkout] = useState<IWorkout>(initCurrentWorkout);
  const [workouts, setWorkouts] = useState<IWorkout[]>(initArray);
  const [currentRoutine, setCurrentRoutine] = useState<IRoutine>(initCurrentRoutine);
  const [routines, setRoutines] = useState<IRoutine[]>(initArray);
  const [exercises, setExercises] = useState<IExercise[]>(initArray);
  const [settings, setSettings] = useState<IWorkoutSettings>(initSettings);

  useEffect(() => {
    if (currentWorkout !== initCurrentWorkout) {
      AsyncStorage.setItem("@currentWorkout", JSON.stringify(currentWorkout));
    }
  }, [currentWorkout]);

  useEffect(() => {
    if (workouts !== initArray) {
      AsyncStorage.setItem("@workouts", JSON.stringify(workouts));
    }
  }, [workouts]);

  useEffect(() => {
    if (currentRoutine !== initCurrentRoutine) {
      AsyncStorage.setItem("@currentRoutine", JSON.stringify(currentRoutine));
    }
  }, [currentRoutine]);

  useEffect(() => {
    if (routines !== initArray) {
      AsyncStorage.setItem("@routines", JSON.stringify(routines));
    }
  }, [routines]);

  useEffect(() => {
    if (exercises !== initArray) {
      AsyncStorage.setItem("@exercises", JSON.stringify(exercises));
    }
  }, [exercises]);

  useEffect(() => {
    AsyncStorage.multiGet(["@currentWorkout", "@workouts", "@currentRoutine", "@routines", "@exercises"]).then(
      (arrayJson) => {
        if (arrayJson[0][1]) {
          setCurrentWorkout(JSON.parse(arrayJson[0][1]));
        }
        if (arrayJson[1][1]) {
          setWorkouts(JSON.parse(arrayJson[1][1]));
        }
        if (arrayJson[2][1]) {
          setCurrentRoutine(JSON.parse(arrayJson[2][1]));
        }
        if (arrayJson[3][1]) {
          setRoutines(JSON.parse(arrayJson[3][1]));
        }
        if (arrayJson[4][1]) {
          setExercises(JSON.parse(arrayJson[4][1]));
        }
      }
    );
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout,
        setCurrentWorkout,
        workouts,
        setWorkouts,
        currentRoutine,
        setCurrentRoutine,
        routines,
        setRoutines,
        exercises,
        setExercises,
        settings,
        setSettings,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export default WorkoutProvider;
