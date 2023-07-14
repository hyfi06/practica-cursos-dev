import "./TodoCounter.css";

function TodoCounter({ total, completed }) {
  return (
    <>
      <h1
        style={{
          display: total == 0 ? "block" : "none",
        }}
        className="TodoCounter"
      >
        ¡Crea nuevos TODOs!
      </h1>
      <h1
        style={{
          display: total != completed ? "block" : "none",
        }}
        className="TodoCounter"
      >
        Has completado <b>{completed}</b> de <b>{total}</b> TODOs
      </h1>
      <h1
        style={{
          display: total != 0 && total == completed ? "block" : "none",
        }}
        className="TodoCounter"
      >
        ¡Completaste todos los TODOs! <b>{completed}</b> de <b>{total}</b>
      </h1>
    </>
  );
}
export { TodoCounter };
