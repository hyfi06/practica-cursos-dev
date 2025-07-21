import { TodoIcon } from ".";

function DeleteIcon({ onDelete }) {
  return <TodoIcon type="delete" color="#6495ed" onClick={onDelete} />;
}

export { DeleteIcon };
