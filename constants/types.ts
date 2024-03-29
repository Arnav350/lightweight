//stacks

type TGymStackParamList = {
  Gym: undefined;
  Progress: undefined;
  Design: { i: number };
  Select: undefined;
  Routine: { i: number };
};

type TNutritionStackParamList = {
  Nutrition: undefined;
  Reminder: undefined;
  Macro: undefined;
  Weight: undefined;
  Repast: { i: number; save: boolean | null };
  Create: { i: number; save: boolean };
  Recipe: { i: number; save: boolean | null };
  Search: { i: number; save: boolean | null };
};

type TConnectStackParamList = {
  Connect: undefined;
  Find: undefined;
  New: undefined;
  Story: undefined;
  Room: { roomId: string; name: string; image: string };
  Profile: undefined;
};

type TAccountStackParamList = {
  Account: undefined;
  Settings: undefined;
  Profile: undefined;
  Notifications: undefined;
  Blocked: undefined;
  Units: undefined;
  Theme: undefined;
  Permissions: undefined;
  About: undefined;
  Followers: { page: "Followers" | "Followings" };
};

//workout

type TType = "D" | "N" | "S" | "W";

interface ISet {
  type: TType;
  weight: number | "";
  reps: number | "";
  notes: string;
}

interface IExercise {
  name: string;
  equipment: string;
  muscle: string;
  notes: string;
  sets: ISet[];
}

interface IWorkout {
  date: Date;
  name: string;
  time: number;
  weight: number;
  exercises: IExercise[];
}

interface IRoutine {
  name: string;
  creator: string;
  exercises: IExercise[];
}

interface IWorkoutSettings {
  showType: boolean;
  showOptions: boolean;
  showCalculator: boolean;
  i: number;
  j: number;
}

//nutrition

interface IFood {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  amount: number;
  amountType: string;
}

interface IMeal {
  name: string;
  foods: IFood[];
}

interface IDay {
  date: Date;
  meals: IMeal[];
}

interface INutritionSettings {
  show: boolean;
  i: number;
}

interface IReminder {
  name: string;
  time: Date;
  days: number[];
}

interface IMacros {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  percent: boolean;
}

interface IMeasurement {
  data: number;
  date: Date;
}

//connect

interface IProfile {
  id: string;
  name: string;
  username: string;
  picture: boolean;
}

interface IFollower {
  follower: boolean;
  priority: number;
  profile: IProfile;
}

interface IRoom {
  id: string;
  name: string;
  image: boolean;
  last_message: string;
  last_date: string;
}

interface IRoomParticipant {
  room_id: string;
  profile_id: string;
  created_at: string;
}

interface IMessage {
  id: string;
  created_at: string;
  content: string;
  media: boolean;
  profile_id: string;
  room_id: string;
}
