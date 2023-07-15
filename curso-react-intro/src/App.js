import React from "react";
import { TodoCounter } from "./components/TodoCounter/TodoCounter";
import { TodoSearch } from "./components/TodoSearch/TodoSearch";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { CreateTodoButton } from "./components/CreateTodoButton/CreateTodoButton";
import { CreateTodo } from "./components/CreateTodo/CreateTodo";


function App() {
  const localStorageTODOS = localStorage.getItem("TODOS_V1") || "[]";
  const parserTodos = JSON.parse(localStorageTODOS);
  const [todos, setTodos] = React.useState(parserTodos);
  const [searchValue, setSearchValue] = React.useState("");
  const [modalState, setModalState] = React.useState("none");
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const searchedTodos = todos.filter((todo) =>
    RegExp(`.*${searchValue}.*`, "i").test(todo.text)
  );

  const saveTodos = (newTodos) => {
    localStorage.setItem("TODOS_V1", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const competeTodo = (text) => () => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text == text);
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => () => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text == text);
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const createTodo = (text) => {
    if (text != "") {
      const newTodos = [...todos];
      const newTodo = {
        text,
        completed: false,
      };
      newTodos.unshift(newTodo);
      saveTodos(newTodos);
    }
  };

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

export default App;
