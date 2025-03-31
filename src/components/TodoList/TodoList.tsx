import { useSelector } from "react-redux";
import s from "./TodoList.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { toggleTaskStatus } from "../../store/slice/taskSlice";
function TodoList() {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return task.status === "active";
    if (filter === "completed") return task.status === "completed";
    return true;
  });
  return (
    <div className={s.container}>
      {filteredTasks.map((item) => (
        <div
          onClick={() => dispatch(toggleTaskStatus(item.id))}
          className={`${s.item} ${
            item.status === "active" ? s.notSelected : s.selected
          }`}>
          <div className={s.checkbox}>
            {item.status === "completed" && <CheckIcon className={s.icon} />}
          </div>
          <div className={s.text}>{item.text}</div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
