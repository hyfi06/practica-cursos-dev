import "./TodoItem.css";
import { CompleteIcon } from "../TodoIcon/CompleteIcon";
import { DeleteIcon } from "../TodoIcon/DeleteIcon";
import React from "react";
import { TodoContext } from "../TodoContext";

function TodoItem({ text, completed }) {
  const { competeTodo, deleteTodo } = React.useContext(TodoContext);
  return (
    <li className="TodoItem">
      <CompleteIcon completed={completed} onComplete={competeTodo(text)} />
      <p className={`TodoItem-p ${completed ? "TodoItem-p--complete" : ""}`}>
        {text}
      </p>
      <DeleteIcon onDelete={deleteTodo(text)} />
    </li>
  );
}

export { TodoItem };
