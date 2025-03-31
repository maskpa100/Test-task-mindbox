import { useState } from "react";
import s from "./TodoInput.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addTask } from "../../store/slice/taskSlice";
function TodoInput() {
  const [taskText, setTaskText] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask({ text: taskText }));
      setTaskText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };
  return (
    <div className={s.container}>
      <ExpandMoreIcon className={s.icon} />
      <input
        className={s.input}
        type="text"
        name="task"
        placeholder="What needs to be done?"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default TodoInput;
