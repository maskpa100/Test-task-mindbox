import taskReducer, {
  addTask,
  clearCompletedTasks,
  toggleTaskStatus,
  setFilter,
} from "./taskSlice";

interface Task {
  id: number;
  text: string;
  status: "active" | "completed";
}

interface TaskState {
  tasks: Task[];
  filter: "all" | "active" | "completed";
}

describe("taskSlice", () => {
  let initialState: TaskState;

  beforeEach(() => {
    initialState = {
      tasks: [],
      filter: "all",
    };
  });

  test("добавление задачи", () => {
    const action = addTask({ text: "Новая задача" });
    const state = taskReducer(initialState, action);

    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0].text).toBe("Новая задача");
    expect(state.tasks[0].status).toBe("active");
  });

  test("переключение статуса задачи", () => {
    const task = { id: 1, text: "Тестовая задача", status: "active" } as Task;
    initialState.tasks = [task];

    const action = toggleTaskStatus(task.id);
    const state = taskReducer(initialState, action);

    expect(state.tasks[0].status).toBe("completed");

    const stateAfterToggleAgain = taskReducer(state, toggleTaskStatus(task.id));
    expect(stateAfterToggleAgain.tasks[0].status).toBe("active");
  });

  test("удаление завершенных задач", () => {
    initialState.tasks = [
      { id: 1, text: "Активная", status: "active" },
      { id: 2, text: "Завершенная", status: "completed" },
    ];

    const action = clearCompletedTasks();
    const state = taskReducer(initialState, action);

    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0].text).toBe("Активная");
  });

  test("установка фильтра", () => {
    const action = setFilter("completed");
    const state = taskReducer(initialState, action);

    expect(state.filter).toBe("completed");
  });
});
