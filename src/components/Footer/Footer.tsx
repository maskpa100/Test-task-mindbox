import { useSelector } from "react-redux";
import s from "./Footer.module.scss";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { clearCompletedTasks, setFilter } from "../../store/slice/taskSlice";

function Footer() {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);
  const completedCount = tasks.filter(
    (task) => task.status === "active"
  ).length;

  return (
    <div className={s.footer}>
      <div className={s.tasks}>{completedCount} items left</div>
      <div className={s.selectTasks}>
        <div
          className={currentFilter === "all" ? s.active : ""}
          onClick={() => dispatch(setFilter("all"))}>
          All
        </div>
        <div
          className={currentFilter === "active" ? s.active : ""}
          onClick={() => dispatch(setFilter("active"))}>
          Active
        </div>
        <div
          className={currentFilter === "completed" ? s.active : ""}
          onClick={() => dispatch(setFilter("completed"))}>
          Completed
        </div>
      </div>
      <div
        className={s.clearCompleted}
        onClick={() => dispatch(clearCompletedTasks())}>
        Clear completed
      </div>
    </div>
  );
}

export default Footer;
