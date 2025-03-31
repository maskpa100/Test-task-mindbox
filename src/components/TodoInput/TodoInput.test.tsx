import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TodoInput from "./TodoInput";
import { addTask } from "../../store/slice/taskSlice";

const mockStore = configureStore([]);

const setup = (initialState: any) => {
  const store = mockStore(initialState);
  store.dispatch = jest.fn(); // Подменяем dispatch на Jest-мок
  const utils = render(
    <Provider store={store}>
      <TodoInput />
    </Provider>
  );
  return { store, ...utils };
};

describe("TodoInput component", () => {
  test("рендерит инпут с placeholder", () => {
    setup({ tasks: { tasks: [] } });

    expect(
      screen.getByPlaceholderText("What needs to be done?")
    ).toBeInTheDocument();
  });

  test("пользователь вводит текст в input", () => {
    setup({ tasks: { tasks: [] } });

    const input = screen.getByPlaceholderText("What needs to be done?");

    fireEvent.change(input, { target: { value: "Новая задача" } });

    expect(input).toHaveValue("Новая задача");
  });

  test("добавляет задачу при нажатии Enter", () => {
    const { store } = setup({ tasks: { tasks: [] } });

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Новая задача" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(store.dispatch).toHaveBeenCalledWith(
      addTask({ text: "Новая задача" })
    );
  });

  test("очищает input после добавления задачи", () => {
    setup({ tasks: { tasks: [] } });

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Очистка после добавления" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input).toHaveValue("");
  });
});
