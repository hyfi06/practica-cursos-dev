import React from "react";

import { AppUI } from "./AppUI";

import { useLocalStorage } from "../hooks/useLocalStorage";

function App() {
  const [todos, saveTodos] = useLocalStorage("TODOS_V1", []);
  const [searchValue, setSearchValue] = React.useState("");
  const [modalState, setModalState] = React.useState("none");

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const searchedTodos = todos.filter((todo) =>
    RegExp(`.*${searchValue}.*`, "i").test(todo.text)
  );

  const competeTodo = (text) => () => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => () => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const createTodo = (text) => {
    if (text !== "") {
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
    <AppUI
      completedTodos={completedTodos}
      totalTodos={totalTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      setModalState={setModalState}
      createTodo={createTodo}
      competeTodo={competeTodo}
      deleteTodo={deleteTodo}
      modalState={modalState}
    />
  );
}

export default App;
