import { TodoIcon } from ".";

function CompleteIcon({ onComplete, completed }) {
  return (
    <TodoIcon
      type="check"
      color={completed ? "#18cd30" : "#6495ed"}
      onClick={onComplete}
    />
  );
}

export { CompleteIcon };
