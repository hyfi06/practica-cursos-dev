import { TodoCounter } from "../components/TodoCounter";
import { TodoSearch } from "../components/TodoSearch";
import { TodoList } from "../components/TodoList";
import { TodoItem } from "../components/TodoItem";
import { CreateTodoButton } from "../components/CreateTodoButton";
import { CreateTodo } from "../components/CreateTodo";

function AppUI({
  completedTodos,
  totalTodos,
  searchValue,
  setSearchValue,
  searchedTodos,
  setModalState,
  createTodo,
  competeTodo,
  deleteTodo,
  modalState,
}) {
  return (
    <>
      <TodoCounter completed={completedTodos} total={totalTodos} />
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      <TodoList>
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={competeTodo(todo.text)}
            onDelete={deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      <CreateTodoButton setModalState={setModalState} />
      <CreateTodo
        onCreate={createTodo}
        modalState={modalState}
        setModalState={setModalState}
      />
    </>
  );
}

export { AppUI };
