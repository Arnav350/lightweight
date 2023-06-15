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

export const initRoutines: IRoutine[] = [
  {
    name: "Push",
    exercises: [
      { name: "Bench Press", types: ["W", "W", "N", "N"] },
      { name: "Shoulder Press", types: ["W", "N", "N", "D"] },
      { name: "Tricep Extension", types: ["N", "D", "N", "D"] },
    ],
  },
  {
    name: "Pull",
    exercises: [
      { name: "Barbell Row", types: ["W", "W", "N", "N"] },
      { name: "Lat Pulldown", types: ["W", "N", "N", "D"] },
      { name: "Bicep Curl", types: ["N", "D", "N", "D"] },
    ],
  },
  {
    name: "Legs",
    exercises: [
      { name: "Squat", types: ["W", "N", "N", "N"] },
      { name: "Leg Curls", types: ["W", "N", "N", "D"] },
      { name: "Calf Raises", types: ["N", "D", "N", "D"] },
    ],
  },
  { name: "Chest & Back", exercises: [] },
  { name: "Shoulders & Arms", exercises: [] },
  { name: "Legs", exercises: [] },
  { name: "Full Body 1", exercises: [] },
  { name: "Full Body 2", exercises: [] },
  { name: "Full Body 3", exercises: [] },
  { name: "Upper 1", exercises: [] },
  { name: "Lower 1", exercises: [] },
  { name: "Upper 2", exercises: [] },
  { name: "Lower 2", exercises: [] },
  { name: "Dumbbell Upper", exercises: [] },
  { name: "Dumbbell Lower", exercises: [] },
  { name: "Home Upper", exercises: [] },
  { name: "Home Lower", exercises: [] },
];
