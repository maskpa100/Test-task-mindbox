import s from "./Footer.module.scss";

function Footer() {
  return (
    <div className={s.footer}>
      <div className={s.tasks}>1 items left</div>
      <div className={s.selectTasks}>
        <div className={s.active}>All</div>
        <div>Active</div>
        <div className={s.active}>Completed</div>
      </div>
      <div>Clear completed</div>
    </div>
  );
}

export default Footer;
