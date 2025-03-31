import s from "./App.module.scss";
import Footer from "./components/Footer/Footer";
import TodoInput from "./components/TodoInput/TodoInput";

function App() {
  return (
    <>
      <header className={s.header}>todos</header>
      <div className={s.content}>
        <TodoInput />
        <Footer />
      </div>
    </>
  );
}

export default App;
