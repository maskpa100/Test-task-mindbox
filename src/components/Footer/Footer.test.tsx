import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Footer from "./Footer";
import { setFilter, clearCompletedTasks } from "../../store/slice/taskSlice";
const mockStore = configureStore([]);
const setup = (state: any) => {
  const store = mockStore(state);
  store.dispatch = jest.fn();
  const utils = render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );
  return { store, ...utils };
};

describe("Footer component", () => {
  test("отображает количество активных задач", () => {
    setup({
      tasks: {
        tasks: [
          { id: 1, text: "Task 1", status: "active" },
          { id: 2, text: "Task 2", status: "completed" },
        ],
        filter: "all",
      },
    });

    expect(screen.getByText("1 items left")).toBeInTheDocument();
  });

  test("переключает фильтр на 'Active'", () => {
    const { container } = setup({
      tasks: { tasks: [], filter: "all" },
    });

    fireEvent.click(screen.getByText("Active"));

    expect(container.querySelector(`.${"active"}`)).toBeInTheDocument();
  });

  test("переключает фильтр на 'Completed'", () => {
    const { container } = setup({
      tasks: { tasks: [], filter: "all" },
    });

    fireEvent.click(screen.getByText("Completed"));

    expect(container.querySelector(`.${"active"}`)).toBeInTheDocument();
  });

  test("очищает завершённые задачи", () => {
    const { store } = setup({
      tasks: { tasks: [], filter: "all" },
    });

    fireEvent.click(screen.getByText("Clear completed"));

    expect(store.dispatch).toHaveBeenCalledWith(clearCompletedTasks());
  });
});
