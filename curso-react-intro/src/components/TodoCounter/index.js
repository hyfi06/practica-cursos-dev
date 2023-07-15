import React from "react";
import "./TodoCounter.css";
import { TodoContext } from "../TodoContext";

function TodoCounter() {
  const { loading, error, totalTodos, completedTodos } =
    React.useContext(TodoContext);
  return (
    <>
      <h1 className="TodoCounter">
        {loading && <>TODOs App</>}
        {(error || (!loading && totalTodos === 0)) && <>TODOs App</>}

        {!error && !loading && totalTodos !== completedTodos && (
          <>
            Has completado <b>{completedTodos}</b> de <b>{totalTodos}</b> TODOs
          </>
        )}

        {!error &&
          !loading &&
          totalTodos !== 0 &&
          totalTodos === completedTodos && (
            <>
              ¡Completaste todos los TODOs! <br /> <b>{completedTodos}</b> de{" "}
              <b>{totalTodos}</b>
            </>
          )}
      </h1>
    </>
  );
}
export { TodoCounter };
