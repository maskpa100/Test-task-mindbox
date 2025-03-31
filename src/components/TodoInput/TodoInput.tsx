import s from "./TodoInput.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
function TodoInput() {
  return (
    <div className={s.container}>
      <ExpandMoreIcon className={s.icon} />
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
