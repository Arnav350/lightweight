import { IExercise, IRoutine } from "../pages/workout/Workout";

export const initExercises: IExercise[] = [
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
          { type: "W", weight: 0, reps: 0, notes: "" },
          { type: "W", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Shoulder Press",
        equipment: "Dumbbell",
        muscle: "Shoulders",
        notes: "",
        sets: [
          { type: "W", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "D", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Tricep Extension",
        equipment: "Cable",
        muscle: "Triceps",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "D", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "D", weight: 0, reps: 0, notes: "" },
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
          { type: "W", weight: 0, reps: 0, notes: "" },
          { type: "W", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Lat Pulldown",
        equipment: "Cable",
        muscle: "Lats",
        notes: "",
        sets: [
          { type: "W", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "D", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Bicep Curl",
        equipment: "Dumbbell",
        muscle: "Biceps",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "D", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "D", weight: 0, reps: 0, notes: "" },
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
          { type: "W", weight: 0, reps: 0, notes: "" },
          { type: "W", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Leg Curls",
        equipment: "Machine",
        muscle: "Hamstrings",
        notes: "",
        sets: [
          { type: "W", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "D", weight: 0, reps: 0, notes: "" },
        ],
      },
      {
        name: "Calf Raise",
        equipment: "Machine",
        muscle: "Calves",
        notes: "",
        sets: [
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "D", weight: 0, reps: 0, notes: "" },
          { type: "N", weight: 0, reps: 0, notes: "" },
          { type: "D", weight: 0, reps: 0, notes: "" },
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
