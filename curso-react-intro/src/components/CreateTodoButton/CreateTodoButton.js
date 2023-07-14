import "../CreateTodoButton/CreateTodoButton.css";
function CreateTodoButton({setModalState}) {
  return (
    <button
      className="CreateTodoButton"
      onClick={(event) => {
        setModalState('flex')
      }}
    >
      +
    </button>
  );
}

export { CreateTodoButton };
