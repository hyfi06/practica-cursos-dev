import React from "react";
import "./CreateTodoButton.css";
import { TodoContext } from "../TodoContext";
function CreateTodoButton() {
  const { setModalState } = React.useContext(TodoContext);
  return (
    <button
      className="CreateTodoButton"
      onClick={(event) => {
        setModalState("flex");
      }}
    >
      +
    </button>
  );
}

export { CreateTodoButton };
