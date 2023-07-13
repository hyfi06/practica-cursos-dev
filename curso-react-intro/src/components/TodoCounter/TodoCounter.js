import "./TodoCounter.css";

function TodoCounter({ total, completed }) {
  return (
    <h1 className="TodoCounter">
      Has completaste <b>{completed}</b> de <b>{total}</b> TODOs
    </h1>
  );
}

export { TodoCounter };
