import s from "./TodoInput.module.scss";

function TodoInput() {
  return (
    <div className={s.container}>
      <input
        className={s.input}
        type="text"
        name="task"
        placeholder="What needs to be done?"
      />
    </div>
  );
}

export default TodoInput;
