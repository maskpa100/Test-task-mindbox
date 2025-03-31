import s from "./TodoList.module.scss";
import CheckIcon from "@mui/icons-material/Check";
function TodoList() {
  return (
    <div className={s.container}>
      <div className={`${s.item} ${s.selected}`}>
        <div className={s.checkbox}>
          <CheckIcon className={s.icon} />
        </div>
        <div className={s.text}>Прекрасный код</div>
      </div>
      <div className={`${s.item} ${s.notSelected}`}>
        <div className={s.checkbox}></div>
        <div className={s.text}>Прекрасный код</div>
      </div>
    </div>
  );
}

export default TodoList;
