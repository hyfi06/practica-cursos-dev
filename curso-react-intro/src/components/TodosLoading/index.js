import "./TodosLoading.css";

function TodosLoading() {
  return (
    <li className="TodoItem Loading-Item">
      <div className="Icon-container Icon-container-check Loading-Icono"></div>
      <div className="Icon-container Icon-container-delete Loading-Icono"></div>
    </li>
  );
}

export { TodosLoading };
