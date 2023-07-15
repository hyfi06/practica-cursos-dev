import "./TodosEmpty.css";

function TodosEmpty() {
  return (
    <li className="TodoItem Loading-Item">
      <div className="Icon-container Icon-container-check Loading-Icono"></div>
      <p>¡Crea tu primer TODO!</p>
      <div className="Icon-container Icon-container-delete Loading-Icono"></div>
    </li>
  );
}

export { TodosEmpty };
