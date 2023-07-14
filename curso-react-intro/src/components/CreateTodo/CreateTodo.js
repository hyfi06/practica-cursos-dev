import React from "react";
import "./CreateTodo.css";

function CreateTodo({ todos, setTodos, modalState, setModalState }) {
  const [newTodoText, setNewTodoTex] = React.useState("");
  return (
    <div
      className="modal"
      style={{
        display: modalState,
      }}
    >
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
            onClick={(event) => {
              setModalState("none");
            }}
          >
            Cancelar
          </button>
          <button
            className="button button--primary"
            onClick={(event) => {
              if (newTodoText != "") {
                setTodos([
                  {
                    text: newTodoText,
                    completed: false,
                  },
                  ...todos,
                ]);
                setNewTodoTex("");
                setModalState("none");
              }
            }}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

export { CreateTodo };
