import { TodoIcon } from "./TodoIcon";

function CompleteIcon({ onComplete, completed }) {
  return (
    <TodoIcon
      type="check"
      color={completed ? "#18cd30" : "#6495ed"}
      clickAction={onComplete}
    />
  );
}

export { CompleteIcon };
