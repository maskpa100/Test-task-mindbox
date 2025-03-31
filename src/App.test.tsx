import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/TodoInput/TodoInput", () => () => (
  <div data-testid="todo-input" />
));
jest.mock("./components/TodoList/TodoList", () => () => (
  <div data-testid="todo-list" />
));
jest.mock("./components/Footer/Footer", () => () => (
  <div data-testid="footer" />
));

describe("App component", () => {
  test("рендерит заголовок 'todos'", () => {
    render(<App />);
    expect(screen.getByText("todos")).toBeInTheDocument();
  });

  test("рендерит компонент TodoInput", () => {
    render(<App />);
    expect(screen.getByTestId("todo-input")).toBeInTheDocument();
  });

  test("рендерит компонент TodoList", () => {
    render(<App />);
    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
  });

  test("рендерит компонент Footer", () => {
    render(<App />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
