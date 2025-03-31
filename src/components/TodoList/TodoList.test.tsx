import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TodoList from "./TodoList";
import { toggleTaskStatus } from "../../store/slice/taskSlice";

const mockStore = configureStore([]);

const setup = (initialState: any) => {
  const store = mockStore(initialState);
  store.dispatch = jest.fn(); // Подменяем dispatch на Jest-мок

  const utils = render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  return { store, ...utils };
};

describe("TodoList component", () => {
  test("рендерит список задач", () => {
    setup({
      tasks: {
        tasks: [
          { id: 1, text: "Первая задача", status: "active" },
          { id: 2, text: "Вторая задача", status: "completed" },
        ],
        filter: "all",
      },
    });

    expect(screen.getByText("Первая задача")).toBeInTheDocument();
    expect(screen.getByText("Вторая задача")).toBeInTheDocument();
  });

  test("отображает только активные задачи при фильтре 'active'", () => {
    setup({
      tasks: {
        tasks: [
          { id: 1, text: "Первая задача", status: "active" },
          { id: 2, text: "Вторая задача", status: "completed" },
        ],
        filter: "active",
      },
    });

    expect(screen.getByText("Первая задача")).toBeInTheDocument();
    expect(screen.queryByText("Вторая задача")).not.toBeInTheDocument();
  });

  test("отображает только выполненные задачи при фильтре 'completed'", () => {
    setup({
      tasks: {
        tasks: [
          { id: 1, text: "Первая задача", status: "active" },
          { id: 2, text: "Вторая задача", status: "completed" },
        ],
        filter: "completed",
      },
    });

    expect(screen.queryByText("Первая задача")).not.toBeInTheDocument();
    expect(screen.getByText("Вторая задача")).toBeInTheDocument();
  });

  test("переключает статус задачи при клике", () => {
    const { store } = setup({
      tasks: {
        tasks: [{ id: 1, text: "Первая задача", status: "active" }],
        filter: "all",
      },
    });

    const taskElement = screen.getByText("Первая задача");
    fireEvent.click(taskElement);

    expect(store.dispatch).toHaveBeenCalledWith(toggleTaskStatus(1));
  });
});
