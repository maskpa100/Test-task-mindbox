import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  text: string;
  status: "active" | "completed";
}

interface TaskState {
  tasks: Task[];
  filter: "all" | "active" | "completed";
}

const initialState: TaskState = {
  tasks: [],
  filter: "all",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ text: string }>) => {
      const newTask: Task = {
        id: Date.now(),
        text: action.payload.text,
        status: "active",
      };
      state.tasks.push(newTask);
    },
    clearCompletedTasks: (state) => {
      state.tasks = state.tasks.filter((task) => task.status !== "completed");
    },
    toggleTaskStatus: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.status = task.status === "active" ? "completed" : "active";
      }
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "active" | "completed">
    ) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, clearCompletedTasks, toggleTaskStatus, setFilter } =
  taskSlice.actions;
export default taskSlice.reducer;
