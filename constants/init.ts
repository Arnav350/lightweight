import { IExercise, IRoutine, IWorkout } from "../pages/workout/Workout";

export const initCurrentWorkout: IWorkout = {
  date: {
    month: "",
    day: "",
    year: 0,
  },
  name: "Name",
  time: 0,
  weight: 0,
  exercises: [],
};

export const equipmentsList: string[] = [
  "None",
  "Barbell",
  "Dumbbell",
  "Kettlebell",
  "Machine",
  "Cable",
  "Plate",
  "Resistance Band",
  "Other",
];

export const musclesList: string[] = [
  "Abs",
  "Biceps",
  "Calves",
  "Cardio",
  "Chest",
  "Forearms",
  "Full Body",
  "Glutes",
  "Hamstrings",
  "Lats",
  "Lower Back",
  "Quads",
  "Shoulders",
  "Triceps",
  "Upper Back",
  "Other",
];

export const initExercises: IExercise[] = [
  {
    name: "Barbell Row",
    equipment: "Barbell",
    muscle: "Upper Back",
    notes: "",
    sets: [
      { type: "W", weight: "", reps: "", notes: "" },
      { type: "W", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
    ],
  },
  {
    name: "Bench Press",
    equipment: "Barbell",
    muscle: "Chest",
    notes: "",
    sets: [
      { type: "W", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
    ],
  },
  {
    name: "Bicep Curl",
    equipment: "Dumbbell",
    muscle: "Bicep",
    notes: "",
    sets: [
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "S", weight: "", reps: "", notes: "" },
      { type: "S", weight: "", reps: "", notes: "" },
    ],
  },
  {
    name: "Calf Raise",
    equipment: "Machine",
    muscle: "Calves",
    notes: "",
    sets: [
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "D", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "D", weight: "", reps: "", notes: "" },
    ],
  },
  {
    name: "Lat Pulldown",
    equipment: "Cable",
    muscle: "Lats",
    notes: "",
    sets: [
      { type: "W", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "D", weight: "", reps: "", notes: "" },
    ],
  },
  {
    name: "Leg Curls",
    equipment: "Machine",
    muscle: "Hamstrings",
    notes: "",
    sets: [
      { type: "W", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "D", weight: "", reps: "", notes: "" },
    ],
  },
  {
    name: "Shoulder Press",
    equipment: "Dumbbell",
    muscle: "Shoulders",
    notes: "",
    sets: [
      { type: "W", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "D", weight: "", reps: "", notes: "" },
    ],
  },
  {
    name: "Smith Machine 45 Pound Plate Elevated Front Squat",
    equipment: "Barbell",
    muscle: "Quads",
    notes: "",
    sets: [
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "D", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
    ],
  },
  {
    name: "Squat",
    equipment: "Barbell",
    muscle: "Quads",
    notes: "",
    sets: [
      { type: "W", weight: "", reps: "", notes: "" },
      { type: "W", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
    ],
  },
  {
    name: "Tricep Extension",
    equipment: "Cable",
    muscle: "Triceps",
    notes: "",
    sets: [
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "D", weight: "", reps: "", notes: "" },
      { type: "N", weight: "", reps: "", notes: "" },
      { type: "D", weight: "", reps: "", notes: "" },
    ],
  },
];

export const exploreRoutines: IRoutine[] = [
  {
    name: "Push",
    creator: "PumpPeak",
    exercises: [
      {
        name: "Bench Press",
        equipment: "Barbell",
        muscle: "Chest",
        notes: "",
        sets: [
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
        ],
      },
      {
        name: "Shoulder Press",
        equipment: "Dumbbell",
        muscle: "Shoulders",
        notes: "",
        sets: [
          { type: "W", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "D", weight: "", reps: "", notes: "" },
        ],
      },
      {
        name: "Tricep Extension",
        equipment: "Cable",
        muscle: "Triceps",
        notes: "",
        sets: [
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "D", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "D", weight: "", reps: "", notes: "" },
        ],
      },
    ],
  },
  {
    name: "Pull",
    creator: "PumpPeak",
    exercises: [
      {
        name: "Barbell Row",
        equipment: "Barbell",
        muscle: "Upper Back",
        notes: "",
        sets: [
          { type: "W", weight: "", reps: "", notes: "" },
          { type: "W", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
        ],
      },
      {
        name: "Lat Pulldown",
        equipment: "Cable",
        muscle: "Lats",
        notes: "",
        sets: [
          { type: "W", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "D", weight: "", reps: "", notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Biceps",
        notes: "",
        sets: [
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "D", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "D", weight: "", reps: "", notes: "" },
        ],
      },
    ],
  },
  {
    name: "Legs",
    creator: "PumpPeak",
    exercises: [
      {
        name: "Squat",
        equipment: "Barbell",
        muscle: "Quads",
        notes: "",
        sets: [
          { type: "W", weight: "", reps: "", notes: "" },
          { type: "W", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
        ],
      },
      {
        name: "Leg Curls",
        equipment: "Machine",
        muscle: "Hamstrings",
        notes: "",
        sets: [
          { type: "W", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "D", weight: "", reps: "", notes: "" },
        ],
      },
      {
        name: "Calf Raise",
        equipment: "Machine",
        muscle: "Calves",
        notes: "",
        sets: [
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "D", weight: "", reps: "", notes: "" },
          { type: "N", weight: "", reps: "", notes: "" },
          { type: "D", weight: "", reps: "", notes: "" },
        ],
      },
    ],
  },
  { name: "Chest & Back", creator: "PumpPeak", exercises: [] },
  { name: "Shoulders & Arms", creator: "PumpPeak", exercises: [] },
  { name: "Legs", creator: "PumpPeak", exercises: [] },
  { name: "Full Body 1", creator: "PumpPeak", exercises: [] },
  { name: "Full Body 2", creator: "PumpPeak", exercises: [] },
  { name: "Full Body 3", creator: "PumpPeak", exercises: [] },
  { name: "Upper 1", creator: "PumpPeak", exercises: [] },
  { name: "Lower 1", creator: "PumpPeak", exercises: [] },
  { name: "Upper 2", creator: "PumpPeak", exercises: [] },
  { name: "Lower 2", creator: "PumpPeak", exercises: [] },
  { name: "Dumbbell Upper", creator: "PumpPeak", exercises: [] },
  { name: "Dumbbell Lower", creator: "PumpPeak", exercises: [] },
  { name: "Home Upper", creator: "PumpPeak", exercises: [] },
  { name: "Home Lower", creator: "PumpPeak", exercises: [] },
];
