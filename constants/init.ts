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
      { name: "Bench Press", types: ["W", "W", "N", "N"] },
      { name: "Shoulder Press", types: ["W", "N", "N", "D"] },
      { name: "Tricep Extension", types: ["N", "D", "N", "D"] },
    ],
  },
  {
    name: "Pull",
    creator: "PumpPeak",
    exercises: [
      { name: "Barbell Row", types: ["W", "W", "N", "N"] },
      { name: "Lat Pulldown", types: ["W", "N", "N", "D"] },
      { name: "Bicep Curl", types: ["N", "D", "N", "D"] },
    ],
  },
  {
    name: "Legs",
    creator: "PumpPeak",
    exercises: [
      { name: "Squat", types: ["W", "N", "N", "N"] },
      { name: "Leg Curls", types: ["W", "N", "N", "D"] },
      { name: "Calf Raises", types: ["N", "D", "N", "D"] },
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
