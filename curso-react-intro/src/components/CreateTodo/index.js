import React from "react";
import "./CreateTodo.css";
import { TodoContext } from "../TodoContext";

function CreateTodo() {
  const { setOpenModal, createTodo } = React.useContext(TodoContext);
  const [newTodoText, setNewTodoTex] = React.useState("");
  return (
    <div className="modal-content">
      <h2>Escribe tu nuevo TODO</h2>
      <input
        className="input input-new-todo"
        placeholder="Nuevo Todo"
        value={newTodoText}
        onChange={(event) => {
          setNewTodoTex(event.target.value);
        }}
      />
      <div className="modal-button-section">
        <button
          className="button button--cancel"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          Cancelar
        </button>
        <button
          className="button button--primary"
          onClick={() => {
            if (newTodoText != "") {
              createTodo(newTodoText);
              setNewTodoTex("");
              setOpenModal(false);
            }
          }}
        >
          Añadir
        </button>
      </div>
    </div>
  );
}

export { CreateTodo };
